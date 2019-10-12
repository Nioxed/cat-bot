fs              = require('fs-extra');
EventEmitter    = require('events');

class Storage extends EventEmitter{


    constructor(client, file, readable = false, volatile = false){

        super();

        this.dir    = __dirname + '\\..\\data\\'
        this.file   = this.dir + file + '.json';
        this.store  = {};

        this.volatile = volatile;
        this.readable = readable;

        if(this.volatile == false){

            // When dealing with IO, Hold the process from closing
            let hold = client.createHold()

            fs.access(this.file, fs.F_OK, (err) => {
                if (err) {

                    client.warn("Could not load the storageObject for '" + file + "'. This is normal if this is the first time it is being used.")
                   
                    client.resolveHold(hold);
                    this.store = {}
                    this.emit('newFile', ()=>{
                        this.emit('ready')
                    })

                }else{

                    this.store = JSON.parse(fs.readFileSync(this.file, "utf8"))
                    client.resolveHold(hold);
                    this.emit('ready');

                }


            });

        }

    }

    get(name){

        return this.store[name];

    }

    set(name, value){

        this.store[name] = value;
        this.save();
        return this;


    }

    register(name, defaultValue){

        if(this.store[name] === undefined){

            this.store[name] = defaultValue;

        }

        return this;

    }

    save(){

        let hold = client.createHold();
        let fileData = {};

        // Saves our data to the disk.
        if(this.readable == true){
            fileData = JSON.stringify(this.store, null, 2)
        }else{
            fileData = JSON.stringify(this.store)
        }
        fs.outputFile(this.file, fileData, "utf8").then(() => {

           client.resolveHold(hold);

        }).catch(err => {
            client.warn('Could not save storageObject ' + file + '. ' + err);
            client.resolveHold(hold);
          })

    }

}

module.exports = Storage;