const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema({
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
    feedback: {
        type: String
    }

})

const Feedback = mongoose.model('FEEDBACK', feedbackSchema);
module.exports = Feedback;