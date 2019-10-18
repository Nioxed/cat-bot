request = require("request")
CronJob = require('cron').CronJob;

class ExampleAddon{

    constructor(){

        // Modify the values below :)
        this.name = "DeadByShrine"
        this.description = "Send DBD Shrine to special location"
        this.version = "1.0.0"

    }

    init(){
        

    }

    postInit(){

        let addon = this;
        
        this.configs = client.addons["guildSettings"] 
        client.on('message', message => {

            if(message.channel.type != "text"){ return; }

            let scfg = this.configs.configs[message.guild.id];

            if(message.content.startsWith(scfg.get('prefix') + "shrinechannel")){

                if(message.member.hasPermission('MANAGE_CHANNELS')){

                    scfg.register('shrineChannel', null);
                    scfg.set('shrineChannel', message.channel.id);
                    scfg.save();

                    message.reply('k. shrine will now be sent here.');

                }else{

                    message.reply('lol u have no MANAGE_CHANNELS perms, Stupid.');

                }
                

            }

            if(message.content.startsWith(scfg.get('prefix') + "forceshrineupdate")){

                this.getShrine(message.channel)
            }

        })

        new CronJob('1 0 * * 4', function() {

            console.log('Updating shrine for everyone!');
            client.guilds.array().forEach( guild => {

                let scfg = addon.configs.configs[guild.id];
                let channelID = scfg.get('shrineChannel');

                if(channelID != undefined){
                    addon.getShrine(client.channels.get(channelID));
                }


            })

        }, null, true, 'Etc/GMT+0');


    }

    getShrine(channel){

        request({
            url: "https://dbd.wolfer.io/api/shrineofsecrets",
            json: true
        }, function (error, response, body) {
        
            if (!error && response.statusCode === 200) {

                console.log(moment.duration(moment().diff(moment(body.endDate))).humanize())

                channel.send({
                    "embed": {
                        "footer": {
                          "text": "Shrine resets in " + moment.duration(moment().diff(moment(body.endDate))).humanize()
                        },
                        "author": {
                          "name": "Shrine Of Secrets - Week " + body.week,
                          "url": "https://deadbydaylight.gamepedia.com/Shrine_of_Secrets",
                          "icon_url": "https://gamepedia.cursecdn.com/deadbydaylight_gamepedia_en/thumb/1/14/IconHelp_shrineOfSecrets.png/32px-IconHelp_shrineOfSecrets.png?version=f2de1cabe68c0a891099f0e01157d43f"
                        },
                        "fields": [
                          {
                            "name": body.items[0].id,
                            "value": "<:dbd_shards:634563728154558475> " + body.items[0].cost[0].price,
                            "inline": true
                          },
                          {
                            "name": body.items[1].id,
                            "value": "<:dbd_shards:634563728154558475> " + body.items[1].cost[0].price,
                            "inline": true
                          },
                          {
                            "name": body.items[2].id,
                            "value":"<:dbd_shards:634563728154558475> " + body.items[2].cost[0].price,
                            "inline": true
                          },
                          {
                            "name": body.items[3].id,
                            "value": "<:dbd_shards:634563728154558475> " + body.items[3].cost[0].price,
                            "inline": true
                          }
                        ]
                      }
                })

            }else{
                channel.send("Something went wrong fetching shrine data.")
            }
        })

        

    }


}

module.exports = ExampleAddon;