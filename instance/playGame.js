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

        this.games = [
            'Minecraft',
            'Overwatch',
            'Dark Souls',
            "Roblox",
            "Dead By Daylight",
            "Last year: The Nightmare",
            "Fallout 76",
            "Radical Heights!",
            "Fortnite 2",
            "Risk of rain",
            "Paladins",
            "Garry's Mod",
            "Black Mesa",
            "Donut County",
            "A Hat In time",
            "Slime Rancher",
            "Rust",
            "Super Animal Royale",
            "Tabletop Simulator",
            "Team Fortress 2",
            "UNO",
            "Dark Souls III",
            "Don't Starve Alone",
            "100% Orange Justice",
            "2064: Read Only Memories",
            "Adventure Kappatilist",
            "Bad Rats",
            "The Binding Of Isaac: Rebirth",
            "Fidget Runner",
            "Fidget Runner 2: Battle Royale",
            "Brawlhalla",
            "Changed",
            "Counter-Strike Nexon: Zombies",
            "Counter-Strike: Source",
            "VRChat",
            "CS2D",
            "Day Of Defeat",
            "DEFCON",
            "Destiny 3",
            "Dino D-Day",
            "Dirty Bomb",
            "Dust: An Eysian Tail",
            "Emoji.io",
            "The Escapist",
            "The Elder Scrolls V: Skyrim",
            "Fallout: New Vegas",
            "Fistful of Frags",
            "Five Nights At Freddy's",
            "For Honor",
            "Foxhole",
            "Furry Girl",
            "Garfield Kart",
            "Geometry Dash",
            "Goat Simulator",
            "Golf It!",
            "Grand Theft Auto V",
            "Half-Life",
            "Half-Life 2: Episode 3",
            "The Hat Man: Shadow Ward",
            "Hentai Minesweeper",
            "Her Story",
            "Infinite Children",
            "Insurgency",
            "Just Cause 2",
            "The Lab",
            "Left On Read 2",
            "Life Is Strange",
            "Loading Screen Simulator",
            "McPixel",
            "Meadow",
            "Medal Of Honor",
            "Metro 2033",
            "Minecraft: Story Mode",
            "Mini Gold Mundo",
            "Mini Metro",
            "Mirror's Edge",
            "My Name is Mayo",
            "NEKOPARA Vol. 0",
            "Nether",
            "No More Room in Hell",
            "Outlast",
            "Oxygen Not Included",
            "Pajama Sam in No Need to Hide When It's Dark Outside",
            "Clowngun",
            "PAYDAY 2",
            "Peggle Extreme",
            "Planet Coaster",
            "Pony Island",
            "Portal",
            "Poker Night 2",
            "PUBG",
            "Portal Stories: Mel",
            "Puyo Puyo Tetris",
            "OpenRCT2",
            "Quiplash",
            "RUSSIA BATTLEGROUNDS",
            "RPG Maker VX Ace",
            "SCP: Secret Laboratory",
            "Screencheat",
            "Sanctum",
            "Raints Row 2",
            "The Ship",
            "Seasons After Fall",
            "SimCity 4 Deluxe",
            "SOS"
        ]


    }

    randomState(){

        client.user.setActivity( this.games[Math.floor(Math.random() * this.games.length)] , { type: 'PLAYING' })

    }

    init(){


        // Change playing status every so often
        setInterval( ()=> {

            this.randomState();

        }, 1000 * 60 * 10)
        

    }

    postInit(){

        this.randomState();

    }


}

module.exports = ExampleAddon;