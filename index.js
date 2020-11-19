const Discord = require('discord.js');
const { create } = require('domain');
const fs = require('fs');
const bot = new Discord.Client();
const { Client } = require('pg');
const { isError } = require('util');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var owner = process.env.OWNER;
var updateID = "766310034871025744";
var resetID = "772715139563782154";
var logID = "774302388903084042";
var botInfokanaal = "767432509980934154";
var discordserver = "https://discord.gg/sjw7ZAb";
var amongus = [];
var codes = [];
var locks = [];
var aantalgames = 0;
var aantallocks = 0;
var aantalcodes = 0;
var statusIndex = 0;
var aantalcommands = 0;
var slot = false;
var slotnaam = "";
var taalMessage = "";
var taalGebruiker = "";
var adminMessage = "";
var laatstecommand = "-";
var laatstebericht = "-";
var resetMessage = "";

function helpEmbed(prefixs, lang) { 
    if (lang === "nl") {
        var embedHelp = new Discord.MessageEmbed()
        .setAuthor(`Among Us`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
        .setTitle("Help")
        .setDescription(`Hier is een lijstje met de commands die je kan gebruiken.`)
        .addFields(
            { name: `${prefixs}setprefix`, value: 'Hiermee kan je je eigen prefix instellen.', inline: true },
            { name: `${prefixs}setlang`, value: 'Hiermee kan je je eigen taal instellen.', inline: true },
            { name: `resetprefix`, value: 'Om de prefix van de server te resetten.', inline: true },
            { name: `${prefixs}info`, value: 'Hiermee kan je informatie zien over de server.', inline: true },
            { name: `${prefixs}help`, value: 'Om dit bericht te laten zien.', inline: true },
            { name: `${prefixs}link`, value: 'Je kan de invite-link krijgen via deze command.', inline: true },
            { name: `${prefixs}amongus`, value: 'Wanneer je een game wilt starten.', inline: true },
            { name: `${prefixs}amongusstop`, value: 'Wanneer je de game wilt eindigen.', inline: true },
            { name: `${prefixs}ping`, value: 'Hiermee kan je je ping zien.', inline: true },
            { name: `${prefixs}uptime`, value: 'Hoelang de bot online is.', inline: true },
            { name: `${prefixs}map`, value: 'Om het lijstje van alle mappen te zien.', inline: true },
            { name: `${prefixs}polus`, value: 'Om de kaart te zien van Polus.', inline: true },
            { name: `${prefixs}skeld`, value: 'Om de kaart te zien van The Skeld.', inline: true },
            { name: `${prefixs}mira`, value: 'Om de kaart te zien van MIRA HQ.', inline: true },
            { name: `${prefixs}setcode`, value: 'Om de code in te stellen.', inline: true },
            { name: `${prefixs}resetcode`, value: 'Om de code te resetten.', inline: true },
            { name: `${prefixs}code`, value: 'Om de code te zien van het kanaal.', inline: true },
            { name: `${prefixs}lock`, value: 'Het kanaal te locken waar je inzit.', inline: true },
            { name: `${prefixs}unlock`, value: 'Het kanaal te unlocken waar je inzit.', inline: true },
        )
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`Among Us`)
        return embedHelp;
    } else if (lang === "en") {
        var embedHelp = new Discord.MessageEmbed()
        .setAuthor(`Among Us`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
        .setTitle("Help")
        .setDescription(`A list of all the commands I know.`)
        .addFields(
            { name: `${prefixs}setprefix`, value: 'To set your own prefix.', inline: true },
            { name: `${prefixs}setlang`, value: 'To set your own language.', inline: true },
            { name: `resetprefix`, value: 'To reset your own prefix.', inline: true },
            { name: `${prefixs}info`, value: 'You can get information about the server.', inline: true },
            { name: `${prefixs}help`, value: 'To show this message.', inline: true },
            { name: `${prefixs}link`, value: 'You can get usefull links with this command.', inline: true },
            { name: `${prefixs}amongus`, value: 'When you want to start a game.', inline: true },
            { name: `${prefixs}amongusstop`, value: 'To finish the game.', inline: true },
            { name: `${prefixs}ping`, value: 'Get your ping.', inline: true },
            { name: `${prefixs}uptime`, value: 'See the uptime from the bot.', inline: true },
            { name: `${prefixs}map`, value: 'A list of all the maps.', inline: true },
            { name: `${prefixs}polus`, value: 'To show the map of Polus.', inline: true },
            { name: `${prefixs}skeld`, value: 'To show the map of The Skeld.', inline: true },
            { name: `${prefixs}mira`, value: 'To show the map of MIRA HQ.', inline: true },
            { name: `${prefixs}setcode`, value: 'To set the game code.', inline: true },
            { name: `${prefixs}resetcode`, value: 'To reset the game code.', inline: true },
            { name: `${prefixs}code`, value: 'Show the code of the channel.', inline: true },
            { name: `${prefixs}lock`, value: 'To lock the channel.', inline: true },
            { name: `${prefixs}unlock`, value: 'To unlock the channel.', inline: true },
        )
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`Among Us`)
        return embedHelp;
    }
}

function embedLetOp(prefixs, lang) {
    if (lang === "nl") {
        var embedHelp = new Discord.MessageEmbed()
        .setAuthor(`Among Us`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
        .setTitle("Help")
        .setDescription(`Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefixs}amongus**\n- **${prefixs}lock**\n- **${prefixs}unlock**`)
        .setColor(15746887)
        .addFields(
            { name: `.....................`, value: `Hiermee kan je de help-server joinen: ${discordserver}`, inline: false },
        )
        .setTimestamp()
        .setFooter(`Among Us`)
        return embedHelp;
    } else if (lang === "en") {
        var embedHelp = new Discord.MessageEmbed()
        .setAuthor(`Among Us`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
        .setTitle("Help")
        .setDescription(`To run some commands you have to be in a voice-channel. These following commands you must have to be in a voice-channel to run it:\n\n- **${prefixs}amongus**\n- **${prefixs}lock**\n- **${prefixs}unlock**`)
        .setColor(15746887)
        .addFields(
            { name: `.....................`, value: `The invite link of the help-server: ${discordserver}`, inline: false },
        )
        .setTimestamp()
        .setFooter(`Among Us`)
        return embedHelp;
    }
}

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

async function resetBot() {
    var status = "";
    if (bot.user.presence.status === "online") {
        status = "🟢";
    } else if (bot.user.presence.status === "offline") {
        status = "🔴";
    } else if (bot.user.presence.status === "idle") {
        status = "🟠";
    } else if (bot.user.presence.status === "invisible" || bot.user.presence.status === "dnd") {
        status = "⚫️";
    }
    
    if (slot) {
        slotnaam = "aan";
    } else {
        slotnaam = "uit";
    }
    
    var resetEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Reset Panel")
        .setDescription(`Slot: **${slotnaam}**\nAantal games: **${amongus.length}**\nAantal codes: **${codes.length}**\nAantal locks: **${locks.length}**\n\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nTotaal aantal locks: **${aantallocks}**\n\nHard reset: ⚙️\nCode reset: ⛏\nGame reset: 🛠\nLocks reset: 🔐\nNOODSTOP: 🔴`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    
    const channel = bot.channels.cache.find(channel => channel.id === resetID);
    channel.send({ embed: resetEmbed }).then(embedMesage => {
        embedMesage.react('⚙️');
        embedMesage.react('⛏');
        embedMesage.react('🛠');
        embedMesage.react('🔐');
        embedMesage.react('🔴');
        resetMessage = embedMesage;
    });
}

async function updateAdmin(botbio) {
    const vandaag = new Date();
    const uura = vandaag.getHours();
    const minuta = vandaag.getMinutes();
    const seconda = vandaag.getSeconds();

    const servers = await bot.guilds.cache.size;
    const users = await bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    var totalSeconds = (bot.uptime / 1000);
    var botSeconds = Math.floor(totalSeconds);
    var days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    
    var dag = "";
    if (days === 0) {
        dag = `${days} dagen`;
    } else if (days === 1) {
        dag = `${days} dag`;
    } else {
        dag = `${days} dagen`;
    }
    var uur = `${hours} uur`;
    var minuut = "";
    if (minutes === 0) {
        minuut = `${minutes} minuten`;   
    } else if (minutes === 1) {
        minuut = `${minutes} minuut`;   
    } else {
        minuut = `${minutes} minuten`;
    }
    var seconden = "";
    if (seconds === 0) {
        seconden = `${seconds} seconden`;   
    } else if (seconds === 1) {
        seconden = `${seconds} seconde`;   
    } else {
        seconden = `${seconds} seconden`;
    }
    
    var uptimestring = `${dag}, ${uur}, ${minuut} en ${seconden}.`;
    
    var verificatie = "";
    if (bot.user.verified) {
        verificatie = "✅";
    } else {
        verificatie = "❌";
    }
    var status = "";
    if (bot.user.presence.status === "online") {
        status = "🟢";
    } else if (bot.user.presence.status === "offline") {
        status = "🔴";
    } else if (bot.user.presence.status === "idle") {
        status = "🟠";
    } else if (bot.user.presence.status === "invisible" || bot.user.presence.status === "dnd") {
        status = "⚫️";
    }
    
    if (slot) {
        slotnaam = "aan";
    } else {
        slotnaam = "uit";
    }
    
    var adminEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Botinformatie")
        .setDescription(`Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nBotbiografie: **${botbio}**\nBotprefix: **${prefix}**\nLaatste command: **${laatstecommand}**\nAantal commands: **${aantalcommands}**\nAantal codes: **${codes.length}**\nAantal locks: **${locks.length}**\nAantal games: **${amongus.length}**\nAantal servers: **${servers} servers**\nAantal gebruikers: **${users} gebruikers**\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nTotaal aantal locks: **${aantallocks}**\nUptime: **${uptimestring}**\nUptime in seconden: **${botSeconds} sec.**`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    var resetEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Reset Panel")
        .setDescription(`Slot: **${slotnaam}**\nAantal games: **${amongus.length}**\nAantal codes: **${codes.length}**\nAantal locks: **${locks.length}**\n\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nTotaal aantal locks: **${aantallocks}**\n\nHard reset: ⚙️\nCode reset: ⛏\nGame reset: 🛠\nLocks reset: 🔐\nNOODSTOP: 🔴`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)

    if (adminMessage === "") {
        const channel = bot.channels.cache.find(channel => channel.id === botInfokanaal);
        channel.send(adminEmbed).then(m => {
            adminMessage = m;
        });
    } else {
        adminMessage.edit(adminEmbed);
        resetMessage.edit(resetEmbed);
    }
}

function errorMessage(err) {
   var errEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Error")
        .setDescription(`${err}`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    const channel = bot.channels.cache.find(channel => channel.id === logID);
    channel.send(errEmbed);
}

bot.on("error", async msg => {
    for (let i = 0; i < amongus.length; i++) {
       amongus[i].channel.edit({
            userLimit: amongus[i].userlimit,
        });

        let channel = amongus[i].channel;
        for (let member of channel.members) {
            member[1].edit({ mute: false });
        }
    }
    amongus = [];
    codes = [];
    for (let i = 0; i < locks.length; i++) {
        locks[i].channel.edit({
            userLimit: locks[i].userLimit, 
        });
    }
    locks = [];
    console.error(msg);
    bot.user.setPresence({
        status: 'offline',
        activity: {
            name: `ERROR`,
        }
    });
    errorMessage(msg);
    bot.login(token);
});

bot.on("disconnect", async msg => {
    for (let i = 0; i < amongus.length; i++) {
       amongus[i].channel.edit({
            userLimit: amongus[i].userlimit,
        });

        let channel = amongus[i].channel;
        for (let member of channel.members) {
            member[1].edit({ mute: false });
        }
    }
    amongus = [];
    codes = [];
    for (let i = 0; i < locks.length; i++) {
        locks[i].channel.edit({
            userLimit: locks[i].userLimit, 
        });
    }
    locks = [];
    
    updateAdmin(`Afsluiten...`);
    
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `Afsluiten...`,
        }
    });
});

bot.on("reconnecting", async msg => {
    for (let i = 0; i < amongus.length; i++) {
       amongus[i].channel.edit({
            userLimit: amongus[i].userlimit,
        });

        let channel = amongus[i].channel;
        for (let member of channel.members) {
            member[1].edit({ mute: false });
        }
    }
    amongus = [];
    codes = [];
    for (let i = 0; i < locks.length; i++) {
        locks[i].channel.edit({
            userLimit: locks[i].userLimit, 
        });
    }
    locks = [];
    
    updateAdmin(`Opnieuw opstarten...`);
    
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `Opnieuw opstarten...`,
        }
    });
});

bot.on("warn", async msg => {
    bot.user.setPresence({
        status: 'idle',
        activity: {
            name: ``,
        }
    });
    errorMessage(msg);
});

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    });
    client.query(`INSERT INTO prefixes VALUES (${guild.id}, '.');`, (err, res) => {
        if (!err) {
            if (res) {
                console.log(`${guild.name} is succesvol in de database "Prefix" gezet!`);
            }
        } else {
            console.log(err);
        }
    });

    client.query(`INSERT INTO servers VALUES (${guild.id}, 'nl');`, (err, res) => {
        if (!err) {
            if (res) {
                console.log(`${guild.name} is succesvol in de database "Servers" gezet!`);
            }
        } else {
            console.log(err);
        }
    });
//     guild.owner.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan **${guild.name}**.\nJe kan al mijn commands zien als je **${prefix}help** typt!\nDe Discord Server waar je je vragen kan stellen: ${discordserver}\n\nHierop kan je ook het kanaal **#bot-status** of **#botinformatie** volgen voor de updates en de informatie over de Discord Bot!`));
    guild.systemChannel.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan deze server!\nAl mijn commands kan je zien via **${prefix}help**\nJe kan de prefix aanpassen via **${prefix}setprefix**\nAls je vragen hebt kan je mijn help-server joinen: ${discordserver}\n\nVoor de mensen die mij willen inviten doe **${prefix}link** om de invite-link te krijgen!`));
    guild.systemChannel.send(createEmbed(`English`,`If you want to set the bot in English, do ***${prefix}setlang en***!`));
//     console.log(guild.ownerID, guild.owner);
//     bot.users.cache.get(guild.ownerID).send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan deze server!\nAl mijn commands kan je zien via **${prefix}help**\nAls je vragen hebt kan je mijn help-server joinen: ${discordserver}\n\nVoor de mensen die mij willen inviten doe **${prefix}link** om de invite-link te krijgen!`));
});

bot.on("guildDelete", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    });
    if (client.query(`SELECT * FROM prefixes WHERE guildId='${guild.id}';`)) {
        client.query(`DELETE FROM prefixes WHERE guildId='${guild.id}';`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${guild.name} is succesvol verwijderd uit de database "Prefix"!`);
                }
            } else {
                console.log(err);
            }
        });
    } else {
        console.log(`${guild.name} is niet verwijderd uit de database "Prefix" aangezien hij niet in de database stond!`);
    }

    if (client.query(`SELECT * FROM servers WHERE guildId='${guild.id}';`)) {
        client.query(`DELETE FROM servers WHERE guildId='${guild.id}';`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${guild.name} is succesvol verwijderd uit de database "Server"!`);
                }
            } else {
                console.log(err);
            }
        });
    } else {
        console.log(`${guild.name} is niet verwijderd uit de database "Server" aangezien hij niet in de database stond!`);
    }
//     console.log(guild.ownerID, guild.owner);
//     bot.users.cache.get(guild.ownerID).send(createEmbed(`${bot.user.username}`,`Jammer dat je mij niet meer gebruikt op **${guild.name}**.\nWij vinden het spijtig om te horen! Ik hoop in ieder geval dat je hebt genoten van de tijd waarneer je mij hebt gebruikt!\nDe Discord Server van mij: ${discordserver}\n\nMet vriendelijke groet,\nAmong Us`));
//     u.send(createEmbed(`${bot.user.username}`,`Jammer dat je mij niet meer gebruikt op **${guild.name}**.\nWij vinden het spijtig om te horen! Ik hoop in ieder geval dat je hebt genoten van de tijd waarneer je mij hebt gebruikt!\nDe Discord Server van mij: ${discordserver}\n\nMet vriendelijke groet,\nAmong Us`))
});

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

bot.on("ready", async () => {
    var servers = await bot.guilds.cache.size;
    var users = await bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    let aantals = await client.query(`SELECT * FROM prefixes;`);
    let aantals2 = await client.query(`SELECT * FROM servers;`);

    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers en op ${users} gebruikers. In database "Prefix" zitten ${aantals.rows.length} servers! In database "Servers" zitten ${aantals2.rows.length} servers!`);
    console.log("");

    const channel = await bot.channels.cache.find(channel => channel.id === botInfokanaal);
    channel.bulkDelete(1);
    
    updateAdmin(`Opstarten...`);
 
    const channel2 = await bot.channels.cache.find(channel => channel.id === resetID);
    channel2.bulkDelete(1);
    
    resetBot();

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `Opstarten...`,
        }
    });
    
    setInterval(() => {
        servers = bot.guilds.cache.size;
        users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        
        var vandaag = new Date();
        var dag = vandaag.getDate();
        var maand = vandaag.getMonth();
        var uur = vandaag.getHours();
        var jaar = vandaag.getFullYear();
        var minuten = vandaag.getMinutes();

        var status = [
            `Op ${servers} servers!`,
            `${prefix}setprefix | <prefix>`,
            `${prefix}setlang | NL / EN`,
            `${users} mensen gebruiken deze bot!`,
            `${prefix}help | ${bot.user.tag}`,
            `${checkTime(uur+1)}:${checkTime(minuten)} uur`,
            `${prefix}help | ${discordserver}`,
            `Gemaakt door Mart!`,
            `${prefix}amongus | Start command!`,
            `${prefix}link | Invite link!`,
            `${prefix}map | Map commands!`,
        ];
        
        statusIndex += 1;
        
        if (statusIndex > status.length-1) {
            statusIndex = 0;    
        }
        
        bot.user.setPresence({
            status: 'online',
            activity: {
                name: `${status[statusIndex]}`,
            }
        });
        
        updateAdmin(status[statusIndex]);
        // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on("message", async msg => {
    if (msg.guild === null) {
        msg.reply(createEmbed(`${msg.author.username}`, `Je kan geen privéberichten naar mij sturen...`));
        return;
    }

    let prefix = await client.query(`SELECT prefix FROM prefixes WHERE guildId='${msg.guild.id}';`);
    let taal = await client.query(`SELECT lang FROM servers WHERE guildId='${msg.guild.id}';`);
    if (taal.rowCount === 0) {
        client.query(`INSERT INTO servers VALUES (${msg.guild.id}, 'nl');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${msg.guild.name} (${msg.guild.id}) is succesvol in de database "Servers" gezet!`);
                }
            } else {
                console.log(err);
            }
        });
        return;
    };

    if (prefix.rowCount === 0) {
        client.query(`INSERT INTO prefixes VALUES (${msg.guild.id}, '.');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${msg.guild.name} (${msg.guild.id}) is succesvol in de database "Prefix" gezet!`);
                }
            } else {
                console.log(err);
            }
        });
        return;
    };

    taal = taal.rows[0].lang;
    prefix = prefix.rows[0].prefix;

    if (msg.author.bot) return;
    if (msg.content === "resetprefix") {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            if (taal === "nl") {
                msg.channel.send(createEmbed(`${msg.author.username}`,"Je hebt geen bevoegdheden om de prefix van deze server aan te passen!"));
            } else {
                msg.channel.send(createEmbed(`${msg.author.username}`, `You don't have the permissions to change the prefix of the server!`));
            }
            return;
        }

        client.query(`UPDATE prefixes SET prefix='.' WHERE guildId='${msg.guild.id}';`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`Prefix van ${msg.guild.name} is gereset!`);
                }
            } else {
                console.log(err);
            }
        });
        if (taal === "nl") {
            msg.channel.send(createEmbed(`Prefix`, `De prefix van **${msg.guild.name}** is gereset naar **.**`));
        } else {
            msg.channel.send(createEmbed(`Prefix`, `The prefix for **${msg.guild.name}** has changed to **.**`));
        }
    }

    laatstebericht = `${msg.guild.name} > ${msg.channel.name} - @${msg.author.tag}: ${msg.content}`;
    if (!msg.content.startsWith(prefix)) return;
    
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    laatstecommand = `${msg.content} (@${msg.author.tag})`;
    
    if (slot === false) {
        aantalcommands++;
        try {
            if (command === "help") {
                msg.channel.send(helpEmbed(prefix, taal));
                msg.channel.send(embedLetOp(prefix, taal));
            }

            if (command === "info") {
                if (taal === "nl") {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.guild.name}`)
                        .setDescription(`Informatie over de server **${msg.guild.name}**`)
                        .setThumbnail(`${msg.guild.iconURL()}`)
                        .addFields(
                            { name: `Prefix:`, value: `${prefix}`, inline: true },
                            { name: `Taal:`, value: `Nederlands`, inline: true },
                        )
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`Among Us`)
                    msg.channel.send(embed);
                } else {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.guild.name}`)
                        .setDescription(`Information about the server **${msg.guild.name}**`)
                        .setThumbnail(`${msg.guild.iconURL()}`)
                        .addFields(
                            { name: `Prefix:`, value: `${prefix}`, inline: true },
                            { name: `Language:`, value: `English`, inline: true },
                        )
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`Among Us`)
                    msg.channel.send(embed);
                }
            }

            if (command === "setlang") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,"Je hebt geen bevoegdheden om de taal van deze server aan te passen!"));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You don't have the permissions to change the language of the server!`));
                    }
                    return;
                }

                // if (args[0] !== "nl" && args[0] !== "en") {
                //     if (taal === "nl") {
                //         msg.channel.send(createEmbed(`${msg.author.username}`,`Doe ${prefix}setlang _<nl / en>_`));
                //     } else {
                //         msg.channel.send(createEmbed(`${msg.author.username}`,`Do ${prefix}setlang _<nl / en>_`));
                //     }
                //     return;
                // }

                // if (!args[0]) {
                //     if (taal === "nl") {
                //         msg.channel.send(createEmbed(`${msg.author.username}`,`Doe ${prefix}setlang _<nl / en>_`));
                //     } else {
                //         msg.channel.send(createEmbed(`${msg.author.username}`,`Do ${prefix}setlang _<nl / en>_`));
                //     }
                //     return;
                // }

                if (taal === "nl") {
                    msg.channel.send(createEmbed(`Taalinstellingen`, `Reageer met 🇳🇱 om de taal in het Nederlands te zetten.\nReageer met 🇬🇧 om de taal in het Engels te zetten.`)).then(embedMessage => {
                        taalMessage = embedMessage;
                        taalGebruiker = msg.member;
                        embedMessage.react('🇳🇱');
                        embedMessage.react('🇬🇧');
                    });
                }

                // if (args[0] === "nl") {
                //     msg.channel.send(createEmbed(`Taal`, `De taal van **${msg.guild.name}** is veranderd naar ***${args[0]}***!`));
                // } else if (args[0] === "en") {
                //     msg.channel.send(createEmbed(`Language`, `Language has changed to ***${args[0]}***!`));

                // }
            }

            if (command === "database" && msg.author.id === owner) {

                let aantals = await client.query(`SELECT * FROM prefixes;`);
                let aantals2 = await client.query(`SELECT * FROM servers;`);
                
                let bericht = "";
                let bericht2 = "";
                for (let i = 0; i < aantals.rows.length; i++) {
                    const guildname = await bot.guilds.cache.find(guild => guild.id === aantals.rows[i].guildid);
                    bericht += `Guild: **${guildname}** (${aantals.rows[i].guildid})\nPrefix: **${aantals.rows[i].prefix}**\n`;
                }

                for (let j = 0; j < aantals2.rows.length; j++) {
                    const guildname = await bot.guilds.cache.find(guild => guild.id === aantals2.rows[j].guildid);
                    bericht2 += `Guild: **${guildname}** (${aantals2.rows[j].guildid})\nTaal: **${aantals2.rows[j].lang}**\n`;
                }
                // console.log(aantals);
                if (taal === "nl") {
                    msg.channel.send(createEmbed(`Database Values`, `Aantal servers in de Database: **${aantals.rows.length+aantals2.rows.length}**\n\nAantal servers: **${aantals.rows.length}**\n${bericht}\n\nAantal servers: **${aantals2.rows.length}**\n${bericht2}`));
                } else {
                    msg.channel.send(createEmbed(`Database Values`, `Total servers in Database: **${aantals.rows.length+aantals2.rows.length}**\n\nTotal servers: **${aantals.rows.length}**\n${bericht}\n\nTotal servers: **${aantals2.rows.length}**\n${bericht2}`));
                }
            }

            

            if (command === "setprefix") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,"Je hebt geen bevoegdheden om de prefix van deze server aan te passen!"));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,"You don't have the permissions to change the prefix of this server!"));
                    }
                    return;
                }

                if (!args[0]) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Doe ${prefix}setprefix _<prefix>_`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Do ${prefix}setprefix _<prefix>_`));
                    }
                    return;
                }

                if (args[0].length >= 10) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Prefix mag maximaal 10 characters bevatten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Prefix has a maximum of 10 characters!`));
                    }
                    return;
                } 

                client.query(`UPDATE prefixes SET prefix='${args[0]}' WHERE guildId='${msg.guild.id}';`, (err, res) => {
                    if (!err) {
                        if (res) {
                            console.log(`Prefix van ${msg.guild.name} is veranderd naar ${args[0]}!`);
                        }
                    } else {
                        console.log(err);
                    }
                });

                // let prefixes = JSON.parse(fs.readFileSync("./prefixes.json","utf-8"));

                // prefixes[msg.guild.id] = {
                //     prefixes: args[0]
                // };

                // fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
                //     if (err) {
                //         console.err(err);
                //     }
                // });

                if (taal === "nl") {
                    msg.channel.send(createEmbed(`Prefix`, `De prefix van **${msg.guild.name}** is gezet naar ***${args[0]}***!`));
                } else {
                    msg.channel.send(createEmbed(`Prefix`, `The prefix for **${msg.guild.name}** is changed to ***${args[0]}***!`));
                }
            }

            if (command === "update" && msg.author.id === owner) {
                if (args.length < 1) {
                    msg.channel.send(createEmbed('Mart W.', `Je moet wel argumenten toevoegen voor de update`));
                    return;
                }
                msg.channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`));
                const channel = bot.channels.cache.find(channel => channel.id === updateID);
                channel.send(`@here`).then(m => {
                   m.delete();
                   channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`))
                });
            }

            if (command === "resetcount" && msg.author.id === owner) {
                aantalgames = 0;   
                aantalcodes = 0;
            }

            if (command === "reset" && msg.author.id === owner) {
                for (let i = 0; i < amongus.length; i++) {
                   amongus[i].channel.edit({
                        userLimit: amongus[i].userlimit,
                    });

                    let channel = amongus[i].channel;
                    for (let member of channel.members) {
                        member[1].edit({ mute: false });
                    }
                }

                msg.reply(createEmbed("Reset", `Resetcommand uitgevoerd! Bezig met resetten...`))
                amongus = [];
            }
            
            if (command === "lock") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }
                
                if (locks.length === 0) {
                    locks.push({
                        "channel": msg.member.voice.channel,
                        "userLimit": msg.member.voice.channel.userLimit,
                    });
                    
                    msg.member.voice.channel.edit({
                         userLimit: 1,
                     });
                    aantallocks++
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is locked!\nDo **${prefix}unlock** to unlock this channel!`));
                    }
                } else {
                    for (let i = 0; i < locks.length; i++) {
                        if (locks[i].channel === msg.member.voice.channel) {
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `Dit kanaal is al gelocked!`));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `This channel is already locked!`));
                            }
                            return;
                        }

                        locks.push({
                            "channel": msg.member.voice.channel,
                            "userLimit": msg.member.voice.channel.userLimit,
                        });

                        msg.member.voice.channel.edit({
                            userLimit: 1,
                        });
                        aantallocks++;
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is locked!\nDo **${prefix}unlock** to unlock this channel!`));
                        }
                    }
                }
            }
            
            if (command === "unlock") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }
                
                if (locks.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is on this moment not locked.\nDo **${prefix}lock** to lock this channel!`));
                    }
                    return;
                }
                
                for (let i = 0; i < locks.length; i++) {
                    if (locks[i].channnel === msg.member.voice.chanel) {
                        locks[i].channel.edit({
                            userLimit: locks[i].userLimit, 
                        });
                        locks.splice(locks.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);
                        
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is geunlocked!\nDoe **${prefix}lock** om de kanaal weer te locken!`));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is unlocked!\nDo **${prefix}lock** to lock this channel!`));
                        }
                    } else {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is on this moment not locked.\nDo **${prefix}lock** to lock this channel!`));
                        } 
                    }
                }
            }
            
            if (command === "code") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }  
                
                if (codes.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** does'nt have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`));   
                    }
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    if (codes[i].channel.id != msg.member.voice.channel.id) {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** does'nt have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`));   
                        }
                        return;
                    }
                    msg.channel.send(createEmbed(`${msg.author.username}`,`${codes[i].code} - ${codes[i].server}`));
                    return;
                }
            }

            if (command === "setcode") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }

                if (args.length !== 2) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Je moet wel een code en de server toevoegen! ***${prefix}setcode <code> <server>***`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`You have to add the code and the server! ***${prefix}setcode <code> <server>***`));
                    }
                    return;
                }

                const code = args[0].toUpperCase();
                const server = args[1].toUpperCase();

                if (code.length != 6) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige code in!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Please fill in a real code!`));
                    }
                    return;
                }

                if (server === "NA" || server === "EU" || server === "AS") {
                    if (codes.length === 0) {
                        try {
                            codes.push({
                               "channel": msg.member.voice.channel, 
                               "code": code,
                               "server": server,
                               "name": msg.member.voice.channel.name, 
                            });

//                             const c = msg.member.voice.channel;
//                             await c.setName(`${c.name} | ${code} - ${server}`);
        //                     await c.edit({ name: `${c.name} | ${code} - ${server}` });
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `The code for ${msg.member.voice.channel.name} is changed to **${code}** and the server is **${server}**`));
                            }
                            aantalcodes += 1;
                        } catch (err) {
                            console.error(err);
                            if (taal === "nl") {
                                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
                            } else {
                                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`));
                            }
                        }
                    } else {
                        try {
                            for (let i = 0; i < codes.length; i++) {
                                if (codes[i].channel.id != msg.member.voice.channel.id) {
                                   codes.push({
                                       "channel": msg.member.voice.channel, 
                                       "code": code,
                                       "server": server,
                                       "name": msg.member.voice.channel.name, 
                                    });
//                                     const c = msg.member.voice.channel;
//                                     await c.setName(`${c.name} | ${code} - ${server}`);
                                    aantalcodes += 1;
        //                             await c.edit({ name: `${c.name} | ${code} - ${server}` });
                                } else {
                                    codes[i].code = code;
                                    codes[i].server = server;
//                                     const c = msg.member.voice.channel;
//                                     await c.setName(`${codes[i].name} | ${code} - ${server}`);
        //                             await c.edit({ name: `${codes[i].name} | ${code} - ${server}` });
                                    aantalcodes += 1;
                                }
                            }
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `The code for ${msg.member.voice.channel.name} is changed to **${code}** and the server is **${server}**`));
                            }
                        } catch (err) {
                            console.error(err);
                            if (taal === "nl") {
                                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
                            } else {
                                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`));
                            }
                        }
                    }
                } else {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige server in! **NA** of **EU** of **AS**`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Please fill in a real server! **NA** or **EU** or **AS**`));
                    }
                    return;
                }
            }

            if (command === "resetcode") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }
                if (codes.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** does'nt have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`));   
                    }
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    try {
                        if (codes[i].channel.id != msg.member.voice.channel.id) {
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** does'nt have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`));   
                            }
                            return;
                        }

//                         const c = codes[i].channel;
//                         await c.setName(`${codes[i].name}`);
        //                 await c.edit({ name: codes[i].name });
                        codes.splice(codes.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`Code succesvol verwijderd van **${msg.member.voice.channel.name}**!`));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`Code succesfully deleted from **${msg.member.voice.channel.name}**!`));
                        }
                        return;
                    } catch (err) {
                        console.error(err);
                        if (taal === "nl") {
                            msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
                        } else {
                            msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`));
                        }
                    }
                }
            }

            if (command === "map") {
                if (taal === "nl") {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Alle mappen van **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus** (${prefix}polus)\n-**MIRA HQ** (${prefix}mira)\n\nDoe ***${prefix}<mapnaam>*** om de kaart te zien van die map!`));
                } else {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `All maps from **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus** (${prefix}polus)\n-**MIRA HQ** (${prefix}mira)\n\nDo ***${prefix}<mapname>*** to show the map!`));
                }
            }

            if (command === "skeld") {
                 var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Map: **The Skeld**`)
                    .setColor(16426522)
                    .setTimestamp()
                    .setImage(`https://raw.githubusercontent.com/MartvW/among/master/the%20skeld.png`)
                    .setFooter(`${bot.user.tag}`)
                msg.channel.send(embed);
            }

            if (command === "polus") {
                 var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Map: **Polus**`)
                    .setColor(16426522)
                    .setTimestamp()
                    .setImage(`https://raw.githubusercontent.com/MartvW/among/master/latest.png`)
                    .setFooter(`${bot.user.tag}`)
                msg.channel.send(embed);
            }

            if (command === "mira") {
                 var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Map: **MIRA HQ**`)
                    .setColor(16426522)
                    .setTimestamp()
                    .setImage(`https://raw.githubusercontent.com/MartvW/among/master/Mirahq.png`)
                    .setFooter(`${bot.user.tag}`)
                msg.channel.send(embed);
            }

            if (command === "uptime") {
                const servers = await bot.guilds.cache.size;
                const users = await bot.users.cache.size;
                let totalSeconds = (bot.uptime / 1000);
                let botSeconds = Math.floor(totalSeconds);
                let days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.floor(totalSeconds % 60);

                if (taal === "nl") {
                    let dag = "";
                    if (days === 0) {
                        dag = `${days} dagen`;
                    } else if (days === 1) {
                        dag = `${days} dag`;
                    } else {
                        dag = `${days} dagen`;
                    }
                    let uur = `${hours} uur`;
                    let minuut = "";
                    if (minutes === 0) {
                        minuut = `${minutes} minuten`;   
                    } else if (minutes === 1) {
                        minuut = `${minutes} minuut`;   
                    } else {
                        minuut = `${minutes} minuten`;
                    }
                    let seconden = "";
                    if (seconds === 0) {
                        seconden = `${seconds} seconden`;   
                    } else if (seconds === 1) {
                        seconden = `${seconds} seconde`;   
                    } else {
                        seconden = `${seconds} seconden`;
                    }

                    let uptimestring = `${dag}, ${uur}, ${minuut} en ${seconden}.`;
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: **${uptimestring}**`));
                } else {
                    let dag = "";
                    if (days === 0) {
                        dag = `${days} days`;
                    } else if (days === 1) {
                        dag = `${days} day`;
                    } else {
                        dag = `${days} days`;
                    }
                    let uur = `${hours} hour`;
                    let minuut = "";
                    if (minutes === 0) {
                        minuut = `${minutes} minutes`;   
                    } else if (minutes === 1) {
                        minuut = `${minutes} minute`;   
                    } else {
                        minuut = `${minutes} minutes`;
                    }
                    let seconden = "";
                    if (seconds === 0) {
                        seconden = `${seconds} seconds`;   
                    } else if (seconds === 1) {
                        seconden = `${seconds} second`;   
                    } else {
                        seconden = `${seconds} seconds`;
                    }

                    let uptimestring = `${dag}, ${uur}, ${minuut} and ${seconden}.`;
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: **${uptimestring}**`));
                }
            }

            if (command === "ping") {
                const m = await msg.channel.send("Ping?");
                var ping = m.createdTimestamp - msg.createdTimestamp;
                m.edit(createEmbed(`Pong!`, `Latency is: **${ping}ms**.`));
            }

            if (command === "link") {
                if (taal === "nl") {
                    var embedHelp = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle("Handige links")
                        .addFields(
                            { name: `Discord server`, value: `${discordserver}`, inline: false },
                            { name: `Invite link bot`, value: 'https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8', inline: false },
                        )
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`${bot.user.tag}`)
                    msg.channel.send(embedHelp);  
                } else {
                    var embedHelp = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle("Usefull links")
                        .addFields(
                            { name: `Discord server`, value: `${discordserver}`, inline: false },
                            { name: `Invite link bot`, value: 'https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8', inline: false },
                        )
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`${bot.user.tag}`)
                    msg.channel.send(embedHelp);  
                } 
            }

            if (command === "amongus") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`));
                    }
                    return;
                }

                for (let i = 0; i < amongus.length; i++) {
                    if (amongus[i].user === msg.author || amongus[i].kanaal === msg.member.voice.channel) {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, "Je bent al een game aan het hosten. Je kan niet meer dan één game hosten!"));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, "You are already hosting a game. You can't host more than one game!"));
                        }
                        return;
                    }
                }

                if (taal === "nl") {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`Reageer met een :white_check_mark: wanneer er een meeting is, reageer met een :x: als de meeting is afgelopen.\nDoe **${prefix}amongusstop** als je gaat stoppen.`)
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`De host is: ${msg.author.username}\nHet kanaal waarin op dit moment een game is gestart: ${msg.member.voice.channel.name}`)
                } else {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`React with :white_check_mark: when there is a meeting, react with :x: if the meeting is finished.\nDo **${prefix}amongusstop** if you are stoppign.`)
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`The host is: ${msg.author.username}\nThe channel where the game is playing: ${msg.member.voice.channel.name}`)
                }

                msg.channel.send({ embed: embed }).then(embedMesage => {
                    amongus.push({
                        "id": amongus.length,
                        "user": msg.author,
                        "channel": msg.member.voice.channel,
                        "name": msg.member.voice.channel.name,
                        "bericht": embedMesage,
                        "meetingbezig": true,
                        "userlimit": msg.member.voice.channel.userLimit,
                    });

                    aantalgames++;

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
                        if (taal === "nl") {
                            var embed = new Discord.MessageEmbed()
                                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                                .setTitle(`${msg.author.username}`)
                                .setDescription(`De game is over, doe **${prefix}amongus** om een nieuw game te starten.`)
                                .setColor(16426522)
                                .setTimestamp()
                                .setFooter(`De host was: ${amongus[i].user.username}\nHet kanaal was: ${amongus[i].name}`)
                        } else {
                            var embed = new Discord.MessageEmbed()
                                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                                .setTitle(`${msg.author.username}`)
                                .setDescription(`The game has finished, do **${prefix}amongus** to start a new game.`)
                                .setColor(16426522)
                                .setTimestamp()
                                .setFooter(`The host was: ${amongus[i].user.username}\nThe channel was: ${amongus[i].name}`)
                        }
                        msg.channel.send({ embed: embed }).then(embedMesage => {
                            amongus[i].channel.edit({
                                userLimit: amongus[i].userlimit,
                            });

                            let channel = amongus[i].channel;
                            for (let member of channel.members) {
                                member[1].edit({ mute: false });
                            }
                            amongus.splice(amongus.indexOf({
                                "user": msg.author,
                            }), 1);
                        });
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
            errorMessage(err);
            if (taal === "nl") {
                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
            } else {
                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`));
            }
        }
    } else {
        if (taal === "nl") {
            msg.channel.send(createEmbed("Slot", `Op dit moment kan er geen commands worden uitgevoerd!`));   
        } else {
            msg.channel.send(createEmbed("Slot", `The commands has temporaly locked!`));   
        }
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.id === resetMessage.id) {
        if (reaction._emoji.name === "⚙️") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            //hardreset
            for (let i = 0; i < amongus.length; i++) {
               amongus[i].channel.edit({
                    userLimit: amongus[i].userlimit,
                });

                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
            }
            amongus = [];
            codes = [];
            for (let i = 0; i < locks.length; i++) {
                locks[i].channel.edit({
                    userLimit: locks[i].userLimit, 
                });
            }
            locks = [];
            return;
        } else if (reaction._emoji.name === "⛏") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            //code reset
            codes = [];
            return;
        } else if (reaction._emoji.name === "🛠") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            //game reset
            for (let i = 0; i < amongus.length; i++) {
               amongus[i].channel.edit({
                    userLimit: amongus[i].userlimit,
                });

                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
            }
            amongus = [];
            return;
        } else if (reaction._emoji.name === "🔴") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            for (let i = 0; i < amongus.length; i++) {
               amongus[i].channel.edit({
                    userLimit: amongus[i].userlimit,
                });

                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].edit({ mute: false });
                }
            }
            amongus = [];
            codes = [];
            for (let i = 0; i < locks.length; i++) {
                locks[i].channel.edit({
                    userLimit: locks[i].userLimit, 
                });
            }
            locks = [];
            slot = !slot;
            return;
        } else if (reaction._emoji.name === "🔐") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            for (let i = 0; i < locks.length; i++) {
                locks[i].channel.edit({
                    userLimit: locks[i].userLimit, 
                });
            }
            locks = [];
            return;
        } else {
            reaction.remove();
            return;
        }
    } else if (reaction.message.id === taalMessage.id) {
        if (taalGebruiker.id != user.id) {
            reaction.remove();
            taalMessage.react(reaction._emoji.name);
            return;
        }

        if (reaction._emoji.name === "🇳🇱") {
            taalMessage = "";
            taalGebruiker = "";
            client.query(`UPDATE servers SET lang='nl' WHERE guildId='${reaction.message.guild.id}';`, (err, res) => {
                if (!err) {
                    if (res) {
                        console.log(`Taal van ${reaction.message.guild.id} is veranderd naar het Nederlands!`);
                    }
                } else {
                    console.log(err);
                }
            });
            reaction.message.edit(createEmbed(`Taalinstellingen`, `De taal van **${reaction.message.guild.name}** is veranderd naar het **Nederlands**!`));
            return;
        }

        if (reaction._emoji.name === "🇬🇧") {
            taalMessage = "";
            taalGebruiker = "";
            client.query(`UPDATE servers SET lang='en' WHERE guildId='${reaction.message.guild.id}';`, (err, res) => {
                if (!err) {
                    if (res) {
                        console.log(`Taal van ${reaction.message.guild.id} is veranderd naar het Engels!`);
                    }
                } else {
                    console.log(err);
                }
            });
            reaction.message.edit(createEmbed(`Language Settings`, `The language for **${reaction.message.guild.name}** has changed to **English**!`));
            return;
        }

        reaction.remove();

    } else {
        for (let i = 0; i < amongus.length; i++) {
            if (amongus[i].user != user) {
                reaction.remove();
                amongus[i].bericht.react(reaction._emoji.name);
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
                    amongus[i].meetingbezig = true;
                    let channel = amongus[i].channel;
                    for (let member of channel.members) {
    //                     member[1].voice.setSelfMute(false);
                        member[1].edit({ mute: false });
                    }
                } else if (reaction._emoji.name === "❌") {
                    //mute iedereen
                    reaction.remove();
                    amongus[i].bericht.react(reaction._emoji.name);
                    amongus[i].meetingbezig = false;
                    let channel = amongus[i].channel;
                    for (let member of channel.members) {
    //                     member[1].voice.setSelfMute(true);
                        member[1].edit({ mute: true });
                    }
                }
            }
        }
    }
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    
    if (newUserChannel === oldUserChannel) { 
        return;
    }
    
    for (let i = 0; i < amongus.length; i++) {
        if (newUserChannel === amongus[i].channel.id) {
            //join
            if (amongus[i].meetingbezig) {
                newMember.setMute(false);
            } else {
                newMember.setMute(true);
            }
        } else if (oldUserChannel !== amongus[i].channel.id) {
            //leave
            if (oldMember.serverMute) {
                oldMember.setMute(false);
            }
        }
    }
});

bot.login(token);
