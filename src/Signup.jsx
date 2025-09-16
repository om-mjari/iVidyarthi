import React, { useState, useEffect } from 'react';
import './Auth.css';

const Signup = ({ onAuthenticated, onSwitchToLogin }) => {
  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    mobileNo: '',
    contactNo: '',
    dob: '',
    gender: '',
    university: '',
    institute: '',
    branch: '',
    course: '',
    semester: '',
    highestQualification: '',
    specialization: '',
    designation: '',
    experienceYears: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Student');

  // Simple scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dropdown options
  const instituteOptions = [
    'Indian Institute of Technology (IIT) Bombay',
    'Indian Institute of Technology (IIT) Madras',
    'Indian Institute of Technology (IIT) Kanpur',
    'Indian Institute of Technology (IIT) Kharagpur',
    'Indian Institute of Technology (IIT) Roorkee',
    'National Institute of Technology (NIT) Trichy',
    'National Institute of Technology (NIT) Warangal',
    'Birla Institute of Technology and Science (BITS) Pilani',
    'Vellore Institute of Technology (VIT) Vellore',
    'Manipal Institute of Technology',
    'SRM Institute of Science and Technology',
    'Amity University',
    'Lovely Professional University (LPU)',
    'Delhi Technological University (DTU)',
    'Other'
  ];

  const universityOptions = [
    'University of Delhi',
    'Jawaharlal Nehru University',
    'Banaras Hindu University',
    'Aligarh Muslim University',
    'University of Mumbai',
    'University of Calcutta',
    'University of Madras',
    'Pune University',
    'Gujarat University',
    'Rajasthan University',
    'Anna University',
    'Osmania University',
    'Andhra University',
    'Kerala University',
    'Mysore University',
    'Other'
  ];

  const branchOptions = [
    'Computer Science and Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Biomedical Engineering',
    'Other'
  ];

  const courseOptions = [
    'B.Tech Computer Science and Engineering',
    'B.E Computer Science and Engineering',
    'M.Tech Computer Science and Engineering',
    'M.E Computer Science and Engineering',
    'MCA (Master of Computer Applications)',
    'BCA (Bachelor of Computer Applications)',
    'B.Sc Computer Science',
    'M.Sc Computer Science',
    'PhD Computer Science and Engineering',
    'Other'
  ];

  const qualificationOptions = [
    '10th Standard',
    '12th Standard',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const semesterOptions = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester'
  ];

  const genderOptions = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say'
  ];

  const specializationOptions = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Management',
    'Other'
  ];

  const designationOptions = [
    'Assistant Professor',
    'Associate Professor',
    'Professor',
    'Lecturer',
    'Senior Lecturer',
    'Research Associate',
    'Visiting Faculty',
    'Other'
  ];

  // Form input handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error on input change
  };

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name.trim()) && name.trim().length >= 2;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email.trim());
  };

  const validateContact = (contact) => {
    const contactRegex = /^[6-9]\d{9}$/;
    return contactRegex.test(contact.trim());
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Basic validation
      if (!validateName(formData.fullName)) {
        return setError('Full name should contain only letters and spaces (minimum 2 characters).');
      }

      if (!validateEmail(formData.email)) {
        return setError('Please enter a valid Gmail address (e.g., user@gmail.com).');
      }

      // Tab-specific validation
      if (activeTab === 'Student') {
        if (!validateContact(formData.contactNumber)) {
          return setError('Contact number should be 10 digits starting with 6, 7, 8, or 9.');
        }
        if (!formData.dob) {
          return setError('Please enter your date of birth.');
        }
        if (!formData.gender) {
          return setError('Please select your gender.');
        }
        if (!formData.university) {
          return setError('Please select your university.');
        }
        if (!formData.institute) {
          return setError('Please select your institute.');
        }
        if (!formData.branch) {
          return setError('Please select your branch.');
        }
        if (!formData.course) {
          return setError('Please select your course.');
        }
        if (!formData.semester) {
          return setError('Please select your semester.');
        }
      } else if (activeTab === 'Lecturer') {
        if (!validateContact(formData.mobileNo)) {
          return setError('Mobile number should be 10 digits starting with 6, 7, 8, or 9.');
        }
        if (!formData.dob) {
          return setError('Please enter your date of birth.');
        }
        if (!formData.gender) {
          return setError('Please select your gender.');
        }
        if (!formData.university) {
          return setError('Please select your university.');
        }
        if (!formData.institute) {
          return setError('Please select your institute.');
        }
        if (!formData.highestQualification) {
          return setError('Please select your highest qualification.');
        }
        if (!formData.specialization) {
          return setError('Please select your specialization.');
        }
        if (!formData.designation) {
          return setError('Please select your designation.');
        }
        if (!formData.experienceYears || formData.experienceYears < 0) {
          return setError('Please enter valid years of experience.');
        }
      } else if (activeTab === 'Registrar') {
        if (!validateContact(formData.contactNo)) {
          return setError('Contact number should be 10 digits starting with 6, 7, 8, or 9.');
        }
        if (!formData.university) {
          return setError('Please select your university.');
        }
      }

      if (!validatePassword(formData.password)) {
        return setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
      }

      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match.');
      }

      // Direct registration without OTP
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType: activeTab,
          phone: activeTab === 'Student' ? formData.contactNumber : (activeTab === 'Lecturer' ? formData.mobileNo : formData.contactNo),
          dateOfBirth: formData.dob,
          gender: formData.gender?.toLowerCase(),
          education: {
            institution: formData.institute || '',
            university: formData.university || '',
            course: formData.course || '',
            semester: formData.semester || '',
            branch: formData.branch || '',
            highestQualification: formData.highestQualification || '',
            specialization: formData.specialization || '',
            designation: formData.designation || '',
            experienceYears: formData.experienceYears || ''
          }
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Registration failed');
      }

      setSuccess('Registration successful! Redirecting to login page...');

      // Redirect to login page
      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      }, 2000);
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-illustration" aria-hidden>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="brand">iVidhyarthi</div>
          <div className="tag">Learn. Build. Shine.</div>
        </div>
        <div className="auth-form-area">
          <h2>Create your account</h2>
          <p className="subtitle">Join and manage your learning journey</p>

          {/* User Type Tabs */}
          <div className="user-tabs">
            <button 
              type="button"
              className={`tab-button ${activeTab === 'Student' ? 'active' : ''}`}
              onClick={() => setActiveTab('Student')}
            >
              Student
            </button>
            <button 
              type="button"
              className={`tab-button ${activeTab === 'Lecturer' ? 'active' : ''}`}
              onClick={() => setActiveTab('Lecturer')}
            >
              Lecturer
            </button>
            <button 
              type="button"
              className={`tab-button ${activeTab === 'Registrar' ? 'active' : ''}`}
              onClick={() => setActiveTab('Registrar')}
            >
              Registrar
            </button>
          </div>

          <form onSubmit={submit} className="auth-form">
            {/* Common fields for all user types */}
            <label className="field">
              <span>Full Name *</span>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Email *</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </label>

            {/* Student-specific fields */}
            {activeTab === 'Student' && (
              <>
                <label className="field">
                  <span>Contact Number *</span>
                  <input
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Date of Birth *</span>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Gender *</span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>University *</span>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                  >
                    <option value="">Select University</option>
                    {universityOptions.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Institute *</span>
                  <select
                    name="institute"
                    value={formData.institute}
                    onChange={(e) => handleInputChange('institute', e.target.value)}
                    required
                  >
                    <option value="">Select Institute</option>
                    {instituteOptions.map(institute => (
                      <option key={institute} value={institute}>{institute}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Branch *</span>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Course *</span>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    {courseOptions.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Semester *</span>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={(e) => handleInputChange('semester', e.target.value)}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesterOptions.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </label>
              </>
            )}

            {/* Lecturer-specific fields */}
            {activeTab === 'Lecturer' && (
              <>
                <label className="field">
                  <span>Mobile Number *</span>
                  <input
                    name="mobileNo"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobileNo || ''}
                    onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Date of Birth *</span>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Gender *</span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>University *</span>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                  >
                    <option value="">Select University</option>
                    {universityOptions.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Institute *</span>
                  <select
                    name="institute"
                    value={formData.institute}
                    onChange={(e) => handleInputChange('institute', e.target.value)}
                    required
                  >
                    <option value="">Select Institute</option>
                    {instituteOptions.map(institute => (
                      <option key={institute} value={institute}>{institute}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Highest Qualification *</span>
                  <select
                    name="highestQualification"
                    value={formData.highestQualification || ''}
                    onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                    required
                  >
                    <option value="">Select Qualification</option>
                    {qualificationOptions.map(qualification => (
                      <option key={qualification} value={qualification}>{qualification}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Specialization *</span>
                  <select
                    name="specialization"
                    value={formData.specialization || ''}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    required
                  >
                    <option value="">Select Specialization</option>
                    {specializationOptions.map(specialization => (
                      <option key={specialization} value={specialization}>{specialization}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Designation *</span>
                  <select
                    name="designation"
                    value={formData.designation || ''}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    required
                  >
                    <option value="">Select Designation</option>
                    {designationOptions.map(designation => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Experience (Years) *</span>
                  <input
                    name="experienceYears"
                    type="number"
                    placeholder="Enter years of experience"
                    value={formData.experienceYears || ''}
                    onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                    min="0"
                    required
                  />
                </label>
              </>
            )}

            {/* Registrar-specific fields */}
            {activeTab === 'Registrar' && (
              <>
                <label className="field">
                  <span>Contact Number *</span>
                  <input
                    name="contactNo"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.contactNo || ''}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>University *</span>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                  >
                    <option value="">Select University</option>
                    {universityOptions.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </label>
              </>
            )}

            {/* Password fields for all user types */}
            <label className="field">
              <span>Password *</span>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Confirm Password *</span>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </label>

            {error && <div className="msg error" role="alert">{error}</div>}
            {success && <div className="msg success">{success}</div>}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="switch">
            <span>Already have an account? <button type="button" onClick={onSwitchToLogin} className="link">Log in</button></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
