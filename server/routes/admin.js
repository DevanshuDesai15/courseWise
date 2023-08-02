/* eslint-disable no-undef */
const express = require('express');
const jwt = require("jsonwebtoken");
const {Admin, Course} = require("../db");
const {secretKey1} = require("../middleware/adminAuth");
const { authenticateAdmin } = require("../middleware/adminAuth");
const router = express.Router();

router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const {username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if(admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, secretKey1, {expiresIn: '1hr'});
      res.json({ message: 'Admin created successfully.', token});
    }
  });
  
router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, secretKey1, {expiresIn: '1hr'});
      res.json({ message: 'Logged In successfully.', token});
    } else {
      res.status(403).json({ message: 'Admin authentication failed' });
    }
  });
  
router.post('/courses', authenticateAdmin, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully.', courseId: course.id });
  });
  
router.put('/courses/:courseId', authenticateAdmin, async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if (course) {
      res.json({ message: 'Course updated successfully.' });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });

router.get('/courses/:courseId', authenticateAdmin, async (req, res) => {
    // logic to get a course from it's id
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (course) {
      res.json({ course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });
  
router.get('/courses', authenticateAdmin, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({}); // empty curly braces because to show all courses we can add conditions in them to get specific data
    res.json({ courses });
  });

router.get('/profile', authenticateAdmin, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username});
    res.json({
      username: admin.username
    })
  })

module.exports = router;