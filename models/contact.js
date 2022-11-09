const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    query:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
const Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;