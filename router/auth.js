const express = require('express');
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const updateProfile = require("../Controller/profileController");
const mongoose = require("mongoose");
const multer = require("multer");
// const path = require('path')
// const bodyParser = require("body-parser")


require('../db/conn')
const User = require('../model/userSchema')
const Feedback = require('../model/feedbackSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from router server`);
})
// Upload Prescription  
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/components/Data_file/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({
    storage: Storage
})

router.post('/uploadprescription', upload.single('prescription'), async (req, res) => {
    let { phone } = req.body;
    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }
    const userExist = await User.findOne({ phone: phone });

    if (userExist) {
        await User.updateOne({ phone: phone }, {
            $set: {
                prescription: req.file.filename
            }
        });
        res.status(201).json({ message: "successfully uploaded" })
    } else {
        console.log("user not exist")
    }

})
// Feedback form 
router.post('/feedback', async (req, res) => {
    let { name, email, phone, feedback } = req.body;

    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }

    try {
        let user = new Feedback({
            name: name,
            email: email,
            phone: phone,
            feedback: feedback
        })
        await user.save();
        res.status(201).json({ message: "feedback sent" })
    } catch (err) {
        console.log(err);
    }
})

//  registration with otp  
router.post('/register', async (req, res) => {
    let { phone } = req.body;

    sendno(phone);
    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }
    try {
        const userExist = await User.findOne({ phone: phone });
        let min = 1111;
        let max = 9999;
        let step1 = max - min + 1
        let otpcode = Math.floor((Math.random() * step1) + min);

        if (userExist) {
            await User.updateOne({ phone: phone }, {
                $set: {
                    otp: otpcode
                }
            });

        } else {

            let user = new User({
                phone: phone,
                otp: otpcode
            })
            await user.save();
        }
        res.status(201).json({ message: "user registration successfull" })
    } catch (err) {
        console.log(err)
    }
})

// login route 

function sendno(phone) {
    router.post('/otpverify', async (req, res) => {
        try {
            const { otpver } = req.body;
            if (!otpver) {
                res.send("0");
            }
            const otpverify = await User.findOne({ phone: phone })
            // const isMatch = await User.compare(otpver, otpverify.otp);

            if (otpverify.otp == otpver) {
                let token = await otpverify.generateAuthToken();

                res.cookie("alphacare247", token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                })

                res.json({ message: "otp verify successfull" })

            } else {
                res.send("0");
            }

        } catch (err) {
            console.log(err);
        }
    })
}
// Update profile otp verification 
router.post('/UsentOtp', async (req, res) => {
    let { phone, phonenew } = req.body;
    sendotpno(phone);
    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }
    try {
        const userExist = await User.findOne({ phone: phone });
        if (userExist) {
            let min = 1111;
            let max = 9999;
            let step1 = max - min + 1
            let otpcode = Math.floor((Math.random() * step1) + min);
            await User.updateOne({ phone: phone }, {
                $set: {
                    otp: otpcode
                }
            });
            res.status(201).json({ message: "otp sent" })
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/UsentOtpte', async (req, res) => {
    let { phone, emailnew } = req.body;
    sendotpno(phone);
    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }
    try {
        const userExist = await User.findOne({ phone: phone });
        if (userExist) {
            let min = 1111;
            let max = 9999;
            let step1 = max - min + 1
            let otpcode = Math.floor((Math.random() * step1) + min);
            await User.updateOne({ phone: phone }, {
                $set: {
                    otp: otpcode
                }
            });
            res.status(201).json({ message: "otp sent" })
        }
    } catch (err) {
        console.log(err);
    }
})
function sendotpno(phone) {
    router.post('/otpverifyU', async (req, res) => {
        try {
            const { otpver } = req.body;
            if (!otpver) {
                res.send("0");
            }
            const otpverify = await User.findOne({ phone: phone })
            if (otpverify.otp == otpver) {
                res.json({ message: "otp verify successfull" })

            } else {
                res.send("0");
            }

        } catch (err) {
            console.log(err);
        }
    })
}
// subscribe email 
const subMailschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})
const subMail = mongoose.model('SUBCRIPTIONEMAIL', subMailschema);
router.post("/subemail", async (req, res) => {
    let { email } = req.body;
    if (!email) {
        return res.status(422).json({ error: "fill the data" })
    }

    try {
        let subemail = new subMail({
            email: email
        })
        await subemail.save();
        res.status(201).json({ message: "subscription done" })
    } catch (err) {
        console.log(err)
    }

})
// blog comment 
const commentSchema = new mongoose.Schema({
    comments: {
        type: String
    },
    blogname: {
        type: String
    }
})
const Comments = mongoose.model('BLOGCOMMENT', commentSchema);
router.post("/blogComment", async (req, res) => {
    let { comment, blogHeading } = req.body;

    try {
        let BlogComment = new Comments({
            comments: comment,
            blogname: blogHeading
        })
        await BlogComment.save();
        res.status(201).json({ message: "comment received" })
    } catch (err) {
        console.log(err);
    }
})
// callback
const Callbackschema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    }
})
const Callback = mongoose.model('CALLBACK', Callbackschema);
router.post("/callback", async (req, res) => {
    let { phone } = req.body;
    if (!phone) {
        return res.status(422).json({ error: "fill the data" })
    }

    try {
        let callback = new Callback({
            phone: phone
        })
        await callback.save();
        res.status(201).json({ message: "callback received" })
    } catch (err) {
        console.log(err)
    }

})
// get blog  
const blogschema = new mongoose.Schema({
    Heading: {
        type: String
    }
})
const Blogdata = mongoose.model('BLOGDATA', blogschema);
router.get("/blogdata", async (req, res) => {
    const blogdata = await Blogdata.find({});
    res.send(blogdata);
})

// get lab data
const pSchema = new mongoose.Schema({
    Pincodes: {
        type: String
    }
})
const PinCode = mongoose.model('PINCODE', pSchema);
router.get('/pincodes', async (req, res) => {
    const pincode = await PinCode.find({});
    res.send(pincode);
})
const rschema = new mongoose.Schema({
    TEST_NAME: {
        type: String
    },
})
const Labdatas = mongoose.model('LABDATA', rschema);
router.get("/labdata", async (req, res) => {
    const labdata = await Labdatas.find({});
    res.send(labdata);
})
const mostbookedpathology = new mongoose.Schema({
    category: {
        type: String
    },
})
const Mostbookedpathology = mongoose.model('mostbookedpathology', mostbookedpathology);
router.get("/mostbookedpathology", async (req, res) => {
    const labdata = await Mostbookedpathology.find({});
    res.send(labdata);
})
const mostbookedradiology = new mongoose.Schema({
    category: {
        type: String
    },
})
const Mostbookedradiology = mongoose.model('mostbookedradiology', mostbookedradiology);
router.get("/mostbookedradiology", async (req, res) => {
    const labdata = await Mostbookedradiology.find({});
    res.send(labdata);
})
const faqradiology = new mongoose.Schema({
    category: {
        type: String
    },
})
const Faqradiology = mongoose.model('faqradiology', faqradiology);
router.get("/faqradiology", async (req, res) => {
    const labdata = await Faqradiology.find({});
    res.send(labdata);
})
const faqpathology = new mongoose.Schema({
    category: {
        type: String
    },
})
const Faqpathology = mongoose.model('faqpathology', faqpathology);
router.get("/faqpathology", async (req, res) => {
    const labdata = await Faqpathology.find({});
    res.send(labdata);
})
const faqsamplequestion = new mongoose.Schema({
    category: {
        type: String
    },
})
const Faqsamplequestion = mongoose.model('faqsamplequestion', faqsamplequestion);
router.get("/faqsamplequestion", async (req, res) => {
    const labdata = await Faqsamplequestion.find({});
    res.send(labdata);
})
// update profile  
router.route('/updateProfile').post(Authenticate, updateProfile);

// add new patient  
router.route('/addPatient').post(Authenticate, updateProfile);

// add new address  
router.route('/addAddress').post(Authenticate, updateProfile);

// authentication data 
router.get("/loginUser", Authenticate, (req, res) => {
    res.send(req.rootUser);
});

// logout api 
router.get("/logout", (req, res) => {
    res.clearCookie('alphacare247', { path: '/' });
    res.status(200).send("User logout")
})



module.exports = router;

