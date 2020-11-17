const Discord = require('discord.js');
const fs = require('fs');
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
var adminMessage = "";
var laatstecommand = "-";
var laatstebericht = "-";
var resetMessage = "";

function helpEmbed() { 
    var embedHelp = new Discord.MessageEmbed()
    .setAuthor(`Among Us`, `https://raw.githubusercontent.com/MartvW/among/master/Logo.png`)
    .setTitle("Help")
    .setDescription(`Hier is een lijstje met de commands die je kan gebruiken.`)
    .addFields(
        { name: `${prefix}setprefix`, value: 'Hiermee kan je je eigen prefix instellen.', inline: false },
        { name: `${prefix}help`, value: 'Om dit bericht te laten zien.', inline: false },
        { name: `${prefix}link`, value: 'Je kan de invite-link krijgen via deze command.', inline: false },
        { name: `${prefix}amongus`, value: 'Wanneer je een game wilt starten.', inline: false },
        { name: `${prefix}amongusstop`, value: 'Wanneer je de game wilt eindigen.', inline: false },
        { name: `${prefix}ping`, value: 'Hiermee kan je je ping zien.', inline: false },
        { name: `${prefix}uptime`, value: 'Hoelang de bot online is.', inline: false },
        { name: `${prefix}map`, value: 'Om het lijstje van alle mappen te zien.', inline: false },
        { name: `${prefix}polus`, value: 'Om de kaart te zien van Polus.', inline: false },
        { name: `${prefix}skeld`, value: 'Om de kaart te zien van The Skeld.', inline: false },
        { name: `${prefix}mira`, value: 'Om de kaart te zien van MIRA HQ.', inline: false },
        { name: `${prefix}setcode`, value: 'Om de code in te stellen.', inline: false },
        { name: `${prefix}resetcode`, value: 'Om de code te resetten.', inline: false },
        { name: `${prefix}code`, value: 'Om de code te zien van het kanaal.', inline: false },
        { name: `${prefix}lock`, value: 'Het kanaal te locken waar je inzit.', inline: false },
        { name: `${prefix}unlock`, value: 'Het kanaal te unlocken waar je inzit.', inline: false },
    )
    .setColor(16426522)
    .setTimestamp()
    .setFooter(`Among Us`)
    return embedHelp;
}

const embedLetOp = {
    "embed": {
        "author": {
            "name": `Among Us`,
            "url": "https://discordapp.com",
            "icon_url": "https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png"
        },
        "title": "Help",
        "color": 15746887,
        "description": `Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefix}amongus**\n- **${prefix}lock**\n- **${prefix}unlock**`,
        "fields": [
            {
                "name": ".....................",
                "value": `Hiermee kan je de help-server joinen: ${discordserver}`
            }
        ]
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
        .setDescription(`Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nBotbiografie: **${botbio}**\nBotprefix: **${prefix}**\nLaatste command: **${laatstecommand}**\nAantal commands: **${aantalcommands}**\nAantal codes: **${codes.length}**\nAantal locks: **${locks.length}**\nAantal games: **${amongus.length}**\nAantal servers: **${servers}**\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nTotaal aantal locks: **${aantallocks}**\nUptime: **${uptimestring}**\nUptime in seconden: **${botSeconds} sec.**`)
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
                console.log(`${guild.name} is succesvol in de database gezet!`);
            }
        } else {
            console.log(err);
        }
    });
//     guild.owner.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan **${guild.name}**.\nJe kan al mijn commands zien als je **${prefix}help** typt!\nDe Discord Server waar je je vragen kan stellen: ${discordserver}\n\nHierop kan je ook het kanaal **#bot-status** of **#botinformatie** volgen voor de updates en de informatie over de Discord Bot!`));
    guild.systemChannel.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan deze server!\nAl mijn commands kan je zien via **${prefix}help**\nAls je vragen hebt kan je mijn help-server joinen: ${discordserver}\n\nVoor de mensen die mij willen inviten doe **${prefix}link** om de invite-link te krijgen!`));
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
                    console.log(`${guild.name} is succesvol verwijderd uit de database!`);
                }
            } else {
                console.log(err);
            }
        });
    } else {
        console.log(`${guild.name} is niet verwijderd uit de database aangezien hij niet in de database stond!`);
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
    
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers.`);
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
        
        var vandaag = new Date();
        var dag = vandaag.getDate();
        var maand = vandaag.getMonth();
        var uur = vandaag.getHours();
        var jaar = vandaag.getFullYear();
        var minuten = vandaag.getMinutes();

        var status = [
            `Op ${servers} servers!`,
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
    let prefix = await client.query(`SELECT prefix FROM prefixes WHERE guildId='${msg.guild.id}';`);
    if (prefix.rowCount === 0) {
        client.query(`INSERT INTO prefixes VALUES (${msg.guild.id}, '.');`, (err, res) => {
            if (!err) {
                if (res) {
                    console.log(`${msg.guild.name} is succesvol in de database gezet!`);
                }
            } else {
                console.log(err);
            }
        });
    };

    // let obj = JSON.parse(fs.readFileSync(`${prefix.rows}`, 'utf8'));
    // console.log(obj.prefix);
    // console.log(prefix.rows);


    prefix = process.env.PREFIX;

    if (msg.author.bot) return;
    laatstebericht = `${msg.guild.name} > ${msg.channel.name} - @${msg.author.tag}: ${msg.content}`;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.guild === null) {
        msg.reply(createEmbed(`${msg.author.username}`, `Je kan geen privéberichten naar mij sturen...`));
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    laatstecommand = `${msg.content} (@${msg.author.tag})`;
    
    if (slot === false) {
        aantalcommands++;
        try {
            if (command === "help") {
                msg.channel.send(helpEmbed());
                msg.channel.send(embedLetOp);
            }

            if (command === "setprefix") {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,"Je hebt geen bevoegdheden om de prefix van deze server aan te passen!"));
                    return;
                }

                if (!args[0]) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,`Doe ${prefix}setprefix _<prefix>_`));
                    return;
                }

                client.query(`UPDATE prefixes SET prefix='${args[0]}' WHERE guildId='${msg.guild.id}';`, (err, res) => {
                    if (!err) {
                        if (res) {
                            console.log(`Prefix van ${msg.guild.name} is veranderd!`);
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

                msg.channel.send(createEmbed(`Prefix`, `De prefix van **${msg.guild.name}** is gezet naar ***${args[0]}***!`));
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
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
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
                     msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`));
                } else {
                    for (let i = 0; i < locks.length; i++) {
                        if (locks[i].channel === msg.member.voice.channel) {
                            msg.channel.send(createEmbed(`${msg.author.username}`, `Dit kanaal is al gelocked!`));
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
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is gelocked!\nDoe **${prefix}unlock** om de kanaal weer te unlocken!`));
                    }
                }
            }
            
            if (command === "unlock") {
                if (!msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    return;
                }
                
                if (locks.length === 0) {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`));   
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
                        
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is geunlocked!\nDoe **${prefix}lock** om de kanaal weer te locken!`));
                    } else {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** is op dit moment niet gelocked!\nDoe **${prefix}lock** om dit kanaal te locken!`));   
                    }
                }
            }
            
            if (command === "code") {
                if (!msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    return;
                }  
                
                if (codes.length === 0) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    if (codes[i].channel.id != msg.member.voice.channel.id) {
                        msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                        return;
                    }
                    msg.channel.send(createEmbed(`${msg.author.username}`,`${codes[i].code} - ${codes[i].server}`));
                    return;
                }
            }

            if (command === "setcode") {
                if (!msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten!`));
                    return;
                }

                if (args.length !== 2) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,`Je moet wel een code en de server toevoegen! ***${prefix}setcode <code> <server>***`));
                    return;
                }

                const code = args[0].toUpperCase();
                const server = args[1].toUpperCase();

                if (code.length != 6) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige code in!`));
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
                            msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
                            aantalcodes += 1;
                        } catch (err) {
                            console.error(err);
                            msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
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
                            msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
                        } catch (err) {
                            console.error(err);
                            msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
                        }
                    }
                } else {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Voer een geldige server in! **NA** of **EU** of **AS**`));
                    return;
                }
            }

            if (command === "resetcode") {
                if (!msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, `Je moet wel in een voice-channel zitten om dit command te gebruiken!`));
                    return;
                }
                if (codes.length === 0) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                    return;
                }

                for (let i = 0; i < codes.length; i++) {
                    try {
                        if (codes[i].channel.id != msg.member.voice.channel.id) {
                            msg.channel.send(createEmbed(`${msg.author.username}`,`**${msg.member.voice.channel.name}** heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                            return;
                        }

//                         const c = codes[i].channel;
//                         await c.setName(`${codes[i].name}`);
        //                 await c.edit({ name: codes[i].name });
                        codes.splice(codes.indexOf({
                            "channel": msg.member.voice.channel,
                        }), 1);
                        msg.channel.send(createEmbed(`${msg.author.username}`,`Code succesvol verwijderd van **${msg.member.voice.channel.name}**!`));
                        return;
                    } catch (err) {
                        console.error(err);
                        msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));   
                    }
                }
            }

            if (command === "map") {
                msg.channel.send(createEmbed(`${msg.author.username}`, `Alle mappen van **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus** (${prefix}polus)\n-**MIRA HQ** (${prefix}mira)\n\nDoe ***${prefix}<mapnaam>*** om de kaart te zien van die map!`));
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
            }

            if (command === "ping") {
                const m = await msg.channel.send("Ping?");
                var ping = m.createdTimestamp - msg.createdTimestamp;
                m.edit(createEmbed(`Pong!`, `Latency is: **${ping}ms**.`));
            }

            if (command === "link") {
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
            }

            if (command === "amongus") {
                if (!msg.member.voice.channel) {
                    msg.channel.send(createEmbed(`${msg.author.username}`, 'Je moet een voice-channel joinen om dit command te gebruiken!'));
                    return;
                }

                for (let i = 0; i < amongus.length; i++) {
                    if (amongus[i].user === msg.author || amongus[i].kanaal === msg.member.voice.channel) {
                        msg.channel.send(createEmbed(`${msg.author.username}`, "Je bent al een game aan het hosten. Je kan niet meer dan één game hosten!"));
                        return;
                    }
                }

                var embed = new Discord.MessageEmbed()
                    .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                    .setTitle(`${msg.author.username}`)
                    .setDescription(`Reageer met een :white_check_mark: wanneer er een meeting is, reageer met een :x: als de meeting is afgelopen.\nDoe **${prefix}amongusstop** als je gaat stoppen.`)
                    .setColor(16426522)
                    .setTimestamp()
                    .setFooter(`De host is: ${msg.author.username}\nHet kanaal waarin op dit moment een game is gestart: ${msg.member.voice.channel.name}`)

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
                        var embed = new Discord.MessageEmbed()
                            .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                            .setTitle(`${msg.author.username}`)
                            .setDescription(`De game is over, doe **${prefix}amongus** om een nieuw game te starten.`)
                            .setColor(16426522)
                            .setTimestamp()
                            .setFooter(`De host was: ${amongus[i].user.username}\nHet kanaal was: ${amongus[i].name}`)
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
            msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
        }
    } else {
        msg.channel.send(createEmbed("Slot", `Op dit moment kan er geen commands worden uitgevoerd!`));   
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
