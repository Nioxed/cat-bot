class ExampleAddon{

    constructor(){

        // Modify the values below :)
        this.name = "awooDownload"
        this.description = "Template & Example for your own addons!"
        this.version = "1.0.0"

    }

    init(){

        this.token = require('rand-token');

    }

    postInit(){
        
        // get a reference to configs.
        this.configs = client.addons["guildSettings"] 

        client.on('message', message => {

            let scfg = this.configs.configs[message.guild.id];
            
            console.log(message.content);
            console.log(scfg);

            if(message.content.startsWith(scfg.get('prefix') + "fix")){

                this.fetchUserData(message.author, (data)=>{
                    console.log(data)
                })
            }

        })

    }

    fetchUserData(user, ret){

        let guildConfig = new StorageManager(client, 'users/' + user.id, false, false)
        guildConfig.once('newFile', (ready)=> {

            guildConfig.register('token', this.token.generate(32));
            guildConfig.save();
            client.log('Config generated for ' + user.tag);

            ret(guildConfig);

        })

        // Let's import our object storage.
        guildConfig.once('ready', ()=> {
    
            ret(guildConfig);
    
        })

    }


}

module.exports = ExampleAddon;