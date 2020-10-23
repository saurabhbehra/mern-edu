const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: [3, 'Too short name'],
    },
    phone: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                let re = /^\d{10}$/;
                return (v == null || v.trim().length < 1) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        }
    },
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
        type: String,
        required: true,
        min: [3, 'Too short password'],
    },
    state:{type:String,required:true},
    address:{type:String,required:true}
    

}, {timestamps: true}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);