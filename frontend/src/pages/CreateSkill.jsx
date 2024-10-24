import React, { useState, useEffect } from 'react';
import BackButton from "../components/BackButton";
import { useUser } from '../components/UserContext';
import { ThreeDots } from 'react-loading-icons';
import useRedirect from '../hooks/RedirectToLogin';
import { MdAdd } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

const CreateSkill = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();
  const focusOptions = ["Tech", "Art", "Wellness", "Sports"];

  useRedirect();

  const handleSaveSkill = async () => {
    setErrorMessage("");
    if (!title || !focus || !description) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:1155/skills/create",
        { title, description, focus },
        { withCredentials: true }
      );
      setTitle("");
      setFocus("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while saving the skill.");
    }
    setLoading(false);
  };

  const {logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showState, setShowState] = useState('none');

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <header className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          {/* Logo or App Name */}
          <Link to="/" className='text-2xl font-semibold text-primary'>
           Syncora
          </Link>

          {/* Navigation */}
          <nav className='flex items-center space-x-6'>
            <Link to='/home?view=dashboard' // Redirect to Home with a query parameter for Dashboard
            className={`text-lg font-medium ${
            location.search === '?view=dashboard'
              ? 'text-primary underline underline-offset-4'
              : 'text-gray-600 hover:text-primary transition duration-200'
            }`}
            >
            Dashboard
            </Link>

            <Link
              to='/home?view=matchfinding' // Redirect to Home with a query parameter for Matchfinding
              className={`text-lg font-medium ${
              location.search === '?view=matchfinding'
              ? 'text-primary underline underline-offset-4'
              : 'text-gray-600 hover:text-primary transition duration-200'
              }`}
            >
            Matchfinding
            </Link>
            <Link to="/skills" 
                        className={`text-lg font-medium ${location.pathname === '/skills' ? 'text-primary underline underline-offset-4' : 'text-gray-600 hover:text-primary transition duration-200'}`}
                        >
                        Skills
                        </Link>
            <Link
              to='../skills/create'
              className={`text-lg font-medium ${location.pathname === '/mission' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`}
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
  
    <div className='flex-grow flex items-center justify-center '>
      {loading || !user ? (
        <div className='flex justify-center'>
          <ThreeDots fill="#7E60BF" />
        </div>
      ) : (
        <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
          <BackButton destination="/home" />
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
            Create New Skill
          </h2>
          {errorMessage && (
            <div className='text-red-500 text-sm mb-4 text-center'>
              {errorMessage}
            </div>
          )}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Title
              </label>
              <input
                type='text'
                maxLength='25'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter skill title'
                className='border-2 border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full px-3 py-2 transition duration-200'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Focus
              </label>
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className='border-2 border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full px-3 py-2 transition duration-200'
              >
                <option value='' disabled>
                  Select focus area
                </option>
                {focusOptions.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                maxLength='500'
                rows='6'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Describe your skill'
                className='border-2 border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full px-3 py-2 transition duration-200 resize-none'
              />
            </div>
            <button
              onClick={handleSaveSkill}
              className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default CreateSkill;