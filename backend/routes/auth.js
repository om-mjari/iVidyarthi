const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration request received:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create new user with all form data
    const user = new User({
      ...req.body,
      password: hashedPassword,
      isEmailVerified: true // Direct registration without OTP
    });

    await user.save();
    console.log('✅ User saved to database:', user.email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// Login user - Simplified for direct entry
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt for:', email);

    // Find user by email or create new user if not exists
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new user on the fly for direct login
      console.log('👤 Creating new user for:', email);
      user = new User({
        name: email.split('@')[0], // Use email prefix as name
        email: email.toLowerCase(),
        password: password, // Will be hashed by pre-save middleware
        role: 'student',
        isEmailVerified: true
      });
      await user.save();
      console.log('✅ New user created:', user.email);
    }

    console.log('✅ Login successful for:', user.email);

    // Update last login
    try {
      user.lastLogin = new Date();
      await user.save();
    } catch (saveError) {
      console.log('⚠️ Could not update lastLogin, continuing...');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role || 'student' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Return complete user data for profile
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'student',
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      education: user.education,
      address: user.address,
      createdAt: user.createdAt,
      // Profile data for dashboard
      profile: {
        name: user.name || '',
        birthdate: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        courseDetails: user.education?.course || '',
        certificateDetails: user.education?.qualification || '',
        gender: user.gender || '',
        email: user.email
      }
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('enrolledCourses.courseId', 'name thumbnail price');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.toJSON()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const allowedUpdates = [
      'name', 'phone', 'dateOfBirth', 'gender', 'address', 
      'education', 'preferences'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.toJSON()
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
});

// Create test user (for development only)
router.post('/create-test-user', async (req, res) => {
  try {
    // Delete existing test users first (all variations)
    await User.deleteOne({ email: '22bmit501@gmail.com' });
    await User.deleteOne({ email: '22bmiit501@gmail.com' });
    await User.deleteOne({ email: 'jack123@gmail.com' });
    console.log('🗑️ Deleted existing test users if any');

    // Create test user with the current email from your form
    const testUser = new User({
      name: 'Jack',
      email: 'jack123@gmail.com',
      password: '123456789', // This will be hashed by the pre-save middleware
      phone: '9876543210',
      gender: 'male',
      role: 'student',
      isEmailVerified: true
    });

    await testUser.save();
    console.log('✅ Test user created:', testUser.email);
    console.log('🔑 Password hash created:', testUser.password.substring(0, 20) + '...');

    res.json({
      success: true,
      message: 'Test user created successfully',
      data: {
        email: 'jack123@gmail.com',
        password: '123456789',
        note: 'Use these credentials to login'
      }
    });

  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating test user',
      error: error.message
    });
  }
});

// Get all students (Admin only)
router.get('/students', async (req, res) => {
  try {
    // Fetch all users (since role might be undefined or different)
    const allUsers = await User.find({})
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log('📊 Found users in database:', allUsers.length);
    console.log('📋 User roles:', allUsers.map(u => ({ name: u.name, role: u.role || 'undefined' })));

    // Filter for students (role is 'student' or undefined/null - default to student)
    const students = allUsers.filter(user => 
      !user.role || user.role === 'student' || user.role === 'Student'
    );

    console.log('👥 Filtered students:', students.length);

    res.json({
      success: true,
      data: students,
      count: students.length,
      debug: {
        totalUsers: allUsers.length,
        studentCount: students.length
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// Logout (client-side token removal, but we can track it)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
