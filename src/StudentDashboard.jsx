import React, { useState, useMemo, useEffect, useRef } from 'react';
import './StudentDashboard.css';
import Logo from './components/Logo';

const StudentDashboard = ({ onNavigateCourse }) => {
  // Sample course data
  const courses = [
    {
      id: 1,
      name: "React for Beginners",
      instructor: "Abha Ma'am",
      price: 799,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Mastering JavaScript",
      instructor: "Abha Ma'am",
      price: 599,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Data Structures in C++",
      instructor: "Bhumika Ma'am",
      price: 999,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Python Programming",
      instructor: "Rakesh Sir",
      price: 699,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Web Development Bootcamp",
      instructor: "Priti Ma'am",
      price: 1299,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Machine Learning Basics",
      instructor: "Rakesh Sir",
      price: 899,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      name: "UI/UX Design Fundamentals",
      instructor: "Rakesh Sir",
      price: 549,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      name: "Database Management",
      instructor: "Bhavik Sir",
      price: 749,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      name: "Cloud Computing with AWS",
      instructor: "Bhumika Ma'am",
      price: 1199,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      id: 10,
      name: "Advanced Data Structures",
      instructor: "Bhumika Ma'am",
      price: 899,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      id: 11,
      name: "Cybersecurity Fundamentals",
      instructor: "Hardik Sir",
      price: 1099,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    },
    {
      id: 12,
      name: "DevOps & CI/CD Pipeline",
      instructor: "Bhumika Ma'am",
      price: 999,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
    },
    {
      id: 13,
      name: "Blockchain Development",
      instructor: "Bhumika Ma'am",
      price: 1399,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop"
    },
    {
      id: 14,
      name: "Mobile App Development",
      instructor: "Jigna Ma'am",
      price: 849,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      id: 15,
      name: "Artificial Intelligence",
      instructor: "Bhumika Ma'am",
      price: 1299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      id: 16,
      name: "Full Stack Development",
      instructor: "Abha Ma'am",
      price: 1499,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    }
  ];

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Voice search state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Profile state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    birthdate: '',
    courseDetails: '',
    certificateDetails: '',
    gender: ''
  });
  const [editProfile, setEditProfile] = useState({
    name: '',
    birthdate: '',
    courseDetails: '',
    certificateDetails: '',
    gender: ''
  });
  const [isProfileDirty, setIsProfileDirty] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setEditProfile(parsed);
      } catch { }
    }
  }, []);

  // Voice search setup
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setVoiceSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Clean up the transcript by removing punctuation at the end
        const cleanTranscript = transcript.replace(/[.!?,\s]+$/, '').trim();
        setSearchTerm(cleanTranscript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const avatarInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts[1]?.[0] || '';
    return (first + second).toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    window.location.reload();
  };

  const openProfile = () => {
    setEditProfile(profile);
    setIsProfileDirty(false);
    setIsProfileOpen(true);
  };

  const handleEnroll = (course) => {
    localStorage.setItem('selected_course', JSON.stringify(course));
    onNavigateCourse && onNavigateCourse();
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    console.log('Debug - Total courses:', courses.length);
    console.log('Debug - Search term:', searchTerm);
    console.log('Debug - Price range:', priceRange);
    console.log('Debug - Min rating:', minRating);

    let filtered = courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesPrice = true;
      switch (priceRange) {
        case 'under500':
          matchesPrice = course.price < 500;
          break;
        case '500to1000':
          matchesPrice = course.price >= 500 && course.price <= 1000;
          break;
        case 'over1000':
          matchesPrice = course.price > 1000;
          break;
        default:
          matchesPrice = true;
      }
      const matchesRating = course.rating >= minRating;
      return matchesSearch && matchesPrice && matchesRating;
    });

    console.log('Debug - Filtered courses:', filtered.length);

    // Fallback: if no courses match filters, show all courses with a warning
    if (filtered.length === 0 && (searchTerm || priceRange !== 'all' || minRating > 0)) {
      console.log('No courses match filters, showing all courses');
      filtered = courses;
    }

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, priceRange, minRating]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('asc');
    setPriceRange('all');
    setMinRating(0);
    setShowFilters(false);
  };

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => {
      const next = { ...prev, [name]: value };
      setIsProfileDirty(JSON.stringify(next) !== JSON.stringify(profile));
      return next;
    });
  };

  const updateProfile = () => {
    setProfile(editProfile);
    localStorage.setItem('student_profile', JSON.stringify(editProfile));
    setIsProfileDirty(false);
    setIsProfileOpen(false);
  };

  const closeProfile = () => setIsProfileOpen(false);

  // Voice search functions
  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="star filled">★</span>);
    if (hasHalfStar) stars.push(<span key="half" className="star half">★</span>);
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    return (
      <div className="rating">
        {stars}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  // Apply filters handler for mobile (just closes panel since filters auto-apply)
  const applyFiltersAndClose = () => setShowFilters(false);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-inner">
          <div className="header-titles">
            <Logo size="large" showText={true} style={{ marginBottom: '0.5rem' }} />
            <h1>Student Dashboard</h1>
            <p>Discover and enroll in amazing courses</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={logout} title="Logout">Logout</button>
            <button
              className="avatar-btn"
              aria-label="Open profile"
              onClick={openProfile}
              title={profile.name ? profile.name : 'Profile'}
            >
              {profile.name ? (
                <span className="avatar-initials">{avatarInitials(profile.name)}</span>
              ) : (
                <span className="avatar-icon" aria-hidden>👤</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Search and Controls */}
        <div className="controls-section">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {voiceSupported && (
                <button
                  className={`voice-search-btn ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                  title={isListening ? 'Stop listening' : 'Start voice search'}
                  aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
                >
                  {isListening ? '🔴' : '🎤'}
                </button>
              )}
            </div>
            {isListening && (
              <div className="voice-status">
                <span className="listening-indicator">🎤 Listening...</span>
              </div>
            )}
          </div>

          <div className="sort-section">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split('-');
                setSortBy(sort);
                setSortOrder(order);
              }}
              className="sort-select"
              aria-label="Sort courses"
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
              <option value="rating-desc">Rating (High → Low)</option>
            </select>
          </div>

          <button onClick={resetFilters} className="reset-btn">
            Reset Filters
          </button>

          <button
            className="filters-toggle-btn"
            onClick={() => setShowFilters(prev => !prev)}
            aria-expanded={showFilters}
            aria-controls="filtersSidebar"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Overlay backdrop */}
        <div className={`filters-overlay ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(false)}></div>
        
        <div className={`main-content ${showFilters ? 'filters-open' : 'no-filters'}`}>
          {/* Filters Sidebar */}
          <aside
            id="filtersSidebar"
            className={`filters-sidebar ${showFilters ? 'open' : ''}`}
          >
            <h3>Filters</h3>

            <div className="filter-group">
              <h4>Price Range</h4>
              <label className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  value="all"
                  checked={priceRange === 'all'}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                All Prices
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  value="under500"
                  checked={priceRange === 'under500'}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                Under ₹500
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  value="500to1000"
                  checked={priceRange === '500to1000'}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                ₹500 - ₹1000
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  value="over1000"
                  checked={priceRange === 'over1000'}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                Over ₹1000
              </label>
            </div>

            <div className="filter-group">
              <h4>Minimum Rating</h4>
              <label className="filter-option">
                <input
                  type="radio"
                  name="minRating"
                  value="0"
                  checked={minRating === 0}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                All Ratings
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="minRating"
                  value="3"
                  checked={minRating === 3}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                3+ Stars
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="minRating"
                  value="4"
                  checked={minRating === 4}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                4+ Stars
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="minRating"
                  value="4.5"
                  checked={minRating === 4.5}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                4.5+ Stars
              </label>
            </div>

            <div className="mobile-apply-wrap">
              <button className="apply-filters-btn" onClick={applyFiltersAndClose}>Apply Filters</button>
            </div>
          </aside>

          {/* Course Grid */}
          <main className="courses-section">
            <div className="courses-header">
              <h2>Available Courses ({filteredAndSortedCourses.length})</h2>
            </div>

            {filteredAndSortedCourses.length > 0 ? (
              <div className="courses-grid">
                {(searchTerm || priceRange !== 'all' || minRating > 0) && (
                  <div className="filter-warning">
                    <p>Showing {filteredAndSortedCourses.length} courses matching your filters</p>
                  </div>
                )}
                {filteredAndSortedCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <img src={course.image} alt={course.name} />
                    </div>
                    <div className="course-content">
                      <div className="course-info-row">
                        <h3 className="course-name">{course.name}</h3>
                        <p className="course-instructor">by {course.instructor}</p>
                      </div>
                      <div className="price-button-row">
                        <div className="course-price">
                          ₹{course.price}
                        </div>
                        <button className="enroll-btn" onClick={() => handleEnroll(course)}>Enroll Now</button>
                      </div>
                      <div className="course-rating">
                        {renderStars(course.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-courses">
                <p>No courses found matching your criteria.</p>
                <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.7 }}>
                  Try adjusting your search terms or filters.
                </p>
                <button onClick={resetFilters} className="reset-btn">
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Profile Slide-over */}
      <div className={`profile-overlay ${isProfileOpen ? 'open' : ''}`} onClick={closeProfile} />
      <aside className={`profile-panel ${isProfileOpen ? 'open' : ''}`} aria-hidden={!isProfileOpen}>
        <div className="profile-header">
          <h3>Profile</h3>
          <button className="profile-close" onClick={closeProfile} aria-label="Close profile">×</button>
        </div>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <label className="form-field">
            <span>Name</span>
            <input type="text" name="name" value={editProfile.name} onChange={handleEditProfileChange} placeholder="Your name" />
          </label>
          <label className="form-field">
            <span>Birthdate</span>
            <input type="date" name="birthdate" value={editProfile.birthdate} onChange={handleEditProfileChange} />
          </label>
          <label className="form-field">
            <span>Course Details</span>
            <textarea name="courseDetails" value={editProfile.courseDetails} onChange={handleEditProfileChange} rows="3" placeholder="e.g., React, ML, UI/UX" />
          </label>
          <label className="form-field">
            <span>Certificate Details</span>
            <textarea name="certificateDetails" value={editProfile.certificateDetails} onChange={handleEditProfileChange} rows="3" placeholder="e.g., Coursera, Udemy" />
          </label>
          <div className="form-field">
            <span>Gender</span>
            <div className="radio-group">
              <label><input type="radio" name="gender" value="Male" checked={editProfile.gender === 'Male'} onChange={handleEditProfileChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" checked={editProfile.gender === 'Female'} onChange={handleEditProfileChange} /> Female</label>
              <label><input type="radio" name="gender" value="Other" checked={editProfile.gender === 'Other'} onChange={handleEditProfileChange} /> Other</label>
            </div>
          </div>
          <div className="profile-actions">
            <button type="button" className="btn-secondary" onClick={closeProfile}>Close</button>
            <button type="button" className="btn-primary" disabled={!isProfileDirty} onClick={updateProfile}>Update</button>
          </div>
        </form>
      </aside>
    </div>
  );
};

export default StudentDashboard;
