const Discord = require('discord.js');
const bot = new Discord.Client();

setInterval(updateAdmin, 10000);

var prefix = process.env.PREFIX;
var token = process.env.BOT_TOKEN;
var owner = process.env.OWNER;
var updateID = "766310034871025744";
var botInfokanaal = "767432509980934154";
var amongus = [];
var aantalgames = 0;
var adminMessage = "";

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
        { name: `${prefix}mora`, value: 'Om de kaart te zien van Mora.', inline: false },
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
        "description": `Bij sommige commands moet je in een voice-channel zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefix}amongus** \n- **${prefix}amongusstop**`,
        "fields": [
            {
                "name": ".....................",
                "value": "Hiermee kan je de help-server joinen: https://discord.gg/sjw7ZAb"
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

async function updateAdmin() {
    const servers = await bot.guilds.cache.size;
    const users = await bot.users.cache.size;
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    
    let verificatie = "";
    if (bot.user.verified) {
        verificatie = "✅";
    } else {
        verificatie = "❌";
    }
    let status = "";
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
        .setDescription(`Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nAantal servers: **${servers}**\nAantal gebruikers: **${users}**\nAantal games: **${amongus.length}**\nTotaal aantal games: **${aantalgames}**\nUptime: **${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden**`)
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

bot.on("guildCreate", async guild => {
    const servers = await bot.guilds.cache.size;
    console.log(`Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`);
    bot.users.cache.get(owner).send(createEmbed(`Toegevoegd`, `Een nieuwe server gebruikt de bot: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers! De owner is ${guild.owner} (id: ${guild.ownerID})`));
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
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
            name: `${prefix}help | Op ${servers} servers!`,
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

    const channel = bot.channels.cache.find(channel => channel.id === botInfokanaal);
    channel.bulkDelete(1);
    
    updateAdmin();

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help | Op ${servers} servers!`,
        }
    })
});

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;
    if (msg.guild === null && msg.author.id != owner) {
        msg.reply(createEmbed(`${msg.author.username}`, `Je kan geen privéberichten naar mij sturen...`));
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    try {
        if (command === "help") {
            msg.channel.send(helpEmbed());
            msg.channel.send(embedLetOp);
        }
        
        // if (command === "admin" && msg.author.id === owner) {
        //     const servers = await bot.guilds.cache.size;
        //     const users = await bot.users.cache.size;
        //     let totalSeconds = (bot.uptime / 1000);
        //     let days = Math.floor(totalSeconds / 86400);
        //     totalSeconds %= 86400;
        //     let hours = Math.floor(totalSeconds / 3600);
        //     totalSeconds %= 3600;
        //     let minutes = Math.floor(totalSeconds / 60);
        //     let seconds = Math.floor(totalSeconds % 60);
        //     let verificatie = "";
        //     if (bot.user.verified) {
        //         verificatie = "✅";
        //     } else {
        //         verificatie = "❌";
        //     }
        //     let status = "";
        //     if (bot.user.presence.status === "online") {
        //         status = "🟢";
        //     } else if (bot.user.presence.status === "offline") {
        //         status = "🔴";
        //     } else if (bot.user.presence.status === "idle") {
        //         status = "🟠";
        //     } else if (bot.user.presence.status === "invisible" || bot.user.presence.status === "dnd") {
        //         status = "⚫️";
        //     }

        //     msg.channel.send(createEmbed('Botinformatie', `Botnaam: **${bot.user.tag}**\nBotverificatie: ${verificatie}\nBotstatus: ${status}\nAantal servers: **${servers}**\nAantal gebruikers: **${users}**\nAantal games: **${amongus.length}**\nTotaal aantal games: **${aantalgames}**\nUptime: **${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden**`));

        // }

        if (command === "update" && msg.author.id === owner) {
            if (!args > 0) {
                msg.channel.send(createEmbed('Mart W.', `Je moet wel argumenten toevoegen voor de update`));
            return;
            }
            msg.channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`));
            const channel = bot.channels.cache.find(channel => channel.id === updateID);
            channel.send(createEmbed('UPDATE', `Er is een update geweest van de bot!\n**${args.join(' ')}**\n\n@here`));
        }
        
        if (command === "resetcount" && msg.author.id === owner) {
            aantalgames = 0;   
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
                msg.reply(createEmbed("Reset", `Resetcommand uitgevoerd! Bezig met resetten...`))
            }
            amongus = [];
        }
        
        if (command === "map") {
            msg.channel.send(createEmbed(`${msg.author.username}`, `Alle mappen van **Among Us**:\n-**The Skeld**\n-**Polus**\n-**Mora**\n\nDoe ***${prefix}<mapnaam>*** om de kaart te zien van die map!`));
            
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
        
        if (command === "mora") {
             var embed = new Discord.MessageEmbed()
                .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                .setTitle(`${msg.author.username}`)
                .setDescription(`Map: **Mora**`)
                .setColor(16426522)
                .setTimestamp()
                .setImage(`https://cdn.discordapp.com/attachments/756396844459884674/756397010222972938/latest.png`)
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
            msg.channel.send(createEmbed(`${msg.author.username}`, `Uptime: ${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden.`));
        }
        
        if (command === "ping") {
            msg.channel.send("Pinging...").then(m => {
                var ping = m.createdTimestamp - msg.createdTimestamp;

                // Then It Edits the message with the ping variable embed that you created
                m.edit(createEmbed(`${msg.author.username}`, `Jouw ping is: ${ping}ms`));
            });
        }

        if (command === "link") {
            msg.channel.send(createEmbed(`${msg.author.username}`, 'Invite link voor de bot: https://discord.com/oauth2/authorize?client_id=469857906385354764&scope=bot&permissions=8\nInvite link voor de discord server: https://discord.gg/sjw7ZAb'));
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
//             if (!msg.member.voice.channel) {
//                 msg.channel.send(createEmbed(`${msg.author.username}`, "Je moet het kanaal joinen waarin je dit command hebt gezegd!"));
//                 return;
//             }
            
            for (let i = 0; i < amongus.length; i++) {
                if (amongus[i].user.id === msg.author.id) {
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(`${bot.user.username}`, `https://cdn.discordapp.com/app-icons/469857906385354764/ea4f5a8c39e1b183777117bdd40a7449.png`)
                        .setTitle(`${msg.author.username}`)
                        .setDescription(`De game is over, doe **${prefix}amongus** om een nieuw game te starten.`)
                        .setColor(16426522)
                        .setTimestamp()
                        .setFooter(`De host was: ${amongus[i].user.username}\nHet kanaal was: ${amongus[i].channel.name}`)
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
        bot.users.cache.get(owner).send(createEmbed("ERROR", `Among Us Bot heeft een error gekregen: ${err}`));
        msg.reply(createEmbed("ERROR", `ERROR: De bot heeft een error, de error is naar de maker gestuurd.`));
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
})

bot.login(token);
