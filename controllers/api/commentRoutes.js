const router = require('express').Router();
const { Commentary } = require('../../models');
const authIn = require('../../utils/auth');

router.post('/send', authIn, async (req, res) => {
    try {
        const commentData = await Commentary.create({
            content: req.body.content,
            user_id: req.session.user_id,
            blog_id: req.body.blogId,
        });

        await req.session.save();

        req.session.user_id = commentData.user_id;
        req.session.logged_in = true;
        req.session.blogId = commentData.blog_id;

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
