const Check = (client) => {
    console.log("Bot is ready!");
    client.on('messageCreate', (msg) => {
        console.log('aaaaa');
    })
}

export default Check;