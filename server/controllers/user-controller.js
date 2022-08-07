import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/user.js';

export const signin = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        const existingUser = await User.findOne({ UserName });

        if(!existingUser) return res.status(404).json({ message: `User doesn't exist.`});

        const isPasswordCorrect = await bcrypt.compare( Password, existingUser.Password );

        if(!isPasswordCorrect) return res.status(400).json({ message: `Invalid credentials.`});

        const token = jwt.sign({ EmailId: existingUser.EmailId, id: existingUser._id }, 'test' , { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json('something went wrong');
    }
}

export const signup = async (req, res) => {
    const { EmailId, Password, confirmPassword, UserName } = req.body;

    try {
        const existingUser = await User.findOne({ EmailId });

        if(existingUser) return res.status(400).json({ message: `User already exist.`});

        if(Password !== confirmPassword ) return res.status(400).json({ message: `Passwords don't match.`});

        const hashedPassword = await bcrypt.hash(Password, 12);

        const result = await User.create({ EmailId, Password:hashedPassword, UserName });

        const token = jwt.sign({ EmailId: result.EmailId, id: result._id }, 'test' , { expiresIn: "1h"});

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json('something went wrong');
        
    }

}