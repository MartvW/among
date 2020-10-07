const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var amongus = [];
var amongususer = [];
var amonguschannel = [];
var amongusbericht = "";

const embedHelp = {
    "embed": {
        "title": "Among Us - Help",
        "color": 16426522,
        "fields": [
            {
                "name": `${prefix}help`,
                "value": "Om dit bericht te laten zien."
            },
            {
                "name": `${prefix}link`,
                "value": "Hiermee kan je de invite link mee krijgen van de bot."
            },
            {
                "name": `${prefix}amongus`,
                "value": "Om een game te starten."
            },
            {
                "name": `${prefix}amongusstop`,
                "value": "Om een game te laten stoppen."
            }
        ]
    }
}

const embedLetOp = {
    "embed": {
        "title": "Among Us - Help",
        "color": 15746887,
        "description": `Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten:\n\n- **${prefix}amongus** \n- **${prefix}amongusstop**`,
        "fields": [
            {
                "name": ".....................",
                "value": "Als er iets onduidelijk is kan je de helpserver joinen: https://discord.gg/sjw7ZAb"
            }
        ]
    }
}

bot.on("guildCreate", guild => {
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers!`);
});

bot.on("guildDelete", guild => {
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
});

bot.on('ready', () => {
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag}`);
    console.log("");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help`,
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
        msg.channel.send('https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=0');
    }

    if (command === "amongus") {
        if (!msg.member.voice.channel) {
            msg.channel.send("Je moet in een voice-channel zitten!");
            return;
        }

        for (let potje of amongus) {
            if (potje.user === msg.author || potje.kanaal === msg.member.voice.channel) {
                msg.channel.send("Je host al een game!");
                return;
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us`)
            .setDescription(`Reageer met een :white_check_mark: als er een meeting is en met een :x: als er geen meeting is`)
            .setFooter(`De host is: ${msg.author.username}\nHet kanaal waarin de game wordt gehouden is: ${msg.member.voice.channel.name}`)
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
                    .setTitle(`Among Us`)
                    .setDescription(`De game is gestopt, doe **${prefix}amongus** om weer een nieuwe game te starten.`)
                    .setFooter(`De host was: ${amongus[i].user.username}\nHet kanaal waarin de game werd gehouden is: ${amongus[i].channel.name}`)
                    .setColor(16426522)
                msg.channel.send({ embed: embed }).then(embedMesage => {
                    amongus[i].bericht = "";
                    amongus[i].user = "";
                    amongus[i].channel.edit({
                        userLimit: 0,
                    });
                });

                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
            } else {
                msg.channel.send("Je bent niet bevoegd om de game te stoppen!");
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
            amongus.bericht.react(reaction._emoji.name);
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
