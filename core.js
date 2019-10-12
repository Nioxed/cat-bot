
    /*      Sylver Framework 0.0.1
            BeepSterr 2019              */

    moment                  = require('moment');
    caller 		            = require('caller');
    colors 		            = require('colors');

    const Sylver            = require('./system/main.js')
    StorageManager          = require('./system/storageManager.js')
    const Dashboard         = require('./system/dashboard.js')

    client              = new Sylver({ shardCount: "auto" });
    config              = new StorageManager(client, 'config', true, false)
    parser              = require('discord-command-parser')
    dashboard           = []
    
    client.log('Sylver is starting...')
    let initHold = client.createHold();

    // Let's import our object storage.
    config.once('ready', ()=> {

        // We'll need to initialize the dashboard now.
        client.login(config.get('bot_token'));
        client.resolveHold(initHold);

    })

    // The config storage file was just made, We'll need to populate before erroring out.
    config.once('newFile', ()=> {

        config.register('bot_token', '');
        config.register('dashboard_port', 3000);
        config.register('log_debug', false);

        config.save();

        client.error('Config has been generated, Please fill it in and restart.');
        client.resolveHold(initHold);

        client.shutdown();

    })

    client.on('ready', ()=> {	

        dashboard = new Dashboard(client);
        client.addonList = [];
        client.addons = {};

        client.log( 'Logged into discord as user: [ ' + client.user.tag + ' ]' )
        require('fs').readdirSync(__dirname + '/instance/').forEach(function(file) {

            // Log.
            client.debug('Loading ' + file);

            // Create a instance of the addon we just loaded.
            let addon = require(__dirname + '/instance/' + file);
            let addonInstance = new addon();

            // Store it somewhere in the cool shit.
            client.addonList.push(addonInstance);
            client.addons[addonInstance.name] = addonInstance;

            // run init
            if(addonInstance.init != undefined){
                addonInstance.init();
            }else{
                client.warn("Addon " + addonInstance.name + " does not have a init()!")
            }


        });

        client.addonList.forEach( addon => {
            if(addon.postInit != undefined){
                addon.postInit();
            }else{
                client.warn("Addon " + addon.name + " does not have a postInit()!")
            }
        })

        client.emit('addonListLoaded', client.addonList)

    })