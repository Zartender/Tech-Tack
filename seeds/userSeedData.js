const { User } = require('../models');

const userData = [
    {
        username: "alpha",
        twitter: "alphaOne",
        github: "alphaDAWG",
        email: "alpha.dawg@gmail.com",
        password: "bravo44321!"
    },
    {
        username: "professorSnape",
        twitter: "theREALPROFsnape",
        github: "SurpentMAn",
        email: "snapstergmail.com",
        password: "kingOFSurpents342"
    },
    {
        username: "TSwifty",
        twitter: "QueenSwift",
        github: "TaySwiftFan29",
        email: "TSwift@gmail.com",
        password: "JakeGuillenhall"
    },
    
]


const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;