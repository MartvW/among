const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag}`);
    console.log("");

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${process.env.PREFIX}info`,
        }
    })
});



bot.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        msg.channel.send("Pong");
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
            msg.member.voice.channel.edit({
                userLimit: 10,
            });
        });
    }

});

bot.login(process.env.BOT_TOKEN);
