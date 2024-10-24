import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loading-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { useUser  } from '../components/UserContext'; // Assuming you have a UserContext for user state management
import useRedirect from '../hooks/RedirectToLogin';

const SkillsList = () => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillType, setSkillType] = useState('All');
    const { user, logout } = useUser (); // Get user info and logout function
    const location = useLocation();
    const navigate = useNavigate();
    const focusOptions = ["Tech", "Art", "Wellness", "Sports"];

    useRedirect(); // Redirect to login if not authenticated

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:1155/skills/"); // Adjust the endpoint as necessary
            setSkills(response.data.data); // Assuming the response structure has a 'data' field
            setFilteredSkills(response.data.data); // Initialize filtered skills
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    useEffect(() => {
        // Filter skills based on selected type
        if (skillType === 'All') {
            setFilteredSkills(skills);
        } else {
            const lowerCaseSkillType = skillType.toLowerCase(); // Convert to lowercase
            const filtered = skills.filter(skill => skill.focus.toLowerCase() === lowerCaseSkillType); // Compare in lowercase
            setFilteredSkills(filtered);
        }
    }, [skillType, skills]);

    const handleTypeChange = (event) => {
        setSkillType(event.target.value);
    };

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

                        <Link to='/home?view=matchfinding' // Redirect to Home with a query parameter for Matchfinding
                            className={`text-lg font-medium ${
                                location.search === '?view=matchfinding'
                                    ? 'text-primary underline underline-offset-4'
                                    : 'text-gray-600 hover:text-primary transition duration-200'
                            }`}
                        >
                            Matchfinding
                        </Link>

                        <Link to="/skills" 
                        className={`text-lg font-medium ${location.pathname === '/skills' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`}
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

            {/* Main Content */}
            <div className='container mx-auto p-4 flex-grow'>
                {loading ? (
                    <div className='flex justify-center'>
                        <ThreeDots fill='#7E60BF' />
                    </div>
                ) : (
                    <>
                        <h1 className='text-4xl font-bold text-center mb-6'>All Skills</h1>
                        <div className='mb-4'>
                        <label htmlFor='skillType' className='text-lg font-semibold'>Filter by Skill Type: </label>
                            <select
                                id='skillType'
                                value={skillType}
                                onChange={handleTypeChange}
                                className='ml-2 p-2 border rounded-md'
                            >
                                <option value='All'>All</option>
                                {focusOptions.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {filteredSkills.length > 0 ? (
                                filteredSkills.map(skill => (
                                    <div key={skill._id} className='border p-4 rounded-lg shadow-md'>
                                        <h2 className='text-xl font-semibold'>{skill.title}</h2>
                                        <p className='text-gray-600'>{skill.description}</p>
                                        <p className='text-gray-500'>Focus: {skill.focus}</p> {/* Display focus */}
                                    </div>
                                ))
                            ) : (
                                <p className='text-center'>No skills available.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SkillsList;