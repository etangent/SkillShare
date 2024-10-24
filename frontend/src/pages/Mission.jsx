import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Mission = () => {
  const location = useLocation();

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

      <main className='container mx-auto mt-8 p-4 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-4'>Our Mission</h1>
        <p className='text-lg text-gray-700 mb-4'>
          The divide between classes is due to one main issue: the accessibility of knowledge. We live in a world where those with access to the most knowledge and the best ways to learn thrive, while others, who may have the potential to excel, are left behind. This is why we created SkillMatcher, an app designed for those who are hungry—not just for food, but for knowledge.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          SkillMatcher aims to tackle this problem with an efficient and thoughtful system. Many people cannot afford specialized courses for skills they wish to learn. Everyone possesses knowledge and skills gained from their unique life experiences, which are often more valuable than any monetary course. SkillMatcher opens a world of possibilities for individuals to transform their lives without conforming to the limitations of their circumstances.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          We believe it is time for people to work together in harmony, developing ourselves and others to improve everyone's quality of life. Our inspiration is ensuring that everyone has access to the opportunities that can change their lives for the better.
        </p>

        <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>What is SkillMatcher?</h2>
        <p className='text-lg text-gray-700 mb-4'>
          SkillMatcher is a social media platform designed to facilitate the sharing of abilities and hobbies among a diverse group of people. Users can create accounts with multiple “skills” that represent their abilities, categorized for easy navigation. The app features a scrolling interface that recommends skills based on user preferences.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          When users find a skill that interests them, they can make a request along with a skill they are willing to teach. If the request is accepted, a chat interface is provided for planning online meetups to teach each other their respective skills.
        </p>
      </main>
    </div>
  );
};

export default Mission;