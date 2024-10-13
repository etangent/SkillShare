
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loading-icons';
import { useUser } from '../components/UserContext';


const Login = () => {
  const { user, login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter your username and password.');
      setLoading(false);
      return;
    }

    const isLoggedIn = await login({ username, password });
    if (!isLoggedIn) {
      setErrorMessage('Login failed. Please check your credentials.');
    } else {
      navigate('/home');
    }

    setLoading(false);
  };

  const location = useLocation();

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        
        <Link to="/" className='text-2xl font-semibold text-primary'>
            SkillMatcher
          </Link>

        <nav className='flex items-center space-x-6'>

          <Link to="/mission" 
          className={`text-lg font-medium ${location.pathname === '/mission' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`}
          >
            Mission
          </Link>

          <Link to="/signup" 
          className={`text-lg font-medium ${location.pathname === '/signup' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`}
          >
            Signup
          </Link>

          <Link to="/login" 
           className={`text-lg font-medium ${location.pathname === '/login' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`}
           >
            Login
          </Link>

        </nav>
        
      </div>
    </header>

    <div className='flex-grow flex items-center justify-center'>
      
      {loading ? (
        <div className='flex justify-center'>
          <ThreeDots fill='#7E60BF' />
        </div>
      ) : (
        <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
            Login
          </h2>
          {errorMessage && (
            <div className='text-red-500 text-sm mb-4 text-center'>
              {errorMessage}
            </div>
          )}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Username
              </label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter your username'
                className='border-2 border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full px-3 py-2 transition duration-200'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='border-2 border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full px-3 py-2 transition duration-200'
              />
            </div>
            <button
              onClick={handleLogin}
              className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
            >
              Login
            </button>
          </div>
          <p className='mt-6 text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link
              to='/signup'
              className='text-primary hover:text-secondary font-medium transition duration-200'
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Login;