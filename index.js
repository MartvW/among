const Discord = require('discord.js');
const bot = new Discord.Client();
const { Client } = require('pg');

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
var botSuggestie = "784497628926312499";
var discordserver = "https://discord.gg/sjw7ZAb";
var amongus = [];
var codes = [];
var locks = [];
var taalVar = [];
var colorVar = [];
var aantalgames = 0;
var aantallocks = 0;
var aantalcodes = 0;
var statusIndex = 0;
var aantalcommands = 0;
var slot = false;
var slotnaam = "";
var adminMessage = "";
var laatstecommand = "-";
var resetMessage = "";

function helpEmbed(prefixs, lang, kleurVar) {
    if (lang === "nl") {
        var embedHelp = new Discord.MessageEmbed()
            .setAuthor(`SusBot`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
            .setTitle("Help")
            .setDescription(`Hier is een lijstje met de commands die je kan gebruiken.`)
            .addFields(
                { name: `${prefixs}setprefix`, value: 'Hiermee kan je je eigen prefix instellen.', inline: true },
                { name: `${prefixs}setlang`, value: 'Hiermee kan je je eigen taal instellen.', inline: true },
                { name: `NIEUW!!! ${prefixs}setcolor`, value: 'Hiermee kan je je eigen kleur instellen.', inline: true },

                { name: `resetprefix`, value: 'Om de prefix van de server te resetten.', inline: true },
                { name: `${prefixs}info`, value: 'Hiermee kan je informatie zien over de server.', inline: true },
                { name: `${prefixs}help`, value: 'Om dit bericht te laten zien.', inline: true },
                
                { name: `NIEUW!!! ${prefixs}link`, value: 'Je kan de invite-link krijgen via deze command.', inline: true },
                { name: `${prefixs}amongus`, value: 'Wanneer je een game wilt starten.', inline: true },
                { name: `${prefixs}amongusstop`, value: 'Wanneer je de game wilt eindigen.', inline: true },
                
                { name: `${prefixs}ping`, value: 'Hiermee kan je je ping zien.', inline: true },
                { name: `${prefixs}uptime`, value: 'Hoelang de bot online is.', inline: true },
                { name: `${prefixs}map`, value: 'Om het lijstje van alle mappen te zien.', inline: true },
                
                { name: `${prefixs}polus`, value: 'Om de kaart te zien van Polus.', inline: true },
                { name: `${prefixs}airship`, value: 'Om de kaart te zien van The Airship.', inline: true },
                { name: `${prefixs}skeld`, value: 'Om de kaart te zien van The Skeld.', inline: true },
                
                { name: `${prefixs}mira`, value: 'Om de kaart te zien van MIRA HQ.', inline: true },
                { name: `${prefixs}setcode`, value: 'Om de code in te stellen.', inline: true },
                { name: `${prefixs}resetcode`, value: 'Om de code te resetten.', inline: true },
                
                { name: `${prefixs}code`, value: 'Om de code te zien van het kanaal.', inline: true },
                { name: `${prefixs}lock`, value: 'Het kanaal te locken waar je inzit.', inline: true },
                { name: `${prefixs}unlock`, value: 'Het kanaal te unlocken waar je inzit.', inline: true },

                { name: `${prefixs}suggestion`, value: `Om een suggestie naar de owner te sturen voor de bot.`, inline: true },
                )
            .setColor(kleurVar)
            .setTimestamp()
            .setFooter(`SusBot#9893`)
        return embedHelp;
    } else if (lang === "en") {
        var embedHelp = new Discord.MessageEmbed()
            .setAuthor(`SusBot`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
            .setTitle("Help")
            .setDescription(`A list of all the commands I know.`)
            .addFields(
                { name: `${prefixs}setprefix`, value: 'To set your own prefix.', inline: true },
                { name: `${prefixs}setlang`, value: 'To set your own language.', inline: true },
                { name: `NEW!!! ${prefixs}setcolor`, value: 'To set your own color.', inline: true },

                { name: `resetprefix`, value: 'To reset your own prefix.', inline: true },
                { name: `${prefixs}info`, value: 'You can get information about the server.', inline: true },
                { name: `${prefixs}help`, value: 'To show this message.', inline: true },

                { name: `NEW!!! ${prefixs}link`, value: 'You can get usefull links with this command.', inline: true },
                { name: `${prefixs}amongus`, value: 'When you want to start a game.', inline: true },
                { name: `${prefixs}amongusstop`, value: 'To finish the game.', inline: true },

                { name: `${prefixs}ping`, value: 'Get your ping.', inline: true },
                { name: `${prefixs}uptime`, value: 'See the uptime from the bot.', inline: true },
                { name: `${prefixs}map`, value: 'A list of all the maps.', inline: true },

                { name: `${prefixs}polus`, value: 'To show the map of Polus.', inline: true },
                { name: `${prefixs}airship`, value: 'To show the map of The Airship.', inline: true },
                { name: `${prefixs}skeld`, value: 'To show the map of The Skeld.', inline: true },

                { name: `${prefixs}mira`, value: 'To show the map of MIRA HQ.', inline: true },
                { name: `${prefixs}setcode`, value: 'To set the game code.', inline: true },
                { name: `${prefixs}resetcode`, value: 'To reset the game code.', inline: true },
                
                { name: `${prefixs}code`, value: 'Show the code of the channel.', inline: true },
                { name: `${prefixs}lock`, value: 'To lock the channel.', inline: true },
                { name: `${prefixs}unlock`, value: 'To unlock the channel.', inline: true },
                
                { name: `${prefixs}suggestion`, value: `To send a suggestion to the owner of the bot about the bot.`, inline: true },
            )
            .setColor(kleurVar)
            .setTimestamp()
            .setFooter(`SusBot#9893`)
        return embedHelp;
    }
}

function embedLetOp(prefixs, lang) {
    if (lang === "nl") {
        var embedHelp = new Discord.MessageEmbed()
            .setAuthor(`SusBot`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
            .setTitle("Help")
            .setDescription(`Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefixs}amongus**\n- **${prefixs}lock**\n- **${prefixs}unlock**`)
            .setColor(15746887)
            .setTimestamp()
            .setFooter(`SusBot#9893`)
        return embedHelp;
    } else if (lang === "en") {
        var embedHelp = new Discord.MessageEmbed()
            .setAuthor(`SusBot`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
            .setTitle("Help")
            .setDescription(`To run some commands you have to be in a voice-channel. These following commands you must have to be in a voice-channel to run it:\n\n- **${prefixs}amongus**\n- **${prefixs}lock**\n- **${prefixs}unlock**`)
            .setColor(15746887)
            .setTimestamp()
            .setFooter(`SusBot#9893`)
        return embedHelp;
    }
}

function createEmbed(title, description, kleurVar) {
    var embed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setColor(kleurVar)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    return embed;
}

async function resetBot() {
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
    const servers = bot.guilds.cache.size;
    const users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

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
        slot = true;
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

    const aantal = await client.query(`SELECT * FROM prefixes`);
    let prefixesArray = [];
    for (let i = 0; i < aantal.rowCount; i++) {
        if (!prefixesArray.includes(`${aantal.rows[i].prefix}`)) {
            prefixesArray.push(`${aantal.rows[i].prefix}`);
        }
    }

    const aantal2 = await client.query(`SELECT * FROM servers`);
    let colorArray = [];
    for (let i = 0; i < aantal2.rowCount; i++) {
        if (aantal2.rows[i].kleur === '#F13030') {
            if (!colorArray.includes(`🔴`)) {
                colorArray.push(`🔴`);
            }
        } else if (aantal2.rows[i].kleur === '#FFAC33') {
            if (!colorArray.includes(`🟠`)) {
                colorArray.push(`🟠`);
            }
        } else if (aantal2.rows[i].kleur === '#F4E30D') {
            if (!colorArray.includes(`🟡`)) {
                colorArray.push(`🟡`);
            }
        } else if (aantal2.rows[i].kleur === '#A3F40D') {
            if (!colorArray.includes(`🟢`)) {
                colorArray.push(`🟢`);
            }
        } else if (aantal2.rows[i].kleur === '#0DA0F4') {
            if (!colorArray.includes(`🔵`)) {
                colorArray.push(`🔵`);
            }
        } else if (aantal2.rows[i].kleur === '#C60DF4') {
            if (!colorArray.includes(`🟣`)) {
                colorArray.push(`🟣`);
            }
        }

    }

    let prefixes = prefixesArray.join(" | ");
    let kleuren = colorArray.join(" | ");

    var adminEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Botinformatie")
        .setThumbnail(`${bot.user.avatarURL()}`)
        .setDescription(`Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nSlot: **${slotnaam}**\nBotbiografie: **${botbio}**\nBotprefixes: ${prefixes}\nBotkleuren: ${kleuren}\nLaatste command: **${laatstecommand}**\nAantal commands: **${aantalcommands}**\nAantal codes: **${codes.length}**\nAantal locks: **${locks.length}**\nAantal games: **${amongus.length}**\nAantal servers: **${servers} servers**\nAantal gebruikers: **${users} gebruikers**\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nTotaal aantal locks: **${aantallocks}**\nUptime: **${uptimestring}**\nUptime in seconden: **${botSeconds} sec.**`)
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
    const servers = bot.guilds.cache.size;
    if (!guild.me.hasPermission("ADMINISTRATOR")) {
        if (guild.systemChannel) {
            guild.systemChannel.send(createEmbed(`${bot.user.username}`, `The bot doesn't have the appropriate permissions.\nTo resolve this problem, go to **Server Settings** and then navigate to the **Roles** option. Next, click on **Bots**, and then click on the slider next to **Administrator** to activate it.`, '#FFAC33'));
        }
    }
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | On ${servers} servers!`,
        }
    });
    var prefixesDB = await client.query(`SELECT * FROM prefixes WHERE guildId='${guild.id}'`);
    var serversDB = await client.query(`SELECT * FROM servers WHERE guildId='${guild.id}'`);
    if (prefixesDB.rowCount === 0) {
        client.query(`INSERT INTO prefixes VALUES (${guild.id}, '${prefix}');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${guild.name} is succesvol in de database "Prefix" gezet!`);
                }
            } else {
                console.log(err);
            }
        });
    }
    if (serversDB.rowCount === 0) {
        client.query(`INSERT INTO servers VALUES (${guild.id}, 'en', '#FFAC33');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${guild.name} is succesvol in de database "Servers" gezet!`);
                }
            } else {
                console.log(err);
            }
        });
    }

    if (guild.systemChannel) {
        guild.systemChannel.send(createEmbed(`${bot.user.username}`, `Thanks for adding me to this server!\nYou can find all my commands by typing **${prefix}help**\nYou can set your own prefix by typing **${prefix}setprefix**\nSet your own color by typing **${prefix}setcolor**\n\nFor people who wants to invite me, type **${prefix}link** to get the invite-link!\n`, '#FFAC33'));
        guild.systemChannel.send(createEmbed(`Language`, `If you want to set the bot in another language, do ***${prefix}setlang***!`, '#FFAC33'));
    }
});

bot.on("guildDelete", async guild => {
    const servers = bot.guilds.cache.size;
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | On ${servers} servers!`,
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
});

bot.on("ready", async () => {
    var servers = bot.guilds.cache.size;
    var users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    let aantals = await client.query(`SELECT * FROM prefixes;`);
    let aantals2 = await client.query(`SELECT * FROM servers;`);


    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers en op ${users} gebruikers. In database "Prefix" zitten ${aantals.rows.length} servers! In database "Servers" zitten ${aantals2.rows.length} servers!`);
    console.log("");

    const channel = bot.channels.cache.find(channel => channel.id === botInfokanaal);
    channel.bulkDelete(1);

    updateAdmin(`Starting up...`);

    const channel2 = bot.channels.cache.find(channel => channel.id === resetID);
    channel2.bulkDelete(1);

    resetBot();

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `Starting up...`,
        }
    });

    setInterval(() => {
        servers = bot.guilds.cache.size;
        users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        var status = [
            `On ${servers} servers!`,
            `${prefix}setprefix | <prefix>`,
            `${prefix}setlang | Custom Language!`,
            `${prefix}setcolor | Your own color!`,
            `${users} are using this bot!`,
            `${prefix}help | ${bot.user.tag}`,
            `Made by Mart W.#0160`,
            `${prefix}amongus | Start command!`,
            `${prefix}link | Invite link!`,
            `${prefix}map | Map commands!`,
        ];

        statusIndex += 1;

        if (statusIndex > status.length - 1) {
            statusIndex = 0;
        }

        bot.user.setPresence({
            status: 'online',
            activity: {
                name: `${status[statusIndex]}`,
            }
        });

        updateAdmin(status[statusIndex]);
    }, 10000);
});

bot.on("message", async msg => {
    if (msg.author.bot) return;
    if (msg.guild === null) {
        msg.reply(createEmbed(`${msg.author.username}`, `You can't send me private messages...`, 16426522));
        return;
    }
    let prefix = await client.query(`SELECT prefix FROM prefixes WHERE guildId='${msg.guild.id}';`);
    let taal = await client.query(`SELECT lang FROM servers WHERE guildId='${msg.guild.id}';`);
    let kleur = await client.query(`SELECT kleur FROM servers WHERE guildId='${msg.guild.id}';`);
    let kleuremoji = "";
    if (taal.rowCount === 0 || kleur.rowCount === 0) {
        client.query(`INSERT INTO servers VALUES (${msg.guild.id}, 'en', '#FFAC33');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${msg.guild.name} (${msg.guild.id}) is succesvol in de database "Servers" gezet!`);
                }
            } else {
                console.log(err);
            }
        });
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
    kleur = kleur.rows[0].kleur;

    if (kleur === '#F13030') {
        kleuremoji = "🔴";
    } else if (kleur === '#FFAC33') {
        kleuremoji = "🟠";
    } else if (kleur === '#F4E30D') {
        kleuremoji = "🟡";
    } else if (kleur === '#A3F40D') {
        kleuremoji = "🟢";
    } else if (kleur === '#0DA0F4') {
        kleuremoji = "🔵";
    } else if (kleur === '#C60DF4') {
        kleuremoji = "🟣";
    }

    if (msg.content === "resetprefix") {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            if (taal === "nl") {
                msg.channel.send(createEmbed(`${msg.author.username}`, "Je hebt geen bevoegdheden om de prefix van deze server aan te passen!", kleur));
            } else {
                msg.channel.send(createEmbed(`${msg.author.username}`, `You don't have the permissions to change the prefix of the server!`, kleur));
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
            msg.channel.send(createEmbed(`Prefix`, `De prefix van **${msg.guild.name}** is gereset naar **.**`, kleur));
        } else {
            msg.channel.send(createEmbed(`Prefix`, `The prefix for **${msg.guild.name}** has changed to **.**`, kleur));
        }
    }

    for (let i = 0; i < amongus.length; i++) {
        if (amongus[i].channel.members.size === 0) {
            amongus[i].channel.edit({
                userLimit: amongus[i].userlimit,
            });
            amongus.splice(amongus.indexOf({
                "channel": amongus[i].channel,
            }), 1);
        }
    }

    for (let i = 0; i < locks.length; i++) {
        if (locks[i].channel.members.size === 0) {
            locks[i].channel.edit({
                userLimit: locks[i].userLimit,
            });
            locks.splice(locks.indexOf({
                "channel": locks[i].channel,
            }), 1);
        }
    }

    for (let i = 0; i < codes.length; i++) {
        if (codes[i].channel.members.size === 0) {
            codes.splice(codes.indexOf({
                "channel": codes[i].channel,
            }), 1);
        }
    }

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    laatstecommand = `${msg.content} (@${msg.author.tag})`;

    if (slot === false) {
        aantalcommands++;
        try {
            if (command === "help") {
                msg.channel.send(helpEmbed(prefix, taal, kleur));
                msg.channel.send(embedLetOp(prefix, taal));
            }

            if (command === "suggestion") {
                if (args.length < 1) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel de suggestie invoeren!`, kleur));
                        return;
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to suggest something!`, kleur));
                        return;
                    }
                }

                const channel = bot.channels.cache.find(channel => channel.id === botSuggestie);
                channel.send(createEmbed(`Suggestie van **${msg.author.username}**`, `${args.join(' ')}`, kleur));
                if (taal === "nl") {
                    msg.channel.send(createEmbed(`Suggestie`, `De suggestie is gestuurd naar de eigenaar!`, kleur));
                } else {
                    msg.channel.send(createEmbed(`Suggestion`, `Suggestion is sended to the owner!`, kleur));
                }
            }

            if (command === "info") {
                if (taal === "nl") {
                    if (msg.guild.iconURL()) {
                        var embed = new Discord.MessageEmbed()
                            .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                            .setTitle(`${msg.guild.name}`)
                            .setDescription(`Informatie over de server **${msg.guild.name}**`)
                            .setThumbnail(`${msg.guild.iconURL()}`)
                            .addFields(
                                { name: `Prefix:`, value: `${prefix}`, inline: true },
                                { name: `Taal:`, value: `Nederlands`, inline: true },
                                { name: `Kleur:`, value: `${kleuremoji}`, inline: true },
                            )
                            .setColor(kleur)
                            .setTimestamp()
                            .setFooter(`${bot.user.tag}`)
                    } else {
                        var embed = new Discord.MessageEmbed()
                            .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                            .setTitle(`${msg.guild.name}`)
                            .setDescription(`Informatie over de server **${msg.guild.name}**`)
                            .setThumbnail(`https://raw.githubusercontent.com/MartvW/among/master/discord-icon-7.png`)
                            .addFields(
                                { name: `Prefix:`, value: `${prefix}`, inline: true },
                                { name: `Taal:`, value: `Nederlands`, inline: true },
                                { name: `Kleur:`, value: `${kleuremoji}`, inline: true },
                            )
                            .setColor(kleur)
                            .setTimestamp()
                            .setFooter(`${bot.user.tag}`)
                    }
                    msg.channel.send(embed);
                } else {
                    if (msg.guild.iconURL()) {
                        var embed = new Discord.MessageEmbed()
                            .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                            .setTitle(`${msg.guild.name}`)
                            .setDescription(`Information about the server **${msg.guild.name}**`)
                            .setThumbnail(`${msg.guild.iconURL()}`)
                            .addFields(
                                { name: `Prefix:`, value: `${prefix}`, inline: true },
                                { name: `Language:`, value: `English`, inline: true },
                                { name: `Color:`, value: `${kleuremoji}`, inline: true },
                            )
                            .setColor(kleur)
                            .setTimestamp()
                            .setFooter(`${bot.user.tag}`)
                    } else {
                        var embed = new Discord.MessageEmbed()
                            .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                            .setTitle(`${msg.guild.name}`)
                            .setDescription(`Information about the server **${msg.guild.name}**`)
                            .setThumbnail(`https://raw.githubusercontent.com/MartvW/among/master/discord-icon-7.png`)
                            .addFields(
                                { name: `Prefix:`, value: `${prefix}`, inline: true },
                                { name: `Language:`, value: `English`, inline: true },
                                { name: `Color:`, value: `${kleuremoji}`, inline: true },
                            )
                            .setColor(kleur)
                            .setTimestamp()
                            .setFooter(`${bot.user.tag}`)
                    }
                    msg.channel.send(embed);
                }
            }

            if (command === "setcolor") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, "Je hebt geen bevoegdheden om de kleur van deze server aan te passen!", kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You don't have the permissions to change the color of the server!`, kleur));
                    }
                    return;
                }

                if (taal === "nl") {
                    if (colorVar.length > 0) {
                        for (let i = 0; i < colorVar.length; i++) {
                            if (colorVar[i].gebruiker === msg.member) {
                                colorVar.splice(colorVar.indexOf({
                                    "gebruiker": msg.member,
                                }), 1);
                            }
                        }
                    }
                    msg.channel.send(createEmbed(`Kleurinstellingen`, `Bekijk je privéberichten!`, kleur));
                    msg.member.send(createEmbed(`Kleurinstellingen voor ${msg.guild.name}`, `Reageer met een kleur om de kleur van de server aan te passen.`, kleur)).then(embedMessage => {
                        colorVar.push({
                            "bericht": embedMessage,
                            "gebruiker": msg.member,
                            "server": msg.guild,
                            "taal": taal,
                            "kleur": kleur,
                        });
                        embedMessage.react('🔴');
                        embedMessage.react('🟠');
                        embedMessage.react('🟡');
                        embedMessage.react('🟢');
                        embedMessage.react('🔵');
                        embedMessage.react('🟣');
                    });
                } else {
                    if (colorVar.length > 0) {
                        for (let i = 0; i < colorVar.length; i++) {
                            if (colorVar[i].gebruiker === msg.member) {
                                colorVar.splice(colorVar.indexOf({
                                    "gebruiker": msg.member,
                                }), 1);
                            }
                        }
                    }
                    msg.channel.send(createEmbed(`Color Settings`, `Check your private messages!`, kleur));
                    msg.member.send(createEmbed(`Color settings for ${msg.guild.name}`, `React with the color to change the color for the server.`, kleur)).then(embedMessage => {
                        colorVar.push({
                            "bericht": embedMessage,
                            "gebruiker": msg.member,
                            "server": msg.guild,
                            "taal": taal,
                            "kleur": kleur,
                        });
                        embedMessage.react('🔴');
                        embedMessage.react('🟠');
                        embedMessage.react('🟡');
                        embedMessage.react('🟢');
                        embedMessage.react('🔵');
                        embedMessage.react('🟣');
                    });
                }
            }

            if (command === "setlang") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, "Je hebt geen bevoegdheden om de taal van deze server aan te passen!", kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You don't have the permissions to change the language of the server!`, kleur));
                    }
                    return;
                }

                if (taal === "nl") {
                    if (taalVar.length > 0) {
                        for (let i = 0; i < taalVar.length; i++) {
                            if (taalVar[i].gebruiker === msg.member) {
                                taalVar.splice(taalVar.indexOf({
                                    "gebruiker": msg.member,
                                }), 1);
                            }
                        }
                    }
                    msg.channel.send(createEmbed(`Taalinstellingen`, `Bekijk je privéberichten!`, kleur));
                    msg.member.send(createEmbed(`Taalinstellingen voor ${msg.guild.name}`, `Reageer met 🇳🇱 om de taal in het Nederlands te zetten.\nReageer met 🇬🇧 om de taal in het Engels te zetten.`, kleur)).then(embedMessage => {
                        taalVar.push({
                            "bericht": embedMessage,
                            "gebruiker": msg.member,
                            "server": msg.guild,
                            "taal": taal,
                            "kleur": kleur,
                        });
                        embedMessage.react('🇳🇱');
                        embedMessage.react('🇬🇧');
                    });
                } else {
                    if (taalVar.length > 0) {
                        for (let i = 0; i < taalVar.length; i++) {
                            if (taalVar[i].gebruiker === msg.member) {
                                taalVar.splice(taalVar.indexOf({
                                    "gebruiker": msg.member,
                                }), 1);
                            }
                        }
                    }
                    msg.channel.send(createEmbed(`Language Settings`, `Check your private messages!`, kleur));
                    msg.member.send(createEmbed(`Language Settings for ${msg.guild.name}`, `React with 🇳🇱 to change the language to Dutch.\nReact with 🇬🇧 to change the language to English.`, kleur)).then(embedMessage => {
                        taalVar.push({
                            "bericht": embedMessage,
                            "gebruiker": msg.member,
                            "server": msg.guild,
                            "taal": taal,
                            "kleur": kleur,
                        });
                        embedMessage.react('🇳🇱');
                        embedMessage.react('🇬🇧');
                    });
                }
            }

            if (command === "sendall" && msg.author.id === owner) {
                bot.guilds.cache.forEach(async g => {
                    if (g.systemChannel) {
                        g.systemChannel.send(createEmbed('Update', `There is a new update! Do **${prefix}help** or go to: http://susbot.epizy.com/command.html to see the new commands!`, '#FFAC33'));
                    }
                });
            }

            if (command === "dbdelete" && msg.author.id === owner) {
                if (!args[0]) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Voer de guildId in!`, kleur));
                    return;
                }

                const guild = bot.guilds.cache.find(guild => guild.id === args[0]);

                if (guild) {
                    if (client.query(`SELECT * FROM servers WHERE guildId='${args[0]}';`)) {
                        client.query(`DELETE FROM servers WHERE guildId='${args[0]}';`, (err, res) => {
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

                    if (client.query(`SELECT * FROM prefixes WHERE guildId='${args[0]}';`)) {
                        client.query(`DELETE FROM prefixes WHERE guildId='${args[0]}';`, (err, res) => {
                            if (!err) {
                                if (res) {
                                    console.log(`${guild.name} is succesvol verwijderd uit de database "Prefixes"!`);
                                }
                            } else {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log(`${guild.name} is niet verwijderd uit de database "Prefixes" aangezien hij niet in de database stond!`);
                    }

                    msg.member.send(createEmbed('Database', `**${guild.name}** succesvol verwijderd uit beide databases.`, kleur));
                } else {
                    msg.member.send(createEmbed('Database', `Server niet gevonden, probeer opnieuw.`, kleur));
                }
                msg.delete();
            }

            if (command === "dbdeleteall" && msg.author.id === owner) {
                client.query(`TRUNCATE TABLE servers;`, (err, res) => {
                    if (!err) {
                        if (res) {
                            console.log(`"Server" is succesvol geleegd!`);
                        }
                    } else {
                        console.log(err);
                    }
                });

                client.query(`TRUNCATE TABLE prefixes;`, (err, res) => {
                    if (!err) {
                        if (res) {
                            console.log(`"Prefixes" is succesvol geleegd!`);
                        }
                    } else {
                        console.log(err);
                    }
                });
                msg.delete();
                msg.member.send(createEmbed('Database', `**"Server"** en **"Prefixes"** zijn succesvol geleegd.`, kleur));
            }

            if (command === "db" && msg.author.id === owner) {
                let aantals = await client.query(`SELECT * FROM prefixes;`);
                let aantals2 = await client.query(`SELECT * FROM servers;`);

                let aantalpunt = 0;
                let anders = 0;
                let taalnl = 0;
                let taalen = 0;

                bericht = [];
                var embed1 = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`Database`)
                    .setColor(kleur)
                    .setTimestamp()
                    .setFooter(`${bot.user.tag}`)
                var embed2 = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`Database`)
                    .setColor(kleur)
                    .setTimestamp()
                    .setFooter(`${bot.user.tag}`)

                for (let i = 0; i < aantals.rows.length; i++) {
                    const guildname = bot.guilds.cache.find(guild => guild.id === aantals.rows[i].guildid);
                    if (aantals.rows[i].prefix === ".") {
                        aantalpunt += 1;
                        prefixtekst = "**.**";
                    } else {
                        anders += 1;
                        prefixtekst = `**${aantals.rows[i].prefix}**`;
                    }
                    for (let j = 0; j < aantals2.rows.length; j++) {
                        if (aantals.rows[i].guildid === aantals2.rows[j].guildid) {
                            if (aantals2.rows[j].lang === "nl") {
                                taaltekst = "🇳🇱";
                                taalnl += 1;
                            } else {
                                taaltekst = "🇬🇧";
                                taalen += 1;
                            }
                            bericht.push({ "id": bericht.length, "guildid": aantals2.rows[j].guildid, "naam": guildname, "prefix": prefixtekst, "taal": taaltekst });
                        }
                    }
                }
                msg.delete();
                if (bericht.length % 2 === 0) {
                    for (let i = 0; i < bericht.length / 2; i++) {
                        embed1.addField(`**${i + 1}**. ${bericht[i].naam}`, `GuildId: **${bericht[i].guildid}**\nPrefix: ${bericht[i].prefix}\nTaal: ${bericht[i].taal}`, true);
                    }
                    for (let i = bericht.length / 2; i < bericht.length; i++) {
                        embed2.addField(`**${i + 1}**. ${bericht[i].naam}`, `GuildId: **${bericht[i].guildid}**\nPrefix: ${bericht[i].prefix}\nTaal: ${bericht[i].taal}`, true);
                    }
                    msg.member.send(createEmbed(`Database`, `Aantal servers in de Database: **${aantals.rows.length}**\nEr zijn **${aantalpunt}** servers met de **.** prefix, en **${anders}** servers met zijn eigen prefix!\nEr zijn **${taalnl}** servers die in het Nederlands staan, er zijn **${taalen}** servers die in het Engels staan!`, kleur));
                    msg.member.send(embed1);
                    msg.member.send(embed2);
                } else {
                    msg.member.send(createEmbed(`Database`, `De values van de databases is op dit moment niet beschikbaar, excuus.`, kleur))
                }
            }

            if (command === "setprefix") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, "Je hebt geen bevoegdheden om de prefix van deze server aan te passen!", kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, "You don't have the permissions to change the prefix of this server!", kleur));
                    }
                    return;
                }

                if (!args[0]) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Doe ${prefix}setprefix _<prefix>_`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Do ${prefix}setprefix _<prefix>_`, kleur));
                    }
                    return;
                }

                if (args[0].length >= 10) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Prefix mag maximaal 10 characters bevatten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Prefix has a maximum of 10 characters!`, kleur));
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

                if (taal === "nl") {
                    msg.channel.send(createEmbed(`Prefix`, `De prefix van **${msg.guild.name}** is gezet naar ***${args[0]}***!`, kleur));
                } else {
                    msg.channel.send(createEmbed(`Prefix`, `The prefix for **${msg.guild.name}** is changed to ***${args[0]}***!`, kleur));
                }
            }

            if (command === "update" && msg.author.id === owner) {
                if (args.length < 1) {
                    msg.channel.send(createEmbed('Mart W.', `Je moet wel argumenten toevoegen voor de update.`, kleur));
                    return;
                }
                msg.channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`, kleur));
                const channel = bot.channels.cache.find(channel => channel.id === updateID);
                channel.send(`@here`).then(m => {
                    m.delete();
                    channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`, kleur))
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

                msg.reply(createEmbed("Reset", `Resetcommand uitgevoerd! Bezig met resetten...`, kleur));
                amongus = [];
            }

            if (command === "lock") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
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
                    aantallocks++;
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is locked!\nDo **${prefix}unlock** to unlock this channel!`, kleur));
                    }
                } else {
                    for (let i = 0; i < locks.length; i++) {
                        if (locks[i].channel === msg.member.voice.channel) {
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `Dit kanaal is al gelocked!`, kleur));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `This channel is already locked!`, kleur));
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
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`, kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is locked!\nDo **${prefix}unlock** to unlock this channel!`, kleur));
                        }
                    }
                }
            }

            if (command === "unlock") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
                    }
                    return;
                }

                if (locks.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is on this moment not locked.\nDo **${prefix}lock** to lock this channel!`, kleur));
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
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is geunlocked!\nDoe **${prefix}lock** om de kanaal weer te locken!`, kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is unlocked!\nDo **${prefix}lock** to lock this channel!`, kleur));
                        }
                    } else {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`, kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** is on this moment not locked.\nDo **${prefix}lock** to lock this channel!`, kleur));
                        }
                    }
                }
            }

            if (command === "code") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
                    }
                    return;
                }

                if (codes.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** doesn't have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`, kleur));
                    }
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    if (codes[i].channel.id != msg.member.voice.channel.id) {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`, kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** doesn't have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`, kleur));
                        }
                        return;
                    }
                    msg.channel.send(createEmbed(`${msg.author.username}`, `**${codes[i].code} - ${codes[i].server}**`, kleur));
                    return;
                }
            }

            if (command === "setcode") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
                    }
                    return;
                }

                if (args.length !== 2) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel een code en de server toevoegen! ***${prefix}setcode <code> <server>***`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to add the code and the server! ***${prefix}setcode <code> <server>***`, kleur));
                    }
                    return;
                }

                const code = args[0].toUpperCase();
                const server = args[1].toUpperCase();

                if (code.length != 6) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige code in!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Please fill in a real code!`, kleur));
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

                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**!`, kleur));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `The code for ${msg.member.voice.channel.name} is changed to **${code}** and the server is **${server}**!`, kleur));
                            }
                            aantalcodes += 1;
                        } catch (err) {
                            console.error(err);
                            errorMessage(err);
                            if (taal === "nl") {
                                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`, kleur));
                            } else {
                                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`, kleur));
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
                                    aantalcodes += 1;
                                } else {
                                    codes[i].code = code;
                                    codes[i].server = server;
                                    aantalcodes += 1;
                                }
                            }

                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**!`, kleur));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `The code for ${msg.member.voice.channel.name} is changed to **${code}** and the server is **${server}**!`, kleur));
                            }
                        } catch (err) {
                            console.error(err);
                            errorMessage(err);
                            if (taal === "nl") {
                                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`, kleur));
                            } else {
                                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`, kleur));
                            }
                        }
                    }
                } else {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige server in! (**NA** of **EU** of **AS**)`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Please fill in a real server! (**NA** or **EU** or **AS**)`, kleur));
                    }
                    return;
                }
            }

            if (command === "resetcode") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
                    }
                    return;
                }
                if (codes.length === 0) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** doesn't have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`, kleur));
                    }
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    try {
                        if (codes[i].channel.id != msg.member.voice.channel.id) {
                            if (taal === "nl") {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`, kleur));
                            } else {
                                msg.channel.send(createEmbed(`${msg.author.username}`, `**${msg.member.voice.channel.name}** doesn't have a code. Do ***${prefix}setcode <code> <server>*** to set a code!`, kleur));
                            }
                            return;
                        }

                        codes.splice(codes.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);

                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `Code succesvol verwijderd van **${msg.member.voice.channel.name}**!`, kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `Code succesfully deleted from **${msg.member.voice.channel.name}**!`, kleur));
                        }
                        return;
                    } catch (err) {
                        console.error(err);
                        errorMessage(err);
                        if (taal === "nl") {
                            msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`, kleur));
                        } else {
                            msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`, kleur));
                        }
                    }
                }
            }

            if (command === "map") {
                if (taal === "nl") {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Alle mappen van **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus** (${prefix}polus)\n-**MIRA HQ** (${prefix}mira)\n-**The Airship** (${prefix}airship)\n\nDoe ***${prefix}<mapnaam>*** om de kaart te zien van die map!`, kleur));
                } else {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `All maps from **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus** (${prefix}polus)\n-**MIRA HQ** (${prefix}mira)\n-**The Airship** (${prefix}airship)\n\nDo ***${prefix}<mapname>*** to show the map!`, kleur));
                }
            }

            if (command === "skeld") {
                var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Map: **The Skeld**`)
                    .setColor(kleur)
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
                    .setColor(kleur)
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
                    .setColor(kleur)
                    .setTimestamp()
                    .setImage(`https://raw.githubusercontent.com/MartvW/among/master/Mirahq.png`)
                    .setFooter(`${bot.user.tag}`)
                msg.channel.send(embed);
            }
            
            if (command === "airship") {
                var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Map: **The Airship**`)
                    .setColor(kleur)
                    .setTimestamp()
                    .setImage(`https://raw.githubusercontent.com/MartvW/among/master/The_Airship_map.png`)
                    .setFooter(`${bot.user.tag}`)
                msg.channel.send(embed);
            }

            if (command === "uptime") {
                let totalSeconds = (bot.uptime / 1000);
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
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: **${uptimestring}**`, kleur));
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
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: **${uptimestring}**`, kleur));
                }
            }

            if (command === "ping") {
                const m = await msg.channel.send("Ping?");
                var ping = Date.now() - m.createdTimestamp;
                m.delete();
                msg.channel.send(createEmbed(`Pong!`, `Latency is: **${ping}ms**.`, kleur));
            }

            if (command === "link") {
                if (taal === "nl") {
                    var embedHelp = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle("Handige links")
                        .addFields(
                            { name: `Invite link bot`, value: 'https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8', inline: false },
                            { name: `Top.gg link`, value: `https://top.gg/bot/469857906385354764`, inline: false },
                            { name: `Discord link`, value: `${discordserver}`, inline: false },
                        )
                        .setColor(kleur)
                        .setTimestamp()
                        .setFooter(`${bot.user.tag}`)
                    msg.channel.send(embedHelp);
                } else {
                    var embedHelp = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle("Usefull links")
                        .addFields(
                            { name: `Invite link bot`, value: 'https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8', inline: false },
                            { name: `Top.gg link`, value: `https://top.gg/bot/469857906385354764`, inline: false },
                            { name: `Discord link`, value: `${discordserver}`, inline: false },
                        )
                        .setColor(kleur)
                        .setTimestamp()
                        .setFooter(`${bot.user.tag}`)
                    msg.channel.send(embedHelp);
                }
            }

            if (command === "amongus") {
                if (!msg.member.voice.channel) {
                    if (taal === "nl") {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`, kleur));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`, `You have to be in a voice-channel!`, kleur));
                    }
                    return;
                }

                for (let i = 0; i < amongus.length; i++) {
                    if (amongus[i].user === msg.author || amongus[i].channel === msg.member.voice.channel) {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, "Je bent al een game aan het hosten. Je kan niet meer dan één game hosten!", kleur));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, "You are already hosting a game. You can't host more than one game!", kleur));
                        }
                        return;
                    }
                }

                if (taal === "nl") {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`Reageer met een :white_check_mark: wanneer er een meeting is, reageer met een :x: als de meeting is afgelopen.\nDoe **${prefix}amongusstop** als je gaat stoppen.`)
                        .setColor(kleur)
                        .setTimestamp()
                        .setFooter(`De host is: ${msg.author.username}\nHet kanaal waarin op dit moment een game is gestart: ${msg.member.voice.channel.name}`)
                } else {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`React with :white_check_mark: when there is a meeting, react with :x: if the meeting is finished.\nDo **${prefix}amongusstop** if you are stopping.`)
                        .setColor(kleur)
                        .setTimestamp()
                        .setFooter(`The host is: ${msg.author.username}\nThe channel where the game is currently playing: ${msg.member.voice.channel.name}`)
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
                                .setColor(kleur)
                                .setTimestamp()
                                .setFooter(`De host was: ${amongus[i].user.username}\nHet kanaal was: ${amongus[i].name}`)
                        } else {
                            var embed = new Discord.MessageEmbed()
                                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                                .setTitle(`${msg.author.username}`)
                                .setDescription(`The game has finished, do **${prefix}amongus** to start a new game.`)
                                .setColor(kleur)
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
                    } else {
                        if (taal === "nl") {
                            msg.channel.send(createEmbed(`${msg.author.username}`, 'Je bent op dit moment geen game aan het hosten, doe **${prefix}amongus** om een game te hosten!'));
                        } else {
                            msg.channel.send(createEmbed(`${msg.author.username}`, 'You are not hosting a game at the moment, do **${prefix}amongus** to start hosting a game!'));
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
            errorMessage(err);
            if (taal === "nl") {
                msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`, kleur));
            } else {
                msg.reply(createEmbed("ERROR", `ERROR: The bot has an error, the error has sended to the owner.`, kleur));
            }
        }
    } else {
        if (taal === "nl") {
            msg.channel.send(createEmbed("Slot", `Op dit moment kan er geen commands worden uitgevoerd!`, kleur));
        } else {
            msg.channel.send(createEmbed("Slot", `The commands has temporaly locked!`, kleur));
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
                        member[1].edit({ mute: false });
                    }
                } else if (reaction._emoji.name === "❌") {
                    //mute iedereen
                    reaction.remove();
                    amongus[i].bericht.react(reaction._emoji.name);
                    amongus[i].meetingbezig = false;
                    let channel = amongus[i].channel;
                    for (let member of channel.members) {
                        member[1].edit({ mute: true });
                    }
                }
            }
        }
    }

    if (colorVar.length != 0) {
        for (let i = 0; i < colorVar.length; i++) {
            if (reaction.message.id === colorVar[i].bericht.id) {
                //FFAC33 = oranje
                if (reaction._emoji.name === "🔴") {
                    client.query(`UPDATE servers SET kleur='#F13030' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar rood.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🔴`, '#F13030'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🔴`, '#F13030'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🟠") {
                    client.query(`UPDATE servers SET kleur='#FFAC33' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar oranje.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🟠`, '#FFAC33'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🟠`, '#FFAC33'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🟡") {
                    client.query(`UPDATE servers SET kleur='#F4E30D' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar geel.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🟡`, '#F4E30D'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🟡`, '#F4E30D'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🟢") {
                    client.query(`UPDATE servers SET kleur='#A3F40D' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar groen.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🟢`, '#A3F40D'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🟢`, '#A3F40D'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🔵") {
                    client.query(`UPDATE servers SET kleur='#0DA0F4' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar blauw.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🔵`, '#0DA0F4'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🔵`, '#0DA0F4'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🟣") {
                    client.query(`UPDATE servers SET kleur='#C60DF4' WHERE guildId='${colorVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(`De kleur van ${colorVar[i].server.name} is aangepast naar paars.`);
                    if (colorVar[i].taal === "nl") {
                        colorVar[i].gebruiker.send(createEmbed(`Kleurinstellingen`, `De kleur van **${colorVar[i].server.name}** is veranderd naar 🟣`, '#C60DF4'));
                    } else {
                        colorVar[i].gebruiker.send(createEmbed(`Colorsettings`, `The color for **${colorVar[i].server.name}** has changed to 🟣`, '#C60DF4'));
                    }
                    colorVar.splice(colorVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (colorVar[i].taal === "nl") {
                    colorVar[i].gebruiker.send(createEmbed(`Emoji`, `Reageer alleen met de emoji's die er al staan en **niet** met ${reaction._emoji.name}!`, colorVar[i].kleur));
                } else {
                    colorVar[i].gebruiker.send(createEmbed(`Emoji`, `Please react only with the pre-selected reactions and **not** with ${reaction._emoji.name}!`, colorVar[i].kleur));
                }
            }
        }
    }

    if (taalVar.length != 0) {
        for (let i = 0; i < taalVar.length; i++) {
            if (reaction.message.id === taalVar[i].bericht.id) {
                if (taalVar[i].gebruiker.id != user.id) {
                    reaction.remove();
                    taalVar[i].bericht.react(reaction._emoji.name);
                    return;
                }

                if (reaction._emoji.name === "🇳🇱") {
                    client.query(`UPDATE servers SET lang='nl' WHERE guildId='${taalVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    taalVar[i].bericht.delete();
                    console.log(`De taal van ${taalVar[i].server.name} is aangepast naar Nederlands door ${taalVar[i].gebruiker.user.username}`);
                    taalVar[i].gebruiker.send(createEmbed(`Taalinstellingen`, `De taal van **${taalVar[i].server.name}** is veranderd naar het **Nederlands**!`, taalVar[i].kleur));
                    taalVar.splice(taalVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (reaction._emoji.name === "🇬🇧") {
                    client.query(`UPDATE servers SET lang='en' WHERE guildId='${taalVar[i].server.id}';`, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    taalVar[i].bericht.delete();
                    console.log(`De taal van ${taalVar[i].server.name} is aangepast naar Engels door ${taalVar[i].gebruiker.user.username}`);
                    taalVar[i].gebruiker.send(createEmbed(`Language Settings`, `The language for **${taalVar[i].server.name}** has changed to **English**!`, taalVar[i].kleur));
                    taalVar.splice(taalVar.indexOf({
                        "gebruiker": user,
                    }), 1);
                    return;
                }

                if (taalVar[i].taal === "nl") {
                    taalVar[i].gebruiker.send(createEmbed(`Emoji`, `Reageer alleen met 🇳🇱 of 🇬🇧 en **niet** met ${reaction._emoji.name}!`, taalVar[i].kleur));
                } else {
                    taalVar[i].gebruiker.send(createEmbed(`Emoji`, `Please react with 🇳🇱 or 🇬🇧 and **not** with ${reaction._emoji.name}!`, taalVar[i].kleur));
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
