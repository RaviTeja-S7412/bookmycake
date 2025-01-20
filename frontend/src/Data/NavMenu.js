
const NavBarItems = [
    {
        id: 1, label: "Christmas Specials", path: "/christmasCakes",
        
    },
    {
        id: 2, label: "Indian Fusion Cakes", path: "/indianFusionCakes"
    },
    {
        id: 3, label: "Photo Cakes",path:"photoCakes",
        subItems: [
            { id: 31, label: "All Photo Cakes", path: "/photo-cakes-all" },
            { id: 32, label: "Custom Photo Cakes", path: "/" },
            { id: 33, label: "Kids Photo Cakes", path: "/" }
        ]
    },
    {
        id: 4, label: "Flavor",path:"flavourCakes",
        subItems: [
            { id: 41, lable: "Pineapple Cakes", path: "/falvour" },
            { id: 42, label: "Chocolate Cakes", path: "/" },
            { id: 43, label: "Vanilla Cakes", path: "/" },
            { id: 44, label: "Black Forest Cakes", path: "/" },
            { id: 45, label: "Butterscotch Cakes", path: "/" },
            { id: 46, label: "Strawberry Cakes", path: "/" },
            { id: 47, label: "Red Velvet Cakes", path: "/" },
            { id: 48, label: "Blueberry Cakes", path: "/" },
            { id: 49, label: "Fruit Cakes", path: "/" },
            { id: 411, label: "Cheese Cakes", path: "/" },
            { id: 412, label: "Indian Fusion Cakes", path: "/" },
            { id: 413, label: "Mango Cakes", path: "/" },
            { id: 414, label: "Coffee Mocha Cakes", path: "/" },
            { id: 415, label: "Dry Fruit Cakes", path: "/" },

        ]
    },
    {
        id:5,label:"Desserts",path:"desserts",
        subItems:[
            {id:51,label:"Pastries",path: "/"},
            {id:52,label:"Puddings",path: "/"},
            {id:53,label:"Jar Cakes",path: "/"},
            {id:54,label:"Tea Cakes",path: "/"}
        ]
    },
    {
        id:6,label:"Designer Cake",path:"designerCakes",
        subItems: [
            {id:61,label:"All Designer Cakes",path: "/"},
            {id:62,label:"Pinata Cakes",path: "/"},
            {id:63,label:"Mini Designer Cakes",path: "/"},
            {id:64,label:"Pull Me Cakes",path: "/"},
            {id:65,label:"Minion Cakes",path: "/"},
            {id:66,label:"Baby Shower Cakes",path: "/"},
            {id:67,label:"Jungle Theme Cakes",path: "/"},
            {id:68,label:"Princess Theme Cakes",path: "/"},
            {id:69,label:"Tier Theme Cakes",path: "/"},
            {id:611,label:"Cartoon Theme Cakes",path: "/",
                childItems:[                    
                    {id:"611a",label:"Spiderman Cakes",path: "/"},
                    {id:"611b",label:"Chot Bheem Cake",path: "/"},
                    {id:"611c",label:"Mickey Mouse Cakes",path: "/"},
                    {id:"611d",label:"Cartoon Character Cake",path: "/"}
                    ]
                },
            {id:612,label:"Barbie Theme Cakes",path: "/"},
            {id:613,label:"PUBG Theme Cakes",path: "/"},
            {id:614,label:"Number Theme Cakes",path: "/"},
            {id:615,label:"Rainbow Theme Cakes",path: "/"},
            {id:616,label:"Cricket Theme Cakes",path: "/"},
            {id:617,label:"Super Hero Cakes",path: "/"},
            {id:618,label:"Miniature Cakes",path: "/"},
            {id:619,label:"Car Cakes",path: "/"},
            {id:6111,label:"Alphabet Cakes",path: "/"},

        ]
    },
    {
        id:7,label:"Anniversary",path:"anniversaryCakes",
        subItems:[
            {id:71,label:"1st Anniversary Cake",path: "/"},
            {id:72,label:"25th Anniversary Cake",path: "/"},
            {id:73,label:"50th Anniversary Cake",path: "/"},
            {id:74,label:"Heart Shape Cake",path: "/"},
            {id:75,label:"Parents Anniversary Cake",path: "/"},
            {id:76,label:"Couple Anniversary Cake",path: "/"},
            {id:77,label:"All Anniversary Cake",path: "/"}
        ]
    },
    {
        id:8,label:"Birthday",path:"birthdayCakes",
        subItems:[
            {id:81,label:"1st Birthday Cake",path: "/"},
            {id:82,label:"Cakes for Her",path: "/"},
            {id:83,label:"Cakes for Kids",path: "/"},
            {id:84,label:"Cakes for Him",path: "/"},
            {id:85,label:"Birthday Photo Cakes",path: "/"},
            {id:86,label:"Bomb Cake Collection",path: "/"},
            {id:87,label:"Half Cakes",path: "/"}
        ]
    },
    {
        id:9,label:"Props",path:"props",
        subItems: [
            {id:91,label:"Gifting",path: "/"},
            {id:92,label:"Candles & Toppers",path: "/"},
            {id:93,label:"Caps",path: "/"},
            {id:94,label:"Soft Toys",path: "/"},
            {id:95,label:"Action Figures",path: "/"},
            {id:96,label:"Flowers",path: "/"},
            {id:97,label:"Balloons & Banners",path: "/"},
            {id:98,label:"Goggles",path: "/"},
            {id:99,label:"Fun Props",path: "/"},
            {id:911,label:"All Party Props",path: "/"},
        ]
    },
    {
        id:10,label:"Corportate Cakes",path: "/corporateCakes"
    }

]

export default NavBarItems