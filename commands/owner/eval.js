const { MessageFlags } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: 'eval',
    aliases: ['e'],
    description: 'Eval Command',
    catagory: 'info',
    guildOnly: true,

    run: async (client, message, args) => {
        if (message.author.id !== '687929616190668821'){
            return message.channel.send('Only Bot Owner can use this Command!')
        }
        if (!args[0]) return message.channel.send({
            embed: {
                description: '**Please Give Some code to Evalate**',
                color: "WHITE"
            }
        });
        let code = args.join(' ')
        code = code.replace(/[""]/g, '"').replace(/['']/g, "'")

        let evaled;
        try {
            const start = process.hrtime()
            evaled = eval(code);
            if (evaled instanceof Promise) {
                evaled = await eval
            }
            const stop = process.hrtime(start);
            let response = [
                `**OutPut: \`\`\`js\n${(inspect(evaled, { depth: 0 }))}\n\`\`\``
                //, `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``
                , `**Time taken: \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n')
            if (res.length < 2000) {
                await message.channel.send(res)
            } else {
                const output = new MessageAttachment(Buffer.from(res), 'output.txt');
                await message.channel.send(output);

            }
        } catch (error) {
            message.reply(`An error has occured \n \n \`${error}\``)
        }
    }
}
