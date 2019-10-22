class ExampleAddon{

    /* 
        The constructor is used to set the addon metadata
        like Name, Description & Version.

        You should also prepare extra node modules in the constructor.
        Do NOT set up any bot related logic though, Use init() for that.

    */
    constructor(){

        // Modify the values below :)
        this.name = "exampleAddon"
        this.description = "Template & Example for your own addons!"
        this.version = "1.0.0"

    }

    init(){


    }

    postInit(){


        client.on('voiceStateUpdate', (oldState, newState) => {

            try{
        
                if( oldState != null){
        
                    if (oldState.channelID != newState.channelID){
        
                        client.channels.fetch(oldState.channelID).then( channel => {
        
                            channel.members.array().forEach( member => {

                                if(member.id != oldState.id){ 
            
                                    member.user.send(oldState.member.user.tag + " Left you in #"+ oldState.channel.name, {
                                        "embed": {
                                            "color": 13632027,
                                            "author": {
                                                "name": oldState.member.user.tag + " Left you in #"+ oldState.channel.name,
                                                "url": "https://discordapp.com/channels/" + oldState.channel.guild.id + "/" + oldState.channel.id,
                                                "icon_url": oldState.member.user.avatarURL({ size: 256 })
                                            }
                                        }
                                    })

                                }
            
                            })
        
                        })
                    }
        
                }
        
                if( newState != null){
        
                    if (oldState.channelID != newState.channelID){
        
                        client.channels.fetch(newState.channelID).then( channel => {
        
                            channel.members.array().forEach( member => {
        
                                if(member.id != oldState.id){ 

                                    member.user.send(newState.member.user.tag + " Joined you in #"+ newState.channel.name, {
                                        "embed": {
                                            "color": 8311585,
                                            "author": {
                                                "name": newState.member.user.tag + " Joined you in #"+ newState.channel.name,
                                                "url": "https://discordapp.com/channels/" + newState.channel.guild.id + "/" + newState.channel.id,
                                                "icon_url": newState.member.user.avatarURL({ size: 256 })
                                            }
                                        }
                                    })

                                }
            
                            })
                            
                        })
        
                    }
        
                }
                    
            }catch(ex){
        
                console.log(ex);
        
            }
        
        });
        

    }


}

module.exports = ExampleAddon;