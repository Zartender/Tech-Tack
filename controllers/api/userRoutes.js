// Require statements
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Routes for /user

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userDataDB => res.json(userDataDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
// post route for user/1
router.post('/', (req, res) => {
  console.log("Creating a new user ", req.body); 
    User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      twitter: req.body.twitter,
      github: req.body.github
    })
    .then(userDataDB => {
      console.log("DB responsed ", userDataDB);
      req.session.save(() => {
        req.session.user_id = userDataDB.id;
        req.session.username = userDataDB.user_name;
        req.session.twitter = userDataDB.twitter;
        req.session.github = userDataDB.github;
        req.session.loggedIn = true;
    
        res.json(userDataDB);
      });
    });
  });

//   routes for /user/1

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
      .then(userDataDB => {
        if (!userDataDB) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userDataDB);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// put route for user/1
  router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(userDataDB => {
        if (!userDataDB[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userDataDB);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// destroy/delete route for user/1
  router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(userDataDB => {
        if (!userDataDB) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userDataDB);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/login', (req, res) => {
    console.log("Finding a record in the DB", req.body); 
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(userDataDB => {
      if (!userDataDB) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = userDataDB.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = userDataDB.id;
        req.session.username = userDataDB.username;
        req.session.twitter = userDataDB.twitter;
        req.session.github = userDataDB.github;
        req.session.loggedIn = true;
  
        res.json({ user: userDataDB, message: 'You are now logged in!' });
      });
    });
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

module.exports = router;