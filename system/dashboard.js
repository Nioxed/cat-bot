express = require('express');

class Dashboard {

    constructor(client){

        // get a reference to the client.
        this.client = client;

        this.app = express()
        this.port   = config.get('port');

        this.app.listen(this.port);

        this.app.get('/', (req, res)=>{
            res.send('poop').end();
        })

    }

}

module.exports = Dashboard;