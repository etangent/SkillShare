import React, { useEffect, useState } from 'react';
import Signup from './SignUp';   
import Login from './Login';
import { useUser } from '../components/UserContext';
import useRedirect from '../hooks/RedirectToLogin';
import { Link } from 'react-router-dom';


const Mission = () => {
    const [showState, setShowState] = useState('dashboard');
    const { user, logout } = useUser();
  
    useRedirect();
  
    return (
      <div className='min-h-screen bg-background'>
      </div>
    );
  };

export default Mission;