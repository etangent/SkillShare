import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import MatchFinding from './MatchFinding';
import { useUser } from '../components/UserContext';
import useRedirect from '../hooks/RedirectToLogin';
import { MdAdd } from 'react-icons/md';
import { Link,useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const [showState, setShowState] = useState('dashboard');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    if (view === 'matchfinding') {
      setShowState('matchfinding');
    } else {
      setShowState('dashboard');
    }
  }, [location.search]);
  
  const { user, logout } = useUser();
  

  useRedirect();

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          {/* Logo or App Name */}
          <Link to="/" className='text-2xl font-semibold text-primary'>
          Syncora
          </Link>

          {/* Navigation */}
          <nav className='flex items-center space-x-6'>
            <button
              className={`text-lg font-medium ${
                showState === 'dashboard'
                  ? 'text-primary underline underline-offset-4'
                  : 'text-gray-600 hover:text-primary transition duration-200'
              }`}
              onClick={() => setShowState('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`text-lg font-medium ${
                showState === 'matchfinding'
                  ? 'text-primary underline underline-offset-4'
                  : 'text-gray-600 hover:text-primary transition duration-200'
              }`}
              onClick={() => setShowState('matchfinding')}
            >
              Matchfinding
            </button>

            {/* Create Buttons */}

            <Link to="/skills" 
                        className={`text-lg font-medium ${location.pathname === '/skills' ? 'text-primary underline underline-offset-4' : 'text-gray-600 text-gray-600hover:text-primary transition duration-200'}`}
                        >
                        Skills
                        </Link>
        
            <Link
              to='../skills/create'
              className='text-primary hover:text-secondary transition duration-200'
              aria-label='Create Skill'
            >
              <MdAdd size={28} />
            </Link>

            {/* User Info */}
            <div className='flex items-center space-x-2'>
              <span className='text-gray-800 font-medium'>
                {user ? user.username : ''}
              </span>
              <button
                onClick={logout}
                className='bg-primary hover:bg-secondary text-white font-semibold py-1 px-3 rounded-md transition duration-200'
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        {showState === 'matchfinding' ? <MatchFinding /> : <Dashboard />}
      </main>
    </div>
  );
};

export default Home;