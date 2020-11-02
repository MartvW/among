const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var owner = process.env.OWNER;
var updateID = "766310034871025744";
var resetID = "772715139563782154";
var botInfokanaal = "767432509980934154";
var discordserver = "https://discord.gg/sjw7ZAb";
var amongus = [];
var codes = [];
var aantalgames = 0;
var aantalcodes = 0;
var aantalcommands = 0;
var adminMessage = "";
var resetMessage = "";

function helpEmbed() { 
    var embedHelp = new Discord.MessageEmbed()
    .setAuthor(`Among Us`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
    .setTitle("Help")
    .setDescription(`Hier is een lijstje met de commands die je kan gebruiken.`)
    .addFields(
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
        "description": `Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefix}amongus**\n- **${prefix}setcode**\n- **${prefix}resetcode**\n`,
        "fields": [
            {
                "name": ".....................",
                "value": `Hiermee kan je de help-server joinen: ${discordserver}`
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
    var embed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Reset Panel")
        .setDescription(`Hard reset: ⚙️\nCode reset: ⛏\nGame reset: 🛠`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)
    
    const channel = bot.channels.cache.find(channel => channel.id === resetID);
    channel.send({ embed: embed }).then(embedMesage => {
        embedMesage.react('⚙️');
        embedMesage.react('⛏');
        embedMesage.react('🛠');
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
    
    var embed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
        .setTitle("Botinformatie")
        .setDescription(`Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nBotbiografie: **${botbio}**\nBotprefix: **${prefix}**\nAantal commands: **${aantalcommands}**\nAantal codes: **${codes.length}**\nAantal servers: **${servers}**\nAantal games: **${amongus.length}**\nTotaal aantal games: **${aantalgames}**\nTotaal aantal codes: **${aantalcodes}**\nUptime: **${uptimestring}**\nUptime in seconden: **${botSeconds} sec.**`)
        .setColor(16426522)
        .setTimestamp()
        .setFooter(`${bot.user.tag}`)

    if (adminMessage === "") {
        const channel = bot.channels.cache.find(channel => channel.id === botInfokanaal);
        channel.send(embed).then(m => {
            adminMessage = m;
        });
    } else {
        adminMessage.edit(embed);
    }
}

bot.on("error", async msg => {
    console.error(msg);
    bot.user.setPresence({
        status: 'offline',
        activity: {
            name: ``,
        }
    })
});

bot.on("warn", async msg => {
    bot.user.setPresence({
        status: 'idle',
        activity: {
            name: ``,
        }
    })
});

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    })
    guild.owner.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan **${guild.name}**.\nJe kan al mijn commands zien als je **${prefix}help** typt!\nDe Discord Server waar je je vragen kan stellen: ${discordserver}\n\nHierop kan je ook het kanaal **#bot-status** of **#botinformatie** volgen voor de updates en de informatie over de Discord Bot!`));
    guild.systemChannel.send(createEmbed(`${bot.user.username}`,`Bedankt voor het toevoegen van mij aan deze server!\nAl mijn commands kan je zien via **${prefix}help**\nAls je vragen hebt kan je mijn help-server joinen: ${discordserver}\n\nVoor de mensen die mij willen inviten doe **${prefix}link** om de invite-link te krijgen!`));
});

bot.on("guildDelete", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    })
    guild.owner.send(createEmbed(`${bot.user.username}`,`Jammer dat je mij niet meer gebruikt op **${guild.name}**.\nWij vinden het spijtig om te horen! Ik hoop in ieder geval dat je hebt genoten van de tijd waarneer je mij hebt gebruikt!\nDe Discord Server van mij: ${discordserver}\n\nMet vriendelijke groet,\nAmong Us`));
});

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

bot.on("ready", async () => {
    const servers = await bot.guilds.cache.size;
    
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag} op ${servers} servers.`);
    console.log("");

    const channel = await bot.channels.cache.find(channel => channel.id === botInfokanaal);
    channel.bulkDelete(1);
    
    updateAdmin("-");
 
    const channel2 = await bot.channels.cache.find(channel => channel.id === resetID);
    channel2.bulkDelete(1);
    
    resetBot();
    
    var vandaag = new Date();
    var uur = vandaag.getHours();
    var minuten = vandaag.getMinutes();
    
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    });
    
    setInterval(() => {
        var status = [
            `${prefix}help | Op ${servers} servers!`,
            `${prefix}help | ${checkTime(uur)}:${checkTime(minuten)} uur`,
            `${prefix}help | Gemaakt door Mart!`,
        ];
        
        console.log(status.length);
        
        var index = 0;
        index += 1;
        
        if (index > status.length) {
            index = 0;    
        }
        
        bot.user.setPresence({
            status: 'online',
            activity: {
                name: `${status[index]}`,
            }
        });
        
        updateAdmin(status[index]);
        // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on("message", async msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;
    if (msg.guild === null && msg.author.id != owner) {
        msg.reply(createEmbed(`${msg.author.username}`, `Je kan geen privéberichten naar mij sturen...`));
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    aantalcommands++;
    try {
        if (command === "help") {
            msg.channel.send(helpEmbed());
            msg.channel.send(embedLetOp);
        }
        
        if (command === "update" && msg.author.id === owner) {
            if (args === 0) {
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
                    codes.push({
                       "channel": msg.member.voice.channel, 
                       "name": msg.member.voice.channel.name, 
                    });
                    const c = msg.member.voice.channel;
                    await c.setName(`${c.name} | ${code} - ${server}`);
//                     await c.edit({ name: `${c.name} | ${code} - ${server}` });
                    msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
                    aantalcodes += 1;
                } else {
                    for (let i = 0; i < codes.length; i++) {
                        if (codes[i].channel.id != msg.member.voice.channel.id) {
                           codes.push({
                               "channel": msg.member.voice.channel, 
                               "name": msg.member.voice.channel.name, 
                            });
                            const c = msg.member.voice.channel;
                            await c.setName(`${c.name} | ${code} - ${server}`);
                            aantalcodes += 1;
//                             await c.edit({ name: `${c.name} | ${code} - ${server}` });
                        } else {
                            const c = msg.member.voice.channel;
                            await c.setName(`${codes[i].name} | ${code} - ${server}`);
//                             await c.edit({ name: `${codes[i].name} | ${code} - ${server}` });
                            aantalcodes += 1;
                        }
                    }
                    msg.channel.send(createEmbed(`${msg.author.username}`, `De code van ${msg.member.voice.channel.name} is gezet naar **${code}** en de server is **${server}**`));
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
                msg.channel.send(createEmbed(`${msg.author.username}`,`Dit kanaal (${msg.member.voice.channel.name}) heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                return;
            }
            
            for (let i = 0; i < codes.length; i++) {
                if (codes[i].channel.id != msg.member.voice.channel.id) {
                    msg.channel.send(createEmbed(`${msg.author.username}`,`Dit kanaal (${msg.member.voice.channel.name}) heeft geen code. Doe ***${prefix}setcode <code> <server>*** om een code te zetten!`));   
                    return;
                }
                
                const c = codes[i].channel;
                await c.setName(`${codes[i].name}`);
//                 await c.edit({ name: codes[i].name });
                codes.splice(codes.indexOf({
                    "channel": msg.member.voice.channel,
                }), 1);
                msg.channel.send(createEmbed(`${msg.author.username}`,`Code succesvol verwijderd van **${msg.member.voice.channel.name}**!`));
                return;
            }
        }
        
        if (command === "map") {
            msg.channel.send(createEmbed(`${msg.author.username}`, `Alle mappen van **Among Us**:\n-**The Skeld** (${prefix}skeld)\n-**Polus**(${prefix}polus)\n-**Mira**(${prefix}mira)\n\nDoe ***${prefix}<mapnaam>*** om de kaart te zien van die map!`));
        }
        
        if (command === "skeld") {
             var embed = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                .setTitle(`${msg.author.username}`)
                .setDescription(`Map: **The Skeld**`)
                .setColor(16426522)
                .setTimestamp()
                .setImage(`https://cdn.discordapp.com/attachments/756396844459884674/756397119211962448/latest.png`)
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
                .setImage(`https://cdn.discordapp.com/attachments/756396844459884674/756397072235626496/latest.png`)
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
                .setImage(`https://cdn.discordapp.com/attachments/756396844459884674/756397010222972938/latest.png`)
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
        msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
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
            for (let i = 0; i < codes.length; i++) {
                codes[i].channel.edit({
                    name: codes[i].name,
                });
            }
            codes = [];
            return;
        } else if (reaction._emoji.name === "⛏") {
            reaction.remove();
            resetMessage.react(reaction._emoji.name);
            //code reset
            for (let i = 0; i < codes.length; i++) {
                codes[i].channel.edit({
                    name: codes[i].name,
                });
            }
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
        } else {
            reaction.remove();
            return;
        }
    }
    
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
                    member[1].voice.setSelfMute(false);
//                     member[1].edit({ mute: false });
                }
            } else if (reaction._emoji.name === "❌") {
                //mute iedereen
                reaction.remove();
                amongus[i].bericht.react(reaction._emoji.name);
                amongus[i].meetingbezig = false;
                let channel = amongus[i].channel;
                for (let member of channel.members) {
                    member[1].voice.setSelfMute(true);
//                     member[1].edit({ mute: true });
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
