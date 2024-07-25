import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';

export const userDetails = async (req, res) => {
    try {
        const token = req.cookies.access_token || '';
        if(!token){
            return res.status(401).json({
                message : "session out",
                logout : true,
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id).select('-password');

        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const token = req.cookies.access_token || '';
        if(!token){
            return res.status(401).json({
                message : "session out",
                logout : true,
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id).select('-password');

        const {username, profile_pic} = req.body;
        const updateUser = await userModel.updateOne({_id: user._id}, {
            username,
            profile_pic
        })

        const updatedUser = await userModel.findById(user._id);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message);
    }
}