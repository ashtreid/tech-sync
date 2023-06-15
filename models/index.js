const User = require('./User');
const Blog = require('./Blog');
const Commentary = require('./Commentary');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Commentary, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Commentary, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

Commentary.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

Commentary.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog, Commentary };
