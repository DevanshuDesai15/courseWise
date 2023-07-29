const mongoose = require('mongoose');

// Mongoose Schemas
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
  });
  
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });
  
  // Mongoose Model
  const Admin = mongoose.model('Admin', adminSchema);
  const User = mongoose.model('User', userSchema);
  const Course = mongoose.model('Course', courseSchema);

  module.exports = {
    Admin,
    User,
    Course
  }