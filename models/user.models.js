const crypto = require('crypto');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    profilePhoto: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: [{
            height: {
                type: Number
            },
            weight: {
                type: Number
            },
            muscularMass: {
                type: Number
            },
            bodyFat: {
                type: Number
            },
            cholesterol: {
                type: Number
            },
            bloodGlucose: {
                type: Number
            },
            bloodPressure: {
                type: Number
            }
        }]
    },
    roles: {
        type: [String],
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    tokens: {
        type: [String],
        required: true,
        trim: true
    },
}, { timestamps: true });

userSchema.methods = {
    getAge: function (dateBirth) {
        const actualDate = new Date();
        const date = new Date(dateBirth);
        const year = actualDate.getFullYear() - date.getFullYear();
        const month = actualDate.getMonth() - date.getMonth();

        if (month >= 0) {
            return year;
        } else {
            return year - 1;
        }
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString('hex');
    },
    encryptPassword: function (password) {
        if(!password){
            return "";
        }else{
            try {
                const _password = crypto.pbkdf2Sync(
                    password,
                    this.salt,
                    1000,
                    64,
                    `sha512`
                ).toString('hex');

                return _password;
            } catch (error) {
                console.error(error);
            }
        }
    },
    comparePassword: function (password) {
        return this.hashedPassword === this.encryptPassword(password);
    }
}

userSchema.virtual('dateBirth').set(function (dateBirth) {
    this.age = this.getAge(dateBirth);
});

userSchema.virtual('password').set(function (password) {
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})

module.exports = mongoose.model('user', userSchema);