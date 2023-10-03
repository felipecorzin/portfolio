const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'assets/img/avatar.png'
    },
    created: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    }
});

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

UserSchema.pre('save', function( next ) {
    this.created = new Date();
    next();
});

module.exports = model('User', UserSchema );