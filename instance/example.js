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

    /* 
        init() gets called after the constructor has finished.
        It's good practise to set up your commands and stuff here.
        
        Don't use this to check for compability hooks with other addons.
        Do that in postInit();

    */

    init(){

        //client.log('You can call client from within addons!')

    }


    /*
        postInit() gets called after init().
        Use this to set up loops & to make sure you're able to run.
        If not, Post some warning and delete yourself.
        
    */

    postInit(){



    }


}

module.exports = ExampleAddon;