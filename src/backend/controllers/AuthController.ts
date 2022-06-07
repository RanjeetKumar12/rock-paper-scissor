import prisma from '../prisma/prisma';
import { Request, Response } from 'express';
const { jwt } = require('jsonwebtoken');
import { compareSync, hashSync } from 'bcryptjs';
import 'dotenv/config';
import { createAccessToken, createRefreshToken } from '../utils/authUtils';

const singInUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Wrong Email Address"
            })
        }
        const valid = compareSync(password, user.password);
        if (valid) {
            res.cookie("Atoken", createAccessToken(user.userId), { httpOnly: true, maxAge: 60 * 60 * 15 })
            res.cookie("Rtoken", createRefreshToken(user.userId), { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
            res.status(200).json({
                success: true,
                user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unknown Error! try again"
        })

    }

}

const signUpUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password, firstName, lastName } = req.body;
        const data = {
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: hashSync(password, 10),
            firstName,
            lastName
        };
        const oldUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (oldUser) {
            res.send(409).json({
                success: false,
                message: "User already exists"
            })
        }

        await prisma.user.create({ data })
    }
    catch (error) {

    }

}

const signOutUser = async (req: Request, res: Response) => {
    res.cookie("Atoken", "", { httpOnly: true, maxAge: 60 });
    res.cookie("Rtoken", "", { httpOnly: true, maxAge: 60 });

}

export { singInUser, signUpUser, signOutUser }