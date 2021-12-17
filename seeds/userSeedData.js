const { User } = require('../models');

const userData = [
    {
        id: 1, 
        user_name: "alpha",
        twitter: "alphaOne",
        github: "alphaDAWG",
        email: "alpha.dawg@gmail.com",
        password: "bravo44321!"
    },
    {   id: 2, 
        user_name: "professorSnape",
        twitter: "theREALPROFsnape",
        github: "SurpentMAn",
        email: "snapstergmail.com",
        password: "kingOFSurpents342"
    },
    {
        id:3, 
        user_name: "TSwifty",
        twitter: "QueenSwift",
        github: "TaySwiftFan29",
        email: "TSwift@gmail.com",
        password: "JakeGuillenhall"
    },
    
]


const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;