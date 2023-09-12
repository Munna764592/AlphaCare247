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
        if (req.body.patientname != undefined) {
            user.patients = [...user.patients
                , {
                patientname: req.body.patientname,
                patientMno: req.body.patientMno,
                patientage: req.body.patientage,
                patientrelation: req.body.patientrelation,
                gender: req.body.gender,
            }];
        }
        if (req.body.fbsaddress != undefined) {
            user.patientsaddress = [...user.patientsaddress, {
                fbsaddress: req.body.fbsaddress,
                city: req.body.city,
                pincode: req.body.pincode,
                locality: req.body.locality,
                state: req.body.state,
                addresstype: req.body.addresstype,
                landmark: req.body.landmark
            }]
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            patients: [
                {
                    patientname: updatedUser.patientname,
                    patientMno: updatedUser.patientMno,
                    patientage: updatedUser.patientage,
                    patientrelation: updatedUser.patientrelation,
                    gender: updatedUser.gender
                }
            ],
            patientsaddress: [
                {
                    fbsaddress: updatedUser.fbsaddress,
                    city: updatedUser.city,
                    pincode: updatedUser.pincode,
                    locality: updatedUser.locality,
                    state: updatedUser.state,
                    addresstype: updatedUser.addresstype,
                    landmark: updatedUser.landmark
                }
            ]
        })
    } else {
        res.status(404)
        throw new Error("User not found");
    }
}

module.exports = updateProfile;