class guildSettings{

    constructor(){

        // Modify the values below :)
        this.name = "guildSettings"
        this.description = "Allow different configs for every guild."
        this.version = "1.0.0"

        this.configs = {};

    }

    init(){

        client.guilds.each( guild =>{

            let guildConfig = new StorageManager(client, 'guilds/' + guild.id, false, false)

            guildConfig.once('newFile', (ready)=> {

                guildConfig.register('prefix', '.');
                guildConfig.save();
        
                client.log('Config generated for ' + guild.name);
                ready();
        
            })

            guildConfig.once('ready', ()=> {

                this.configs[guild.id] = guildConfig;
        
            })

        })

    }


}

module.exports = guildSettings;