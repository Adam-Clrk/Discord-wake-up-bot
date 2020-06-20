const Commando = require('discord.js-commando');
const { owner, commandPrefix, token, moveNumber } = require('./config.json')

function sleep(ms) {
  return new Promise((f) => { setTimeout(f, ms) })
}

class FastMoveCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'fast-move',
      aliases: ['wakeup', 'wake'],
      group: 'commands',
      memberName: '',
      description: 'Wake person up init',
      guildOnly: true,
      throttling: {
        usages: 5,
        duration: 120
      },
      args: [
        {
          key: 'person',
          label: 'user tag',
          prompt: 'tag the person to be moved',
          type: 'member',
          infinite: false
        }
      ]
    })
  }
  async run(message, args) {
    var person = args.person
    if (
      !person.voice ||
      person.voice.guild.id !== message.guild.id ||
      !person.voice.channel.permissionsFor(message.channel.guild.me).has('MOVE_MEMBERS')
    ) {
      return
    }

    var original_channel = person.voice.channel.id

    await message.guild.fetch()
    var new_channels = person.voice.guild.channels.cache.filter((c) => (
      c.type == 'voice' &&
      c.id !== original_channel &&
      c.permissionsFor(c.guild.me).has('MOVE_MEMBERS')
    )).map(c => c.id)
    for (var i = 0; i < moveNumber; i++) {
      await person.voice.setChannel(new_channels[i % new_channels.length])
      await sleep(800)
    }
    await person.voice.setChannel(original_channel)
    message.reply('done')
  }
}

const client = new Commando.Client({
  owner,
  commandPrefix
})

client.registry.registerDefaults()
client.registry.registerCommand(FastMoveCommand)

client.on('ready', () => {
  console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
})

client.login(token)
