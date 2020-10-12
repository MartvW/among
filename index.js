const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var owner = process.env.OWNER;
var amongus = [];

var embedHelp = new Discord.MessageEmbed()
        .setAuthor(`Among Us`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Help")
        .setDescription(`Here is a list of commands you can use.`)
        .addFields(
            { name: `${prefix}help`, value: 'To show this message.', inline: false },
            { name: `${prefix}link`, value: 'You can get the invite-link for this bot.', inline: false },
            { name: `${prefix}amongus`, value: 'When you want to start a game.', inline: false },
            { name: `${prefix}amongusstop`, value: 'When you are leaving or when the game is over.', inline: false },
            { name: `${prefix}ping`, value: 'You can see your ping with this command.', inline: false },
            { name: `${prefix}uptime`, value: 'Get the uptime from the bot.', inline: false },
        )
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`Among Us`)

const embedLetOp = {
    "embed": {
        "author": {
            "name": `Among Us`,
            "url": "https://discordapp.com",
            "icon_url": "https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png"
          },
        "title": "Help",
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

//ROOD: 15746887
//ORANJE: 16426522

function createEmbed(title, description) {
    var embed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    return embed;
}

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`);
    bot.users.cache.get(owner).send(createEmbed(`Toegevoegd`, `Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`));
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | On ${servers} servers`,
        }
    })
});

bot.on("guildDelete", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
    bot.users.cache.get(owner).send(createEmbed(`Verwijderd`, `Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`));
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | On ${servers} servers`,
        }
    })
});

bot.on('ready', async () => {
    const servers = await bot.guilds.cache.size;
    const users = await bot.users.cache.size;
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers en ${users} gebruikers`);
    console.log("");
      
    bot.users.cache.get(owner).send(createEmbed(`Opgestart`, `De bot is succesvol opgestart als ${bot.user.tag} op ${servers} servers en ${users} gebruikers`));
    
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | On ${servers} servers`,
        }
    })
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;
    if (msg.guild === null && msg.author.id != owner) {
        msg.reply(createEmbed(`${msg.author.username}`, `You can't send message to me in DM...`));
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ + /);
    const command = args.shift().toLowerCase();
    
    try {
        if (command === "help") {
            msg.channel.send(embedHelp);
            msg.channel.send(embedLetOp);
        }

        if (command === "uptime") {
            let totalSeconds = (bot.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`));
        }

        if (command === "ping") {
            msg.channel.send("Pinging...").then(m => {
                var ping = m.createdTimestamp - msg.createdTimestamp;

                // Then It Edits the message with the ping variable embed that you created
                m.edit(createEmbed(`${msg.author.username}`, `Your ping is: ${ping}ms`));
            });
        }

        if (command === "link") {
            msg.channel.send(createEmbed(`${msg.author.username}`, 'https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8'));
        }

        if (command === "amongus") {
            if (!msg.member.voice.channel) {
                msg.channel.send(createEmbed(`${msg.author.username}`, 'You have to join a voice-channel to run this command!'));
                return;
            }

            for (let i = 0; i < amongus.length; i++) {
                if (amongus[i].user === msg.author || amongus[i].kanaal === msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, "You are already hosting a game. You can't host more than one game!"));
                    return;
                }
            }

            var embed = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                .setTitle(`${msg.author.username}`)
                .setDescription(`React with an :white_check_mark: when there is a meeting, react with an :x: when the meeting is finished.\nDo **${prefix}amongusstop** when the game is done or you are leaving.`)
                .setColor(16426522)
                .setTimestamp()
                .setFooter(`The host is: ${msg.author.username}\nThe channel where the game is currently playing: ${msg.member.voice.channel.name}`)

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
            if (!msg.member.voice.channel) {
                msg.channel.send(createEmbed(`${msg.author.username}`, "You have to join the voice-channel where you were to run this command!"));
                return;
            }
            for (let i = 0; i < amongus.length; i++) {
                if (amongus[i].user.id === msg.author.id) {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`The game has finished, do **${prefix}amongus** to start a new game.`)
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`The host was: ${amongus[i].user.username}\nThe channel was: ${amongus[i].channel.name}`)
                    msg.channel.send({ embed: embed }).then(embedMesage => {
                        msg.member.voice.channel.edit({
                            userLimit: 0,
                        });

                        let channel = amongus[i].channel;
                        for (let member of channel.members) {
                            member[1].edit({ mute: false });
                        }
                        amongus.splice(amongus.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);
                    });
                } else {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `You're not allowed to finish a game. Do **${prefix}amongus** to start your own game.`));
                }
            }
        }
    }
    catch(err) {
        bot.users.cache.get(owner).send(createEmbed("ERROR", `Among Us Bot heeft een error gekregen: ${err}`));
        msg.reply(createEmbed("ERROR", `ERROR: The bot has got an error, the error is sended to the owner.`));
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    for (let i = 0; i < amongus.length; i++) {
        if (amongus[i].user != user) {
            console.log(amongus[i].user, user);
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
