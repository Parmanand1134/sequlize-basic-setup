const { User } = require('../models');

exports.updateProfile = async (req, res) => {
    const { userId } = req.user; // Assume `user` is set by authMiddleware
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username;
        user.email = email;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
