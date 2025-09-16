const mongoose = require('mongoose');

// Course Schema
const courseSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [200, 'Course name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  
  // Instructor Information
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'Instructor bio cannot exceed 1000 characters']
    },
    profileImage: {
      type: String // GridFS file ID
    },
    experience: {
      type: Number,
      min: [0, 'Experience cannot be negative']
    },
    expertise: [{
      type: String,
      trim: true
    }]
  },
  
  // Course Details
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: [
      'Programming', 'Web Development', 'Mobile Development', 
      'Data Science', 'Machine Learning', 'AI', 'Database',
      'DevOps', 'Cybersecurity', 'UI/UX Design', 'Other'
    ]
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  language: {
    type: String,
    default: 'English',
    enum: ['English', 'Hindi', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Kannada']
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    percentage: {
      type: Number,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    validUntil: {
      type: Date
    }
  },
  
  // Course Content
  duration: {
    hours: {
      type: Number,
      required: [true, 'Course duration is required'],
      min: [0, 'Duration cannot be negative']
    },
    minutes: {
      type: Number,
      default: 0,
      min: [0, 'Minutes cannot be negative'],
      max: [59, 'Minutes cannot exceed 59']
    }
  },
  
  // Media Files
  thumbnail: {
    type: String, // GridFS file ID
    required: [true, 'Course thumbnail is required']
  },
  previewVideo: {
    type: String // GridFS file ID
  },
  
  // Course Structure
  modules: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      videoId: {
        type: String // GridFS file ID
      },
      duration: {
        type: Number, // in minutes
        required: true
      },
      order: {
        type: Number,
        required: true
      },
      resources: [{
        title: String,
        fileId: String, // GridFS file ID
        type: {
          type: String,
          enum: ['pdf', 'doc', 'image', 'code', 'other']
        }
      }],
      isPreview: {
        type: Boolean,
        default: false
      }
    }]
  }],
  
  // Course Metrics
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  },
  
  // Enrollment
  enrollmentCount: {
    type: Number,
    default: 0,
    min: [0, 'Enrollment count cannot be negative']
  },
  maxEnrollments: {
    type: Number,
    default: null // null means unlimited
  },
  
  // Course Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'suspended'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  
  // Requirements and Outcomes
  prerequisites: [{
    type: String,
    trim: true
  }],
  whatYouWillLearn: [{
    type: String,
    trim: true
  }],
  targetAudience: [{
    type: String,
    trim: true
  }],
  
  // SEO and Marketing
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  
  // Certificate
  certificateTemplate: {
    type: String // GridFS file ID
  },
  certificateEnabled: {
    type: Boolean,
    default: true
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0,
    min: [0, 'Completion rate cannot be negative'],
    max: [100, 'Completion rate cannot exceed 100%']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total duration in minutes
courseSchema.virtual('totalDurationMinutes').get(function() {
  return (this.duration.hours * 60) + this.duration.minutes;
});

// Virtual for formatted duration
courseSchema.virtual('formattedDuration').get(function() {
  const hours = this.duration.hours;
  const minutes = this.duration.minutes;
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
});

// Virtual for discount price
courseSchema.virtual('discountedPrice').get(function() {
  if (!this.discount || !this.discount.percentage) return this.price;
  if (this.discount.validUntil && this.discount.validUntil < new Date()) return this.price;
  
  const discountAmount = (this.price * this.discount.percentage) / 100;
  return Math.round((this.price - discountAmount) * 100) / 100;
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function() {
  return this.modules.reduce((total, module) => total + module.lessons.length, 0);
});

// Indexes for better performance
courseSchema.index({ status: 1, publishedAt: -1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ price: 1 });
courseSchema.index({ enrollmentCount: -1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ createdAt: -1 });

// Text index for search
courseSchema.index({
  name: 'text',
  description: 'text',
  'instructor.name': 'text',
  tags: 'text'
});

// Pre-save middleware
courseSchema.pre('save', function(next) {
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Calculate original price if not set
  if (!this.originalPrice) {
    this.originalPrice = this.price;
  }
  
  next();
});

// Static methods
courseSchema.statics.getPublishedCourses = function() {
  return this.find({ status: 'published' }).sort({ publishedAt: -1 });
};

courseSchema.statics.getCoursesByCategory = function(category) {
  return this.find({ status: 'published', category }).sort({ 'rating.average': -1 });
};

courseSchema.statics.getPopularCourses = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ enrollmentCount: -1, 'rating.average': -1 })
    .limit(limit);
};

courseSchema.statics.searchCourses = function(query) {
  return this.find(
    { 
      $text: { $search: query },
      status: 'published'
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// Instance methods
courseSchema.methods.updateRating = async function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = Math.round((totalRating / this.rating.count) * 10) / 10;
  return this.save();
};

courseSchema.methods.incrementEnrollment = function() {
  this.enrollmentCount += 1;
  return this.save();
};

courseSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
