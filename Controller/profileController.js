const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const updateProfile = async (req, res) => {
    const token = req.cookies.alphacare247;
    const verifytoken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: verifytoken._id, "tokens.token": token })

    if (user) {
        user.name = req.body.updatedname || user.name;
        user.email = req.body.updatedemail || user.email;
        user.phone = req.body.updatedphone || user.phone;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,

        })
    } else {
        res.status(404)
        throw new Error("User not found");


    }
}

module.exports = updateProfile;