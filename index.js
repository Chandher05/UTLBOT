const Discord = require('discord.js'); // importing the package to interact with discord

require('dotenv').config() //setting env variables for the proj
require("./backend/connectToDB"); // conn to the database
const utlModel = require('./backend/schema/user.model') // using db schema 
const bot = new Discord.Client();
bot.once('ready', () => {
    console.log('The bot is ready');
});

async function newUser(discordid, username) {
    const entry = new utlModel();
    entry.username = username
    entry.discordID = discordid
    await entry.save()
    console.log('****New user******')
}

const DbHandler = async (discordid, name, msg) => {
    let userData = await utlModel.findOne({
        discordID: discordid
    }).exec();
    console.log(userData)
    if (!userData) {
        await newUser(discordid, name)
    }

    if (msg.startsWith(`${process.env.BOT_PREFIX} add`)) {
        console.log(await utlModel.findOneAndUpdate({
            discordID: discordid
        }, {
            $set: {
                currReading: {
                    name: msg.substring(7),
                    pages: 0
                }
            }

        }))
    } else if (msg.startsWith(`${process.env.BOT_PREFIX} pg`)) {
        console.log(await utlModel.findOneAndUpdate({
            discordID: discordid
        }, {
            $set: {
                'currReading.pages': parseInt(msg.substring(6))
            }

        }))
    } else if (msg.startsWith(`${process.env.BOT_PREFIX} tbr`)) { // UTL tbr 
        // the bot command - UTL tbr *Book Name* and *Author name*
        let bookDetails = msg.substring(8).split(' by '); // getting the author and the book
        console.log(await utlModel.findOneAndUpdate({
            discordID: discordid
        }, {
            $push: {
                toreadList: {
                    name: bookDetails[0],
                    author: bookDetails[1]
                }
            }

        }))
    } else if (msg.startsWith(`${process.env.BOT_PREFIX} fin`)) { // UTL tbr 
        // the bot command - UTL tbr *Book Name* and *Author name*
        let bookDetails = msg.substring(8).split(' by '); // getting the author and the book
        console.log(await utlModel.findOneAndUpdate({
            discordID: discordid
        }, {
            $push: {
                readList: {
                    name: bookDetails[0],
                    author: bookDetails[1]
                }
            }

        }))
    }
}



bot.on('message', message => {
    if (message.content.startsWith(`${process.env.BOT_PREFIX}`)) {
        // Find the user 
        console.log()
        DbHandler(message.author.id, message.author.name, message.content)
        message.channel.send(`Mischief Managed, ${message.author.username}!`)

    }

})

bot.login(process.env.DISCORD_TOKEN);