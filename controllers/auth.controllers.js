const userModel = require('../models/auth.models');
const { create, verify } = require('../tools/jwt.tools');

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

        //Creating token
        const token = await create(_user._id);
        _user.tokens = [token];

        const savedUser = _user.save();
        if(!savedUser){
            return res.status(409).json({ error: "An error ocurred" });
        }else{
            return res.status(200).json(token);
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

        //Creating new token
        const token = await create(_user._id);

        //Store new token
        let _tokens = [..._user.tokens];
        const _verifyPromises = _tokens.map(async (_t) => {
            const status = await verify(_t);

            return status ? _t : null;

        })

        _tokens = (await Promise.all(_verifyPromises)).filter(_t => _t).slice(0,5);
        _tokens = [token, ..._tokens];
        _user.tokens = _tokens;

        await _user.save();

        return res.status(200).json(token);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

userControllers.update = async(req, res, next) => {
   try {
        const { _height, _weight, _muscularMass, _bodyFat, _cholesterol,
        _bloodGlucose, _bloodPressure } = req.body;
        const { user } = req;

        const _date = new Date();
        const date = _date.toLocaleDateString();
        
        //Verify the user exists
        const _user = await userModel.findById(user);
        if(!_user){
            return res.status(404).json({ error: "No coincidences" });
        }
        
        //add values
        _user.data = [{
            height: _height,
            weight:_weight,
            muscularMass: _muscularMass,
            bodyFat: _bodyFat,
            cholesterol: _cholesterol,
            bloodGlucose: _bloodGlucose,
            bloodPressure: _bloodPressure,
            date: date
        }, ..._user.data];

        const savedUser = await _user.save();
        if(!savedUser){
            return res.status(409).json({ error: "An error ocurred" });
        }

        return res.status(200).json({ message: "fields updated" });

   } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
   } 
}

userControllers.getData = async(req, res, next) => {
    try {
        const { user } = req;

        const { data } = await userModel.findById(user);
        if(!data){
            return res.status(409).json({ error: "An error ocurred" });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = userControllers;