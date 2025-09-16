import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import StudentDashboard from './StudentDashboard';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import Login from './Login';
import Signup from './Signup';
import CourseDetails from './CourseDetails';
import Payment from './Payment';
import PaymentGateway from './PaymentGateway';
import FinalPayment from './FinalPayment';
import CourseLearningPage from './CourseLearningPage';
import LearnAboutIVidhyarthi from './LearnAboutIVidhyarthi';
import OurMission from './OurMission';
import Team from './Team';
import ContactUs from './ContactUs';
import CourseCatalog from './CourseCatalog';
import FAQ from './FAQ';
import LocalChapters from './LocalChapters';
import Coordinators from './Coordinators';
import HelpVideos from './HelpVideos';
import Translation from './Translation';
import FacultyInitiatives from './FacultyInitiatives';
import StudentPrograms from './StudentPrograms';
import Blog from './Blog';
import CertificationCourses from './CertificationCourses';
import Careers from './Careers';
import Documents from './Documents';
import Books from './Books';
import Resources from './Resources';
import LecturerDashboard from './LecturerDashboard';
import RegistrarDashboard from './RegistrarDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup'
  const [route, setRoute] = useState('home'); // includes 'lecturer-dashboard'
  const [gatewayMeta, setGatewayMeta] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('auth_user');
    if (raw) {
      try { 
        const userData = JSON.parse(raw);
        setUser(userData);
        if (route === 'home') setRoute('dashboard');
      } catch {}
    }
    
    const adminRaw = localStorage.getItem('admin_user');
    if (adminRaw) {
      try { 
        const adminData = JSON.parse(adminRaw);
        setAdmin(adminData);
        if (route === 'home') setRoute('admin-dashboard');
      } catch {}
    }

    const lecturerRaw = localStorage.getItem('lecturer_user');
    if (lecturerRaw && route === 'home') setRoute('lecturer-dashboard');

    const registrarRaw = localStorage.getItem('registrar_user');
    if (registrarRaw && route === 'home') setRoute('registrar-dashboard');

    // Handle browser back/forward buttons
    const handlePopState = (event) => {
      if (event.state && event.state.route) {
        setRoute(event.state.route);
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial history state
    if (!window.history.state) {
      window.history.replaceState({ route: 'home' }, '', window.location.pathname);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleAuthenticated = () => {
    const raw = localStorage.getItem('auth_user');
    if (raw) {
      try { 
        setUser(JSON.parse(raw)); 
        setRoute('dashboard'); // Navigate to dashboard after login
      } catch {}
    }
  };

  const handleAdminAuthenticated = () => {
    const adminRaw = localStorage.getItem('admin_user');
    if (adminRaw) {
      try { 
        setAdmin(JSON.parse(adminRaw)); 
        setRoute('admin-dashboard'); // Navigate to admin dashboard after login
      } catch {}
    }
  };

  const handleLecturerAuthenticated = () => {
    const lec = localStorage.getItem('lecturer_user');
    if (lec) {
      setRoute('lecturer-dashboard');
    }
  };

  const handleLecturerLogout = () => {
    localStorage.removeItem('lecturer_user');
    setRoute('home');
  };

  const handleRegistrarLogout = () => {
    localStorage.removeItem('registrar_user');
    setRoute('home');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_user');
    setAdmin(null);
    setRoute('home');
  };

  // Show Admin Dashboard if admin is authenticated
  if (admin && route === 'admin-dashboard') {
    return (
      <div className="App">
        <AdminDashboard onLogout={handleAdminLogout} />
      </div>
    );
  }

  // Show Admin Login page
  if (route === 'admin-login') {
    return (
      <div className="App">
        <AdminLogin 
          onAdminAuthenticated={handleAdminAuthenticated} 
          onBackToHome={() => setRoute('home')}
        />
      </div>
    );
  }

  // Removed dedicated lecturer login route; lecturers use common Login

  // Show authentication pages when user needs to login/signup
  if (!user && (route === 'login' || route === 'signup')) {
    return (
      <div className="App">
        {route === 'login' ? (
          <Login 
            onAuthenticated={handleAuthenticated} 
            onSwitchToSignup={() => setRoute('signup')} 
            onBackToHome={() => setRoute('home')}
            onAdminLogin={handleAdminAuthenticated}
          />
        ) : (
          <Signup 
            onAuthenticated={handleAuthenticated} 
            onSwitchToLogin={() => setRoute('login')} 
            onBackToHome={() => setRoute('home')}
          />
        )}
      </div>
    );
  }

  // Navigation handler for all pages
  const handleNavigateToPage = (pageName) => {
    setRoute(pageName);
    // Push new state to browser history
    window.history.pushState({ route: pageName }, '', `/${pageName.toLowerCase()}`);
  };

  const handleNavigateHome = () => {
    setRoute('home');
    // Push home state to browser history
    window.history.pushState({ route: 'home' }, '', '/');
  };

  // Show Home page by default (no authentication required)
  if (!user && !admin && route === 'home') {
    return (
      <div className="App">
        <Home 
          onNavigateLogin={() => {
            setRoute('login');
            window.history.pushState({ route: 'login' }, '', '/login');
          }}
          onNavigateAdmin={() => {
            setRoute('admin-login');
            window.history.pushState({ route: 'admin-login' }, '', '/admin-login');
          }}
          onNavigateToPage={handleNavigateToPage}
        />
      </div>
    );
  }

  // Show individual pages
  if (route === 'LearnAboutIVidhyarthi') {
    return (
      <div className="App">
        <LearnAboutIVidhyarthi 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'OurMission') {
    return (
      <div className="App">
        <OurMission 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Team') {
    return (
      <div className="App">
        <Team 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'ContactUs') {
    return (
      <div className="App">
        <ContactUs 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'CourseCatalog') {
    return (
      <div className="App">
        <CourseCatalog 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'FAQ') {
    return (
      <div className="App">
        <FAQ 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'LocalChapters') {
    return (
      <div className="App">
        <LocalChapters 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Coordinators') {
    return (
      <div className="App">
        <Coordinators 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'HelpVideos') {
    return (
      <div className="App">
        <HelpVideos 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Translation') {
    return (
      <div className="App">
        <Translation 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'FacultyInitiatives') {
    return (
      <div className="App">
        <FacultyInitiatives 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'StudentPrograms') {
    return (
      <div className="App">
        <StudentPrograms 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Blog') {
    return (
      <div className="App">
        <Blog 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'CertificationCourses') {
    return (
      <div className="App">
        <CertificationCourses 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Careers') {
    return (
      <div className="App">
        <Careers 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Documents') {
    return (
      <div className="App">
        <Documents 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Books') {
    return (
      <div className="App">
        <Books 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  if (route === 'Resources') {
    return (
      <div className="App">
        <Resources 
          onNavigateHome={handleNavigateHome}
          onNavigateLogin={() => setRoute('login')}
        />
      </div>
    );
  }

  return (
    <div className="App">
      {route === 'dashboard' && <StudentDashboard onNavigateCourse={() => setRoute('course')} />}
      {route === 'lecturer-dashboard' && localStorage.getItem('lecturer_user') && (
        <LecturerDashboard onLogout={handleLecturerLogout} />
      )}
      {route === 'registrar-dashboard' && localStorage.getItem('registrar_user') && (
        <RegistrarDashboard onLogout={handleRegistrarLogout} />
      )}
      {route === 'course' && (
        <CourseDetails onBack={() => setRoute('dashboard')} onPay={() => setRoute('payment')} />
      )}
      {route === 'payment' && (
        <Payment 
          onCancel={() => setRoute('course')} 
          onSuccess={() => setRoute('dashboard')} 
          onGateway={(meta) => { setGatewayMeta(meta); setRoute('gateway'); }}
        />
      )}
      {route === 'gateway' && (
        <PaymentGateway 
          method={gatewayMeta?.method}
          onBack={() => setRoute('payment')}
          onComplete={(type) => {
            if (type === 'final') {
              setRoute('final');
            } else {
              setRoute('dashboard');
            }
          }}
        />
      )}
      {route === 'final' && (
        <FinalPayment onComplete={() => setRoute('learning')} />
      )}
      {route === 'learning' && (
        <CourseLearningPage onBackToDashboard={() => setRoute('dashboard')} />
      )}
    </div>
  );
}

export default App;
