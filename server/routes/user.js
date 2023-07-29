/* eslint-disable no-undef */
const express = require('express');
const jwt = require("jsonwebtoken");
const {User, Course} = require("../db");
const {secretKey2} = require("../middleware/userAuth");
const { authenticateUser } = require("../middleware/userAuth");
const router = express.Router();


router.post('/signup', async (req, res) => {
    // logic to sign up user
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    if(user) {
      res.status(403).json({ message: 'User already exists.' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user'}, secretKey2, { expiresIn: '1hr' });
      res.json({ message: 'User created successfully.', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in user
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user'}, secretKey2, {expiresIn: '1hr'});
      res.json({ message: 'Logged In Successfully.', token });
    } else {
      res.status(403).json({ message: 'Invalid Username and Password'});
    }
  });
  
  router.get('/courses', authenticateUser, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true });
    res.json({ courses });
  });
  
  router.post('/courses/:courseId', authenticateUser, async (req, res) => {
    // logic to purchase a course
     const course = await Course.findById(req.params.courseId);
     if(course){
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully.' });
      } else {
        res.status(403).json({ message: "User not found" });
      }
     } else {
      res.status(404).json({ message: "Course not found" });
     }
  });
  
  router.get('/purchasedCourses', authenticateUser, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({ username: req.user.username}).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found'})
    }
  });

module.exports = router;