import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res) => {
    const {username, email, password, profile_pic} = req.body;
    
    if(!username || !email || !password || username === '' || password === '' || email === ''){
        res.status(400).json("All fields are required");
    }

    const validUser = await userModel.findOne({email});

    if(validUser){
        return res.status(403).json("User with this email already exist");
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new userModel({
        username,
        email,
        password: hashedPass,
        profile_pic
    })

    try {   
        await newUser.save();
        res.json("Signup Successfull")
    } catch (error) {
        console.log(error);
    }

}

export const checkEmail = async (req, res) => {
    try {
        const {email} = req.body;
        const checkmail = await userModel.findOne({email}).select('-password')
        if(!checkmail){
            return res.status(400).json('User not exist');
        }

        return res.status(200).json(checkmail);
    } catch (error) {
        console.log(error.message);
    }
}

export const checkPassword = async (req, res) => {
    try {
        const {password, userId} = req.body;
        const user = await userModel.findById(userId);
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json("Password is wrong");
        }

        const token = jwt.sign(
            {id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn : "1d"}
        )


        res.cookie('access_token', token, {httpOnly: true}).status(200).json(token)
    } catch (error) {
        console.log(error.message);
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json("User has been signed out");
    } catch (error) {
        console.log(error);
    }
}
