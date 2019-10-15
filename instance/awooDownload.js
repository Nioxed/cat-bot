class ExampleAddon{

    constructor(){

        let addon = this;

        // Modify the values below :)
        this.name = "awooDownload"
        this.description = "Template & Example for your own addons!"
        this.version = "1.0.0"

        const wdav = require("webdav");
        this.davclient = wdav.createClient(
            config.get('dav_url'),
            {
                username: config.get('dav_username'),
                password: config.get('dav_password')
            }
        );
        

        this.script = {
            "Version": "12.4.1",
            "Name": "Awoo.download V5",
            "DestinationType": "ImageUploader, TextUploader, FileUploader",
            "RequestMethod": "POST",
            "RequestURL": "https://awoo.download/upload",
            "Headers": {
              "user": "USERIDGOESHERE",
              "token": "TOKENGOESHERE"
            },
            "Body": "MultipartFormData",
            "FileFormName": "file",
            "URL": "$json:url$"
        }

        this.strategy = {

            discord: function(file, id, done){

                client.channels.get('632612391732903941').send( { files: [ { attachment: file.data, name: id + "." + file.mime.ext } ]  }).then( message => {
                        
                    done(message.attachments.first().url);

                })


            },

            webdav: function(file, id, done){

                addon.davclient.putFileContents("/uploads/" + id + "." + file.mime.ext, file.data, { overwrite: false, maxContentLength: 1e+10 });
                done(addon.davclient.getFileDownloadLink("uploads/" + id + "." + file.mime.ext))

            }

        }

    }

    init(){

        let addon = this;

        this.token = require('rand-token');
        const filetype = require('file-type');

        // Web Server
        const request = require('request').defaults({ encoding: null });

        const express = require('express')
        const app = express();
        const port = config.get('dashboard_port');

        const fileUpload  = require('express-fileupload');
       
        app.use(fileUpload({
            limits: { fileSize: 1000 * 1024 * 1024, abortOnLimit: false, safeFileNames: true },
        }));


        app.get('/index.html', (req, res) => res.send('yeehaw'))
        app.listen(port, () => client.log(`Uploader service running on port ${port}!`))

        app.get('/sharex/:user/:token', function(req, res) {

            res.setHeader('Content-disposition', 'attachment; filename= awooV5.sxcu');
            res.setHeader('Content-type', 'application/json');

            let script = addon.script;

            script.Headers.user = req.params.user;
            script.Headers.token = req.params.token;
          
            res.write(JSON.stringify(script), function (err) {
              res.end();
            });

        });

        app.post('/upload', function(req, res) {

            let user = req.headers['user'];
            let token = req.headers['token'];

            addon.fetchUserData({id: user}, (userData)=>{

                if(userData.get('token') == token){

                    // add some extra mime data.
                    req.files.file.mime = filetype(req.files.file.data);
                    console.log(req.files.file)

                    let uploadID = addon.token.generate(5);
                    let selectedStrat = "webdav";
                    if(req.files.file.size < 8388100){ selectedStrat = "discord" }

                    let strat = addon.strategy[selectedStrat];

                    client.log('Using uploading Strategy:' + selectedStrat)

                    strat(req.files.file, uploadID, (done)=>{

                        if(done == false){

                            res.status(500);
                            res.send('The upload failed for some reason :(').end();

                        }else{

                            let uploadedFileStore = new StorageManager(client, 'uploads/' + uploadID, false, false)
                            uploadedFileStore.once('newFile', (ready)=> {
                    
                                uploadedFileStore.register('name', uploadID);
                                uploadedFileStore.register('strategy', selectedStrat);
                                uploadedFileStore.register('url', done);
                                uploadedFileStore.register('uploaded_by', user);
                                uploadedFileStore.register('uploaded_at', new Date());
                                uploadedFileStore.save();
    
                                ready();
                    
                            })
    
                            uploadedFileStore.once('ready', (ready)=> {
                    
                                res.json({ url: "https://awoo.download/" + uploadID })
                    
                            })
                            
                        }

                    })


                }else{
                    res.status(403);
                    res.send('Your user/token combination is invalid. ').end();
                }

            })

        });

        app.get('/:id', (req, res) => {
            
            
            if (fs.existsSync(__dirname + '/../data/uploads/' + req.params.id + '.json' )) {
                
                let uploadedFileStore = new StorageManager(client, 'uploads/' + req.params.id, false, false)
                uploadedFileStore.once('ready', (ready)=> { //

                    req.pipe(request(uploadedFileStore.get('url'))).pipe(res);

                });

            }else{
                res.send('not found :/').end();
            }


        })

    }

    postInit(){
        
        // get a reference to configs.
        this.configs = client.addons["guildSettings"] 

        client.on('message', message => {

            if(message.channel.type != "text"){ return; }

            let scfg = this.configs.configs[message.guild.id];

            if(message.content.startsWith(scfg.get('prefix') + "uploader")){
                this.fetchUserData(message.author, (data)=>{

                    if(message.member.roles.has('632632209114660875')){

                        message.channel.send("Check your dm's for a download link :)")
                        message.author.send({
                            "embed": {
                                "color": 13632027,
                                "author": {
                                    "name": "Download your ShareX Config File",
                                    "url": "https://awoo.download/sharex/" + message.author.id + "/" + data.get('token'),
                                    "icon_url": "https://cdn.discordapp.com/attachments/632612391732903941/632631492144529419/file.jpg"
                                }
                            }
                        })

                    }else{
                        message.channel.send("You haven't been whitelisted for Awoo.download! :(")
                    }



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