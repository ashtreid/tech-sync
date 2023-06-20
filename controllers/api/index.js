const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const articleRoutes = require('./articleRoutes')

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/blog', articleRoutes);

module.exports = router;