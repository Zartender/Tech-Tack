const postSeed = require('./postSeedData');
const userSeed = require('./userSeedData');
const seedDataForComments = require('./commentSeedData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await userSeed();
    console.log('\n----- USERS SEEDED -----\n');
  
  await postSeed();
    console.log('\n----- POSTS SEEDED -----\n');

  await seedDataForComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();