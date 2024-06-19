const userModel = require('../models/user.models');

const userControllers = {};

userControllers.register = async(req, res, next) => {
    try {
        const { name, email, password, gender, dateBirth } = req.body;

        //Verify there is no other user
        let _user = await userModel.findOne({ email: email });
        if(_user){
            return res.status(409).json({ error: 'The user already exists' });
        }

        //if doesn't exist -> create one
        _user = new userModel({
            name: name,
            email: email,
            password: password,
            gender: gender,
            dateBirth: dateBirth
        })

        const savedUser = _user.save();
        if(!savedUser){
            return res.status(409).json({ error: "An error ocurred" });
        }else{
            return res.status(200).json({ message: "User created" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

userControllers.login = async(req, res, next) => {
    try {
        
        const { email, password } = req.body;

        //1. Verify user exists
        const _user = await userModel.findOne({ email: email });
        if(!_user){
            return res.status(404).json({ error: 'No coincidences' });
        }

        //2. Verify password
        if(!_user.comparePassword(password)){
            return res.status(401).json({ error: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'Logged in' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

userControllers.update = async(req, res, next) => {
    
}

module.exports = userControllers;