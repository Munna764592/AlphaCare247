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
    ],
    patients: [
        {
            patientname: {
                type: String,
            },
            patientMno: {
                type: String
            },
            patientage: {
                type: String,
            },
            patientrelation: {
                type: String
            },
            gender: {
                type: String
            }
        }
    ],
    patientsaddress: [
        {
            fbsaddress: {
                type: String,
            },
            city: {
                type: String
            },
            pincode: {
                type: String
            },
            locality: {
                type: String
            },
            state: {
                type: String
            },
            addresstype: {
                type: String
            },
            landmark: {
                type: String
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