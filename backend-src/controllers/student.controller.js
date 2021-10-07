const express = require('express');
const Student = require('../models/student.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;

        let per_page = Number(req.query.limit) || 10;

        let offset = (page - 1) * per_page;

        const students = await Student.find().skip(offset).limit(per_page).lean().exec();

        const totalStudents = await Student.find().countDocuments();
        const totalPages = Math.ceil(totalStudents / per_page);

        return res.status(200).json({ students, totalPages });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);

        return res.status(200).json({ student });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ student });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        return res.status(200).json({ status: "success" });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.post('/filter', async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let per_page = Number(req.query.limit) || 10;
        let offset = (page - 1) * per_page;

        let payload = req.body;
        let students;
        if (payload.sort !== undefined) {
            students = await Student.find(req.body).skip(offset).limit(per_page).sort({ age: payload.sort }).lean().exec();
        }
        else {
            students = await Student.find(req.body).skip(offset).limit(per_page).lean().exec();
        }

        const totalStudents = await Student.find(req.body).countDocuments();
        const totalPages = Math.ceil(totalStudents / per_page);

        return res.status(200).json({ students, totalPages });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        return res.status(200).json({ student });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

module.exports = router;