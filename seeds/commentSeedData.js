
   
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_copy: "Great Work."
    },
    // {
    //     user_id: 4,
    //     post_id: 3,
    //     comment_copy: "Better than I thought."
    // },
    // {
    //     user_id: 1,
    //     post_id: 4,
    //     comment_copy: "Can't wait to see what's to come."
    // }
]

const seedDataForComments = () => Comment.bulkCreate(commentData);

module.exports = seedDataForComments;