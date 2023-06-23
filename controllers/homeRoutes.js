const router = require('express').Router();
const { Blog, User, Commentary } = require('../models');
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
                {
                    model: Commentary,
                    attributes: ['id', 'content', 'date_created'],
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        const logged_in = req.session.logged_in || false;
        const isAuthor = req.session.user_id === blog.user.id;
        const comments = blog.commentaries;
        // const editMode = req.query.editMode === 'true';
        // console.log("EDIT_MODE", editMode);
        // console.log("isEDITING", isEditing);

        res.render('blog', {
            ...blog,
            logged_in,
            isAuthor,
            // editMode,
            comments,
        });
    } catch (err) {
        res.status(500).json(err);
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
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create-article', authIn, async (req, res) => {
    try {
        res.render('article', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/update/:id', authIn, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        const logged_in = req.session.logged_in || false;
        const isAuthor = req.session.user_id === blog.user.id;

        res.render('edit-blog', {
            ...blog,
            logged_in,
            isAuthor,
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

router.get('/signup', (req, res) => {
    try{
        res.render('signup', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;
