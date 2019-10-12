const Discord           = require('discord.js')
const CommandManager    = require('./commands.js')

class Sylver extends Discord.Client {


    constructor(){

        super();
        
        this.debug('Sylver class initialized')

        // ID Generator
        this.uuid = require('uuid/v4');
        this.exiting = false;

        // Trigger the hold system when the process is being F'd
        this.holds = [];
        let obj = this;

        process.on('SIGINT', function() { obj.shutdown(); });
        process.on('EXIT', function() { obj.shutdown(); });

        this.debug('Hold system registered')
        this.emit('SylverInitialized');

    }

    /*
        Logging Module
    */

   debug(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'DEBUG';
        const origin = caller();

        const mes = time.cyan + ' ' + type.cyan + ' ' +  origin.gray + ' ' + message.cyan
        process.stdout.write(mes + '\n');
        fs.writeFile("latest.log", mes, (error) => {});
        console.log(mes);

    };

    log(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'NOTICE';
        const origin = caller();

        const mes = time.cyan + ' ' + type.white + ' ' +  origin.gray + ' ' + message.white
        process.stdout.write(mes + '\n');
        fs.writeFile("latest.log", mes, (error) => {});
        console.log(mes);


    };

    warn(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'WARN';
        const origin = caller();

        const mes = time.cyan + ' ' + type.yellow + ' ' +  origin.gray + ' ' + message.yellow
        process.stdout.write(mes + '\n');
        fs.writeFile("latest.log", mes, (error) => {});
        console.log(mes);


    };

    error(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'ERROR';
        const origin = caller();

        const mes = time.cyan + ' ' + type.red + ' ' +  origin.gray + ' ' + message.red
        process.stdout.write(mes + '\n');
        fs.writeFile("latest.log", mes, (error) => {});
        console.log(mes);


    };

    shutdown(){

        // Cancel exit.
        process.stdin.resume();
        this.exiting = true;

        if(Object.keys(this.holds).length != 0){
                
            this.log('Waiting for Sylver to finish up before exiting... ( ' + Object.keys(this.holds).length + ' holds left )');
            console.log(this.holds)
            setTimeout( ()=> {

                // Try to exit again.
                this.shutdown();

            },1000);

        }else{

            // Allow Exit.
            process.exit();

        }

    }

    createHold(){

        /*

            This system will make sure to keep the application from exiting while stuff is still going on
            This will result in more clean reboots.

            Usage Guide:

                let hold = Sylver.createHold();
                // code to run
                Sykver.resolveHold(hold);

        */

       let hold = { 
            id: this.uuid(),
            origin: caller()
        }

        this.holds[hold.id] = hold.origin;
        return hold;

    }

    resolveHold(hold){

        delete this.holds[hold.id];

    }


}

module.exports = Sylver;