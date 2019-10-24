class ExampleAddon{

    /* 
        The constructor is used to set the addon metadata
        like Name, Description & Version.

        You should also prepare extra node modules in the constructor.
        Do NOT set up any bot related logic though, Use init() for that.

    */
    constructor(){

        // Modify the values below :)
        this.name = "logsShit"
        this.description = "Template & Example for your own addons!"
        this.version = "1.0.0"

    }

    /* 
        init() gets called after the constructor has finished.
        It's good practise to set up your commands and stuff here.
        
        Don't use this to check for compability hooks with other addons.
        Do that in postInit();

    */

    init(){

    }

    postInit(){

        let addon = this;
        
        this.configs = client.addons["guildSettings"] 
        client.on('message', message => {

            if(message.channel.type != "text"){ return; }
            let scfg = this.configs.configs[message.guild.id];

            if(message.content.startsWith(scfg.get('prefix') + "loghere")){

                if(message.member.hasPermission('MANAGE_CHANNELS')){

                    scfg.register('logChannel', null);
                    scfg.set('logChannel', message.channel.id);
                    scfg.save();

                    message.reply('when the moon hits your eye like a big pizza pie logs will be snet here');

                }else{

                    message.reply('stfu unpermitted cunt');

                }
                

            }

        })


    }

    getCFG(guild){

        return this.configs.configs[message.guild.id];

    }


}

module.exports = ExampleAddon;