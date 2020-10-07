const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var amongus = [];

const embedHelp = {
    "embed": {
        "title": "Among Us - Help",
        "color": 16426522,
        "fields": [
            {
                "name": `${prefix}help`,
                "value": "To show this message."
            },
            {
                "name": `${prefix}link`,
                "value": "You can get the invite-link for this bot."
            },
            {
                "name": `${prefix}amongus`,
                "value": "When you want to start a game."
            },
            {
                "name": `${prefix}amongusstop`,
                "value": "When you are leaving or when the game is over."
            }
        ]
    }
}

const embedLetOp = {
    "embed": {
        "title": "Among Us - Help",
        "color": 15746887,
        "description": `To run some commands you have to be in a voice-channel. When you run this commands you have to be in a voice-channel:\n\n- **${prefix}amongus** \n- **${prefix}amongusstop**`,
        "fields": [
            {
                "name": ".....................",
                "value": "You can join the help-server: https://discord.gg/sjw7ZAb"
            }
        ]
    }
}

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers`,
        }
    })
});

bot.on("guildDelete", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers`,
        }
    })
});

bot.on('ready', async () => {
    const servers = await bot.guilds.cache.size;
    const users = await bot.users.cache.size;
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers en ${users} gebruikers`);
    console.log("");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers`,
        }
    })
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === "help") {
        msg.channel.send(embedHelp);
        msg.channel.send(embedLetOp);
    }

    if (command === "link") {
        msg.channel.send('https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=1547840592');
    }

    if (command === "amongus") {
        if (!msg.member.voice.channel) {
            msg.channel.send("You have to join a voice-channel to run this command!");
            return;
        }

        for (let i = 0; i < amongus.length; i++) {
            if (amongus[i].user === msg.author || amongus[i].kanaal === msg.member.voice.channel) {
                msg.channel.send("You are already hosting a game. You can't host more than one game!");
                return;
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us - @${msg.author.username}`)
            .setDescription(`React with an :white_check_mark: when there is a meeting, react with an :x: when the meeting is finished.\nDo **${prefix}amongusstop** when the game is done or you are leaving.`)
            .setFooter(`The host is: ${msg.author.username}\nThe channel where the game is currently playing: ${msg.member.voice.channel.name}`)
            .setColor(16426522)

        msg.channel.send({ embed: embed }).then(embedMesage => {
            amongus.push({
                "user": msg.author,
                "channel": msg.member.voice.channel,
                "bericht": embedMesage,
            });

            msg.member.voice.channel.edit({
                userLimit: 10,
            });
            embedMesage.react('✅');
            embedMesage.react('❌');
        });
    }

    if (command === "amongusstop") {
        for (let i = 0; i < amongus.length; i++) {
            if (amongus[i].user.id === msg.author.id) {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Among Us - @${msg.author.username}`)
                    .setDescription(`The game has finished, do **${prefix}amongus** to start a new game.`)
                    .setFooter(`The host was: ${amongus[i].user.username}\nThe channel was: ${amongus[i].channel.name}`)
                    .setColor(16426522)
                msg.channel.send({ embed: embed }).then(embedMesage => {
                    msg.member.voice.channel.edit({
                        userLimit: 0,
                    });
                });
                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
                amongus[i].channel = "";
                amongus.splice(amongus.indexOf({
                    "channel": msg.member.voice.channel,
                }), 1);
            } else {
                msg.channel.send("You're not allowed to finish a game. Do **${prefix}amongus** to start your own game.");
            }
        }
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    for (let i = 0; i < amongus.length; i++) {
        if (amongus[i].user != user) {
            return;
        }
        if (user.id != amongus[i].user.id) {
            reaction.remove();
            amongus[i].bericht.react(reaction._emoji.name);
            return;
        }

        if (reaction.message.id === amongus[i].bericht.id) {
            if (reaction._emoji.name === "✅") {
                //unmute iedereen
                reaction.remove();
                amongus[i].bericht.react(reaction._emoji.name);
                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
            } else if (reaction._emoji.name === "❌") {
                //mute iedereen
                reaction.remove();
                amongus[i].bericht.react(reaction._emoji.name);
                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: true });
                }
            }
        }
    }
});

bot.login(token);
