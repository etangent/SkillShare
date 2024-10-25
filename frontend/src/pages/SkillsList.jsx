import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loading-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { useUser  } from '../components/UserContext';
import useRedirect from '../hooks/RedirectToLogin';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';

const SkillsList = () => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [mySkills, setMySkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillType, setSkillType] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState("");
    const [mySkill, setMySkill] = useState("");
    const { user, logout } = useUser ();
    const location = useLocation();
    const navigate = useNavigate();
    const focusOptions = ["Tech", "Art", "Wellness", "Sports"];

    useRedirect();

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:1155/skills/");
            setSkills(response.data.data);
            setFilteredSkills(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:1155/skills/mySkills', { withCredentials: true })
            .then(response => {
                setMySkills(response.data.skills);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
      }, []);

    useEffect(() => {
        if (skillType === 'All') {
            setFilteredSkills(skills);
        } else {
            const lowerCaseSkillType = skillType.toLowerCase();
            const filtered = skills.filter(skill => skill.focus.toLowerCase() === lowerCaseSkillType);
            setFilteredSkills(filtered);
        }
    }, [skillType, skills]);

    const handleTypeChange = (event) => {
        setSkillType(event.target.value);
    };

    const handleRequest = async (recipientId) => {
        if (!recipientId) {
            console.log("No recipient selected");
            return;
        }

        setLoading(true);
        console.log(mySkill);
        try {
            await axios.post("http://localhost:1155/matches/request", {
                requesterId: mySkill,
                recipientId: recipientId,
            }, { withCredentials: true });
            alert("Request sent successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to send request.");
        }
        setLoading(false);
        setShowModal(false);
    };

    const renderModal = () => {
        const renderOptions = () => (
            <>
                {filteredSkills.map(skill => (
                    <option key={skill._id} value={skill._id}>{skill.title}</option>
                ))}
            </>
        );

        const renderMyOptions = () => (
            <>
                {mySkills.map(skill => (
                    <option key={skill._id} value={skill._id}>{skill.title}</option>
                ))}
            </>
        );

        return (
            <Modal render={() => (
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Send Request</h2>
                    <h2 className='font-semibold'>Chosen Skill</h2>
                    <Dropdown
                        value={selectedSkill}
                        onChange={(value) => setSelectedSkill(value)}
                        renderOptions={renderOptions}
                        className="flex flex-col mb-4"
                    />
                    <h2 className='font-semibold'>Offered Skill</h2>
                    <Dropdown
                    value={mySkill}
                    onChange={(value) => setMySkill(value)}
                    renderOptions={renderMyOptions}
                    className="flex flex-col mb-4"
                    />
                    <button
                        className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
                        onClick={() => handleRequest(selectedSkill)}
                    >
                        Confirm Request
                    </button>
                </div>
            )} onClose={() => setShowModal(false)} />
        );
    };

    return (
        <div className='min-h-screen bg-background flex flex-col'>
            <header className='bg-white shadow-md'>
                <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                    <Link to="/" className='text-2xl font-semibold text-primary'>
                        Syncora
                    </Link>
                    <nav className='flex items-center space-x-6'>
                        <Link to='/home?view=dashboard' className={`text-lg font-medium ${location.search === '?view=dashboard' ? 'text-primary underline underline-offset-4' : 'text-gray-600 hover:text-primary transition duration-200'}`}>
                            Dashboard
                        </Link>
                        <Link to='/home?view=matchfinding' className={`text-lg font-medium ${location.search === '?view=matchfinding' ? 'text-primary underline underline-offset-4' : 'text-gray-600 hover:text-primary transition duration-200'}`}>
                            Matchfinding
                        </Link>
                        <Link to="/skills" className={`text-lg font-medium ${location.pathname === '/skills' ? 'text-primary underline underline-offset-                        4' : 'text-gray-600 hover:text-primary transition duration-200'}`}>
                            Skills
                        </Link>
                        <Link to='../skills/create' className={`text-lg font-medium ${location.pathname === '/mission' ? 'text-primary underline underline-offset-4' : 'hover:text-primary transition duration-200'}`} aria-label='Create Skill'>
                            <MdAdd size={28} />
                        </Link>
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
                                    <div key={skill._id} className='bg-white border p-4 rounded-lg shadow-md'>
                                        <h2 className='text-xl font-semibold'>{skill.title}</h2>
                                        <p className='text-gray-600'>{skill.description}</p>
                                        <p className='text-gray-500'>Focus: {skill.focus}</p>
                                        <button
                                            onClick={() => {
                                                setSelectedSkill(skill._id);
                                                setShowModal(true);
                                            }}
                                            className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
                                        >
                                            Send Request
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className='text-center'>No skills available.</p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {showModal && renderModal()}
        </div>
    );
};

export default SkillsList;