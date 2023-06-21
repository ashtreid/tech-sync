const router = require('express').Router();
const { Blog } = require('../../models');
const authIn = require('../../utils/auth');

router.put('/update/:id', authIn, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {...req.body}, // Fields to update
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Blog updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', authIn, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;