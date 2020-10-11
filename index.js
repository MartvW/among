const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var owner = process.env.OWNER;
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
            },
            {
                "name": `${prefix}ping`,
                "value": "You can see your ping with this command."
            },
            {
                "name": `${prefix}uptime`,
                "value": "Get the uptime from the bot."
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

//ROOD: 15746887
//ORANJE: 16426522

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`);
    var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us`)
            .setDescription(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`)
            .setColor(16426522)
    bot.users.cache.get(owner).send(embed);
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
    var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us`)
            .setDescription(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`)
            .setColor(16426522)
    bot.users.cache.get(owner).send(embed);
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

    var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us`)
            .setDescription(`De bot is succesvol opgestart als ${bot.user.tag} op ${servers} servers en ${users} gebruikers`)
            .setColor(16426522)
    bot.users.cache.get(owner).send(embed);
    
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
        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us - @${msg.author.username}`)
            .setDescription("You can try it but it does not work in DM, trust me...")
            .setColor(16426522)
        msg.reply(embed);
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ + /);
    const command = args.shift().toLowerCase();
    
    try {
        if (command === "help") {
            msg.channel.send(embedHelp);
            msg.channel.send(embedLetOp);
        }
        
        if (command === "reset") {
            if (msg.author.id !== owner) return false;
            var embed = new Discord.MessageEmbed()
                .setTitle(`Among Us - @${msg.author.username}`)
                .setDescription(`Bezig met resetten...`)
                .setColor(16426522)
            msg.reply(embed);
            bot.destroy();
            bot.login(token);
        };

        if (command === "uptime") {
            let totalSeconds = (bot.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            var embed = new Discord.MessageEmbed()
                .setTitle(`Among Us - @${msg.author.username}`)
                .setDescription(`Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`)
                .setColor(16426522)
            msg.channel.send(embed);
        }

        if (command === "ping") {
            msg.channel.send("Pinging...").then(m => {
                var ping = m.createdTimestamp - msg.createdTimestamp;

                // Basic embed
                var embed = new Discord.MessageEmbed()
                    .setAuthor(`Your ping is: ${ping}ms`)
                    .setColor(15746887)

                // Then It Edits the message with the ping variable embed that you created
                m.edit(embed);
            });
        }

        if (command === "link") {
            var embed = new Discord.MessageEmbed()
                .setTitle(`Among Us - @${msg.author.username}`)
                .setDescription('https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8')
                .setColor(16426522)
            msg.channel.send(embed);
        }

        if (command === "amongus") {
            if (!msg.member.voice.channel) {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Among Us - @${msg.author.username}`)
                    .setDescription("You have to join a voice-channel to run this command!")
                    .setColor(16426522)
                msg.channel.send(embed);
                return;
            }

            for (let i = 0; i < amongus.length; i++) {
                if (amongus[i].user === msg.author || amongus[i].kanaal === msg.member.voice.channel) {
                    var embed = new Discord.MessageEmbed()
                        .setTitle(`Among Us - @${msg.author.username}`)
                        .setDescription("You are already hosting a game. You can't host more than one game!")
                        .setColor(16426522)
                    msg.channel.send(embed);
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
            if (!msg.member.voice.channel) {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Among Us - @${msg.author.username}`)
                    .setDescription("You have to join the voice-channel where you were to run this command!")
                    .setColor(16426522)
                msg.channel.send(embed);
                return;
            }
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

                        let channel = amongus[i].channel;
                        for (let member of channel.members) {
                            member[1].edit({ mute: false });
                        }
                        amongus.splice(amongus.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);
                    });
                } else {
                    var embed = new Discord.MessageEmbed()
                        .setTitle(`Among Us - @${msg.author.username}`)
                        .setDescription(`You're not allowed to finish a game. Do **${prefix}amongus** to start your own game.`)
                        .setColor(16426522)
                    msg.channel.send(embed);
                }
            }
        }
    }
    catch(err) {
        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us - ERROR`)
            .setDescription(`Among Us Bot heeft een error gekregen: ${err}`)
            .setColor(15746887)
        bot.users.cache.get(owner).send(embed);
        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us - ERROR`)
            .setDescription(`ERROR: The bot has got an error, the error is sended to the owner.`)
            .setColor(15746887)
        msg.reply(embed);
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
