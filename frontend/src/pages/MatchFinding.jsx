import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';

const MatchFinding = () => {
    const [loading, setLoading] = useState(false);
    const [currMatch, setCurrMatch] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [skills, setSkills] = useState([]);
    const [mySkill, setMySkill] = useState("");

    const handleRequest = async () => {
        if (!currMatch.user) {
            console.log(currMatch);
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:1155/matches/request", {
                requesterId: mySkill,
                recipientId: currMatch._id,
            }, { withCredentials: true });
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const findMatch = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:1155/skills/search", { withCredentials: true });

            setCurrMatch(response.data.skill);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        findMatch(); // Fetch the first skill on component mount
    }, []);

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:1155/skills/mySkills', { withCredentials: true })
          .then(response => {
              setSkills(response.data.skills);
          })
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
    }, []);

    const renderModal = useCallback(() => {
        if (skills.length === 0) {
            alert("You need a skill!");
            return;
        }

        const renderOptions = () => (
            <>
                {skills.map(skill => (
                    <option key={skill._id} value={skill._id}>{skill.title}</option>
                ))}
            </>
        );

        return (
            <Modal render={() => (
                <div>
                    <Dropdown
                        value={mySkill}
                        onChange={(value) => setMySkill(value)}
                        renderOptions={renderOptions}
                        className="flex flex-col w-24"
                    />
                    <button className='my-3' onClick={handleRequest}>Confirm</button>
                </div>
            )} onClose={() => setShowModal(false)} />
        );
    }, [skills, mySkill]);
    
      useEffect(() => {
        findMatch();
      }, []);
    
      return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
          {loading ? (
            <div className='flex justify-center'>
              <ThreeDots fill='#7E60BF' />
            </div>
          ) : (
            <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center'>
              {showModal && renderModal()}
              {currMatch.user ? (
                <div>
                    <h1 className='text-4xl font-bold mb-3'>User: {currMatch.user.username}</h1>
                    <h2 className='text-3xl font-semibold mb-3'>Skill: {currMatch.title}</h2>
                    <p className='text-2xl mb-3'>Focus: {currMatch.focus}</p>
                    <p className='text-2xl mb-3'>Description: {currMatch.description}</p>
                </div>
              ) : (
                <p>Find a Match</p>
              )}
              <div className='space-y-4'>
                <button
                  onClick={() => {
                    findMatch();
                  }}
                  className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
                >
                  Search for Match
                </button>
                <button
                  onClick={() => {setShowModal(true)}}
                  className='w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-md transition duration-200'
                >
                  Send Request
                </button>
              </div>
            </div>
          )}
        </div>
      );
};

export default MatchFinding;