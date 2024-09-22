const e = require('express');
var express = require('express');
var { v4: uuidv4 } = require('uuid');
var router = express.Router();
var users = require('../models/UserModel');
var testResult = require('../models/TestResultModel');
var moment = require('moment');
var tz = require('moment-timezone');
var dateFormat = require('dateformat');
const { default: axios } = require('axios');
var fs = require('fs');

router.get('/', async function (req, res, next) {
    try {
        if (Object.keys(req.body).includes(['user_id'])) {
            return res.status(400).json({ staus: 'success', message: 'Invalid Test Input' });
        }
        let body = req.body;

        let data = await testResult.find({ user_id: body.user_id });

        res.status(200).json({ staus: 'success', message: 'Find Test Success', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Find User Failed' });
    }
});

router.post('/', async function (req, res, next) {
    try {
        if (Object.keys(req.body).includes(['user_id', 'test_name', 'result'])) {
            return res.status(400).json({ staus: 'success', message: 'Invalid Test Input' });
        }
        let body = req.body;
        let testStatus = 'NotPassed';

        if (body.test_name == 'PhysicalTest') {
            testStatus =
                body.result.map((i) => {
                    if (i.status == 'Passed') {
                        return i.status;
                    }
                }).length >= 3
                    ? 'Passed'
                    : 'NotPassed';
            console.log(testStatus);
        }
        if (body.test_name == 'TheoryTest') {
            let Value = 0;
            body.result.forEach(i => Value += i.score);
            console.log(Value)
            testStatus = (Value /150)> 0.8 ? 'Passed': 'NotPassed';
        }
        if (body.test_name == 'PracticalTest') {
            testStatus = body.result;
        }
        // insert data
        let testResultInfo = {
            result_id: uuidv4(),
            ...body,
            status: testStatus,
        };
        let process = new testResult(testResultInfo);
        await process.save();

        let testData = await testResult.find({ user_id: req.body.user_id });
        let checkTest = testData.map((i)=>{
            if (i.status == "Passed"){
                return i
            }
        })
        console.log(checkTest.length)

        await users.findOneAndUpdate({
            user_id: body.user_id,
            $set: {license_status: checkTest.length == 3 ? "License Granted" : "Waiting for Testing"},
        });

        res.status(200).json({ staus: 'success', message: 'Create Test Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ staus: 'fail', message: 'Create Test Failed' });
    }
});

module.exports = router;
