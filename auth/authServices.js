import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwt.js";


export const getUserFromEmail = async (email) => {
    try {
        const result = await User.findOne({ where: { email }, raw: true });
        return result;
    } catch (e) {
        throw e;
    }
};

export const signUpUserService = async(data)=>{
    try {
        const result = await User.create(data);
        return result;
    } catch (e) {
        throw e;
    }
}

export const loginService = async(data,userData)=>{
    
        const isPasswordValid = await bcrypt.compare(data.password, userData.password);
        delete userData.password;
        if (!isPasswordValid) {
            throw new Error("Invalid Email Or Password");
        }
        const token = generateToken(userData);
        return {...userData,token};
 
}




