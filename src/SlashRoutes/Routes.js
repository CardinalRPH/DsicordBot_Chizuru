import { ApplicationCommandOptionType } from "discord.js"

const command = [
    {
        name: 'play',
        description: 'Playing Music from Youtube',
        options: [{
            name: 'track-resource',
            description: 'URl of youtube or keyword',
            type: ApplicationCommandOptionType.String,
            required: true
        }]
    }, {
        name: 'stop',
        description: 'Stop the current playing track'
    }, {
        name: 'pause',
        description: 'Pause the current playing track'
    }, {
        name: 'resume',
        description: 'Resume paused Track or stoped track'
    }, {
        name: 'queue',
        description: 'Show all track in queue'
    }, {
        name: 'nowplaying',
        description: 'Get information about currently played track'
    }, {
        name: 'skip',
        description: 'Skip to next Track or choosen Track.',
        options: [{
            name: 'skiptoindex',
            description: 'set index number for skip song (0 is first)',
            type: ApplicationCommandOptionType.Number,
            required: false
        }]
    }, {
        name: 'loop',
        description: "Looping a single tracks"
    }, {
        name: 'shufflle',
        description: "Shuffling All Queue."
    }, {
        name: 'ping',
        description: 'Ping the bot'
    }, {
        name: 'connect',
        description: 'Connect bot to the Voice Channel'
    }, {
        name: 'disconnect',
        description: 'Disconnect Bot From The voice channel and Stop Playback'
    }, {
        name: 'ctest',
        description: 'Testing'
    }
]

//need clear queue
//need loop all track

export default command