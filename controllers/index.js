const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const apiRoute = require('./api');
const dashboardRoutes = require('./dashboardRoutes');

router.use('api', apiRoute);
router.use('/', homeRoutes);
router.use('dashboard', dashboardRoutes);




module.exports = router;
