import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa'; // Importing icons

const Public = () => {
  const location = useLocation();

  return (
    <div className='min-h-screen bg-background'>
      <header className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          {/* Logo or App Name */}
          <Link to="/" className='text-2xl font-semibold text-primary'>
            Syncora
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

      <main className='container mx-auto mt-8 p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-5xl font-bold text-gray-800 mb-6 text-center'>Welcome to Syncora!</h1>
        <p className='text-lg text-gray-700 mb-6 text-center'>
          Unlock your potential and connect with a vibrant community eager to learn and share skills. Whether you're a seasoned expert or a curious beginner, Syncora is your gateway to endless possibilities.
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-gray-100 p-6 rounded-lg shadow-lg text-center'>
            <FaUsers className='text-4xl text-primary mb-4' />
            <h2 className='text-xl font-semibold mb-2'>Join a Community</h2>
            <p className='text-gray-600'>Connect with like-minded individuals and expand your network.</p>
          </div>
          <div className='bg-gray-100 p-6 rounded-lg shadow-lg text-center'>
            <FaLightbulb className='text-4xl text-primary mb-4' />
            <h2 className='text-xl font-semibold mb-2'>Share Knowledge</h2>
            <p className='text-gray-600'>Exchange skills and insights that can change lives.</p>
          </div>
          <div className='bg-gray-100 p-6 rounded-lg shadow-lg text-center'>
            <FaHandshake className='text-4xl text-primary mb-4' />
            <h2 className='text-xl font-semibold mb-2'>Collaborate & Grow</h2>
            <p className='text-gray-600'>Work together to develop new skills and achieve goals.</p>
          </div>
        </div>

        <div className='text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-4'>Ready to Get Started?</h2>
          <p className='text-lg text-gray-700 mb-6'>
            Join us today and become part of a movement that empowers everyone to learn and grow.
          </p>
          <Link to="/signup" className='inline-block bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition duration-200'>
            Sign Up Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Public;