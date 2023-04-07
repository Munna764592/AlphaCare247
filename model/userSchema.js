const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    prescription: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

})
// jwt token 

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;