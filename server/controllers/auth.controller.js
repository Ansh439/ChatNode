import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password || username === '' || password === '' || email === ''){
        res.status(400).json("All fields are required");
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new userModel({
        username,
        email,
        password: hashedPass
    })

    try {   
        await newUser.save();
        res.json("Signup Successfull")
    } catch (error) {
        console.log(error);
    }

}

export const signin = async(req, res) => {
    const {email , password} = req.body;
    
    if(!email || !password || email === '' || password === ''){
        res.status(401).json("All fields are required");
    }

    try{
        const validUser = await userModel.findOne({email});
        if(!validUser){
            return res.status(401).json("No user found")
        }
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(401).json("Password is not matching")
        }

        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET
        )

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie("access_token", token, {
            httpOnly: true
        }).json(rest);
    }
    catch(err) {
        console.log(error);
    }
}