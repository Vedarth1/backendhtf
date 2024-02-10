const User = require('../models/userschema');

exports.classes = async (req, res) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(404).json({ error: 'error' });
        }

        const x = await User.findById(user.id);
        console.log(x);
        return res.status(200).json({
            classes: x.classes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
