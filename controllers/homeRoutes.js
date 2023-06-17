const router = require('express').Router();
const { Blog, User } = require('../models');
const authIn = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogs = blogData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
            ],
        });

        const blogs = blogData.get({ plain: true });
        const logged_in = req.session.logged_in || false;
        const isAuthor = req.session.user_id === blogs.user.id

        res.render('blog', {
            ...blogs,
            logged_in,
            isAuthor
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id/comments', async (req, res) => {
    try {
        const blogId = req.params.id;

        // Retrieve the blog by its ID
        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            // Handle the case where the blog is not found
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Retrieve the comments associated with the blog
        const comments = await blog.getComments();

        // Respond with the comments
        return res.json(comments);
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/dashboard', authIn, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            //TODO: Does this need to include layout: 'main', here?
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
