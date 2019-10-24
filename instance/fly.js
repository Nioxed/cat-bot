class ExampleAddon{

    /* 
        The constructor is used to set the addon metadata
        like Name, Description & Version.

        You should also prepare extra node modules in the constructor.
        Do NOT set up any bot related logic though, Use init() for that.

    */
    constructor(){

        // Modify the values below :)
        this.name = "flyMeUp"
        this.description = "Cake has decided to speak and not thing"
        this.version = "1.0.0"

    }

    init(){

        this.consts = {
            lbskg: 0.453592, // from lbs to kg conversion
            fly: 10 // milligrams
        }

    }

    postInit(){


        let addon = this;
        
        this.configs = client.addons["guildSettings"] 
        client.on('message', message => {

            if(message.channel.type != "text"){ return; }
            let scfg = this.configs.configs[message.guild.id];

            // make sure that people who use capital letters don't get fricked over
            message.content = message.content.toLowerCase();

            if(message.content.startsWith(scfg.get('prefix') + "fly")){
                client.log('Started fly.')

                message.vars  = message.content.split(' ');
                message.vars[1] = Number(message.vars[1])

                // Sanity checks
                if(message.vars[2] == undefined){ message.vars = "lbs" }

                if(typeof(message.vars[1]) != "number"){
                    message.reply('Fuck you. Use the correct format `'+ message.vars[0] +' < weight > < kg / lbs >`');
                    return;
                } 
                
                // LETS GOOO
                if(message.vars[2] == "kg" || message.vars[2] == "lbs"){

                    let baseWeight = message.vars[1];

                    // convert from lbs to KG
                    if(message.vars[2] == "lbs"){ baseWeight = baseWeight * addon.consts.lbskg }

                    // convert KG to MG
                    let baseWeightMg = baseWeight * 1000000

                    // convert KG to MG
                    let flyCount = baseWeightMg / 11;

                    message.reply("You'd need about ***`" + Math.ceil(flyCount).toLocaleString('en-US') + "`*** flies to lift you from the ground.");
                    return;

                }else{

                    message.reply('Fuck you. Use the correct format `'+ message.vars[0] +' < weight > < kg / lbs >`');
                    return;

                }


            }

        })


    }


}

module.exports = ExampleAddon;