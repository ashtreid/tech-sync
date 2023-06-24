const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const articleRoutes = require('./articleRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/blog', articleRoutes);
router.use('/commentary', commentRoutes);


module.exports = router;