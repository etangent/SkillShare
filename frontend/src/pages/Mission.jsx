import React, { useEffect, useState } from 'react';
import Signup from './SignUp';   
import Login from './Login';
import { useUser } from '../components/UserContext';
import useRedirect from '../hooks/RedirectToLogin';
import { Link } from 'react-router-dom';


const Mission = () => {
    return (
      <div className='min-h-screen bg-background'>
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
      </div>
    );
  };

export default Mission;