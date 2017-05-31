"use strict";

let IRC = require('irc-framework')
const env = require('./env.js')

const bot = new IRC.Client()

bot.connect({
	host: env.twitch.hostname,
	port: env.twitch.port,
	nick: env.twitch.name,
	password: env.twitch.password,
})

bot.on('connected',()=>{
	bot.join(env.twitch.channels[0])
	bot.say(env.twitch.channels[0], 'hi')
})

/*
bot.on('raw', (e)=>{
	console.log(e)
})
*/

bot.on('message', (event) => {
	if (event.message.indexOf('hello') === 0) {
		event.reply('Hi!')
	}

	if (event.message.match(/^!join /)) {
		var to_join = event.message.split(' ')
		event.reply('Joining ' + to_join + '..')
		bot.join(to_join)
	}
})
