const { Post } = require('../models');

const postData = [
    {
        title: "Tech-Tac Version Release Period",
        post_content: "Test",
        user_id: 1
    }
]


















const postSeed = () => Post.bulkCreate(postData);

module.exports = postSeed;