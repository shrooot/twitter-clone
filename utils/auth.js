const dotenv = require('dotenv');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const secret_key = process.env.SECRET_KEY;
const tte = process.env.JWT_EXPIRY

let findUserInDb = async (id) => {
    try {
        const user = await User.findById(id)
        return user.toObject();
    } catch (err) {
        console.log(err)
        return err
    }
}

exports.generateToken = async (content) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.sign(content, secret_key, { expiresIn: tte }, (err, token) => {
                if (err)
                    reject(err)
                else
                    resolve(token)
            })
        })
    } catch (err) {
        return err
    }
}

exports.decodeToken = (token) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret_key, (err, decodedData) => {
                if (err)
                    reject(err)
                else
                    resolve(decodedData)
            })
        })
    } catch (err) {
        return err
    }
}

exports.authenticateJwt = async (req, res, next) => {
    try {
        const token_cookie = req.cookies;
        if (token_cookie.token === undefined)
            throw new Error("Token does not exist")
        else {
            const decodedData = await this.decodeToken(token_cookie.token)
            const userId = decodedData.userId
            const user = await findUserInDb(userId)
            if (user === null || user === undefined)
                throw new Error("User not found")
            else {
                delete user.password;
                req.user = user
            }
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(401).send(`Authentication failed:: ${err.message}`)
    }
}