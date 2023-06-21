const router = require('express').Router();
const { Commentary } = require('../../models');
const authIn = require('../../utils/auth');

router.post('/commentary', authIn, async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
      const commentData = await Commentary.create(req.body);
        console.log("COMMENTDATA:", commentData);
      req.session.save(() => {
        req.session.user_id = commentData.user_id;
        req.session.logged_in = true;
        req.session.blogId = commentData.blog_id;
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;