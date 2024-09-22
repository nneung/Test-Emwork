const e = require('express');
var express = require('express');
var { v4: uuidv4 } = require('uuid');
var router = express.Router();
var users = require('../models/UserModel');
var moment = require('moment');
var tz = require('moment-timezone');
var dateFormat = require('dateformat');
const { default: axios } = require('axios');
var fs = require('fs');

router.get('/', async function (req, res, next) {
    try {
        let data = await users.find({});

        res.status(200).json({ staus: 'success', message: 'Get User Success', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Get User Failed' });
    }
});

router.post('/', async function (req, res, next) {
    try {
        if (Object.keys(req.body).includes(['first_name', 'last_name'])) {
            return res.status(400).json({ staus: 'success', message: 'Invalid User Input' });
        }
        let body = req.body;

        let userInfo = {
            user_id: uuidv4(),
            first_name: body.first_name,
            last_name: body.last_name,
            license_status: null,
        };

        // insert data
        let process = new users(userInfo);
        await process.save();

        res.status(200).json({ staus: 'success', message: 'Create User Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Create User Failed' });
    }
});

router.put('/', async function (req, res, next) {
    try {
        if (Object.keys(req.body).includes(['user_id', 'first_name', 'last_name'])) {
            return res.status(400).json({ staus: 'success', message: 'Invalid User Input' });
        }
        let body = req.body;

        let data = await users.findOneAndUpdate({
            user_id: body.user_id,
            $set: req.body,
            returnNewDocument: true
        });

        res.status(200).json({ staus: 'success', message: 'Update User Success', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Update User Failed' });
    }
});

router.delete('/', async function (req, res, next) {
    try {
        if (Object.keys(req.body).includes(['user_id'])) {
            return res.status(400).json({ staus: 'success', message: 'Invalid User Input' });
        }
        let body = req.body;

        let data = await users.findOneAndDelete([...body.user_id]);

        res.status(200).json({ staus: 'success', message: 'Delete User Success', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Delete User Failed' });
    }
});

module.exports = router;
