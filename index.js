const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var amongususer = "";
var amonguschannel = "";
var amongusnaam = "";
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
        "description": `Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten:\n\n- **${prefix}amongus** \n- **${prefix}amongusstop.`,
        "fields": [
            {
                "name": ".....................",
                "value": "Als er iets onduidelijk is kan je de helpserver joinen: https://discord.gg/sjw7ZAb"
            }
        ]
    }
}

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

        var embed = new Discord.MessageEmbed()
            .setTitle(`Among Us`)
            .setDescription(`Reageer met een :white_check_mark: als er een meeting is en met een :x: als er geen meeting is`)
            .setFooter(`De host is: ${msg.author.username}\nHet kanaal waarin de game wordt gehouden is: ${msg.member.voice.channel.name}`)
            .setColor(16426522)

        msg.channel.send({ embed: embed }).then(embedMesage => {
            amongususer = msg.author;
            amongusbericht = embedMesage;
            amonguschannel = msg.member.voice.channel;
            amongusnaam = msg.member.voice.channel;
            msg.member.voice.channel.edit({
                userLimit: 10,
                name: "Among Us",
            });
            amongusbericht.react('✅');
            amongusbericht.react('❌');
        });
    }

    if (command === "amongusstop") {
        if (amongususer.id === msg.author.id) {
            var embed = new Discord.MessageEmbed()
                .setTitle(`Among Us`)
                .setDescription(`De game is gestopt, doe **${prefix}amongus** om weer een nieuwe game te starten.`)
                .setFooter(`De host was: ${amongususer}\nHet kanaal waarin de game werd gehouden is: ${amonguschannel}`)
                .setColor(16426522)
            msg.channel.send({ embed: embed }).then(embedMesage => {
                amongusbericht = "";
                amongususer = "";
                amonguschannel.edit({
                    userLimit: 0,
                    name: amongusnaam,
                });
            });

            let channel = amonguschannel;
            for (let member of channel.members) {
                member[1].edit({ mute: false });
            }
        } else {
            msg.channel.send("Je bent niet bevoegd om de game te stoppen!");
        }
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (user.id != amongususer.id) {
        reaction.remove();
        amongususer.react(reaction._emoji.name);
        return;
    }

    if (reaction.message.id === amongusbericht.id) {
        if (reaction._emoji.name === "✅") {
            //unmute iedereen
            reaction.remove();
            amongusbericht.react(reaction._emoji.name);
            let channel = amonguschannel;
            for (let member of channel.members) {
                member[1].edit({ mute: false });
            }
        } else if (reaction._emoji.name === "❌") {
            //mute iedereen
            reaction.remove();
            amongusbericht.react(reaction._emoji.name);
            let channel = amonguschannel;
            for (let member of channel.members) {
                member[1].edit({ mute: true });
            }
        }
    }

});

bot.login(process.env.BOT_TOKEN);
