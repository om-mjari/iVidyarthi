import React, { useState, useEffect } from 'react';
import './CourseLearningPage.css';

const CourseLearningPage = ({ onBackToDashboard }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: '',
    topics: [],
    difficulty: '',
    recommend: false
  });

  useEffect(() => {
    const savedCourse = localStorage.getItem('selected_course');
    if (savedCourse) {
      setSelectedCourse(JSON.parse(savedCourse));
    }
  }, []);

  // Sample course content
  const courseContent = {
    videos: [
      {
        id: 1,
        title: "Introduction to Data Structures",
        duration: "15:30",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 2,
        title: "Arrays and Linked Lists",
        duration: "22:45",
        thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 3,
        title: "Stacks and Queues",
        duration: "18:20",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 4,
        title: "Trees and Binary Search Trees",
        duration: "25:10",
        thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ],
    assignments: [
      {
        id: 1,
        title: "Implement Array Operations",
        description: "Create functions for array insertion, deletion, and searching",
        dueDate: "2025-09-12",
        points: 25
      },
      {
        id: 2,
        title: "Linked List Implementation",
        description: "Build a complete linked list with all basic operations",
        dueDate: "2025-09-15",
        points: 30
      },
      {
        id: 3,
        title: "Stack and Queue Applications",
        description: "Solve real-world problems using stacks and queues",
        dueDate: "2025-09-18",
        points: 35
      },
      {
        id: 4,
        title: "Binary Tree Traversal",
        description: "Implement all types of tree traversal algorithms",
        dueDate: "2025-09-20",
        points: 40
      }
    ]
  };

  const handleAssignmentToggle = (assignmentId) => {
    setCompletedAssignments(prev => 
      prev.includes(assignmentId) 
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    );
  };

  const handleFeedbackChange = (field, value) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTopicToggle = (topic) => {
    setFeedback(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
  };

  if (!selectedCourse) {
    return (
      <div className="course-learning-page">
        <div className="loading">Loading course content...</div>
      </div>
    );
  }

  return (
    <div className="course-learning-page">
      <header className="course-header">
        <div className="header-content">
          <button className="back-btn" onClick={onBackToDashboard}>
            ← Back to Dashboard
          </button>
          <div className="course-info">
            <h1>{selectedCourse.name}</h1>
            <p>by {selectedCourse.instructor}</p>
          </div>
        </div>
      </header>

      <div className="course-content">
        <div className="main-content">
          {/* Video Player Section */}
          <div className="video-section">
            <div className="video-player">
              <iframe
                src={courseContent.videos[currentVideo].url}
                title={courseContent.videos[currentVideo].title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h3>{courseContent.videos[currentVideo].title}</h3>
              <p>Duration: {courseContent.videos[currentVideo].duration}</p>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="video-playlist">
            <h3>Course Videos</h3>
            <div className="playlist">
              {courseContent.videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`playlist-item ${index === currentVideo ? 'active' : ''}`}
                  onClick={() => setCurrentVideo(index)}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-details">
                    <h4>{video.title}</h4>
                    <p>{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar">
          {/* Assignments Section */}
          <div className="assignments-section">
            <h3>Assignments</h3>
            <div className="assignments-list">
              {courseContent.assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-header">
                    <label className="assignment-checkbox">
                      <input
                        type="checkbox"
                        checked={completedAssignments.includes(assignment.id)}
                        onChange={() => handleAssignmentToggle(assignment.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="assignment-info">
                      <h4>{assignment.title}</h4>
                      <p>{assignment.description}</p>
                      <div className="assignment-meta">
                        <span className="due-date">Due: {assignment.dueDate}</span>
                        <span className="points">{assignment.points} points</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="feedback-section">
            <h3>Course Feedback</h3>
            <form className="feedback-form">
              <div className="form-group">
                <label>Overall Rating</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`star ${star <= feedback.rating ? 'filled' : ''}`}
                      onClick={() => handleFeedbackChange('rating', star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  value={feedback.difficulty}
                  onChange={(e) => handleFeedbackChange('difficulty', e.target.value)}
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Topics Covered Well</label>
                <div className="topic-checkboxes">
                  {['Theory', 'Practical Examples', 'Code Implementation', 'Real-world Applications'].map(topic => (
                    <label key={topic} className="topic-checkbox">
                      <input
                        type="checkbox"
                        checked={feedback.topics.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                      />
                      <span className="checkmark"></span>
                      {topic}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Additional Comments</label>
                <textarea
                  value={feedback.comments}
                  onChange={(e) => handleFeedbackChange('comments', e.target.value)}
                  placeholder="Share your thoughts about the course..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="recommend-checkbox">
                  <input
                    type="checkbox"
                    checked={feedback.recommend}
                    onChange={(e) => handleFeedbackChange('recommend', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  I would recommend this course to others
                </label>
              </div>

              <button type="button" className="submit-feedback-btn" onClick={submitFeedback}>
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;
