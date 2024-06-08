import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import useRedirect from '../hooks/RedirectToLogin';
import { useUser } from '../components/UserContext';

const CreateMatch = () => {
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState("");
    const [date, setDate] = useState("");
    const { user } = useUser();
    
    useRedirect();

    const handleSaveMatch = async () => {
        setLoading(true);
        const data = {
            user1: user,
            user2: contact,
            date: date
        }

        try {
            await axios.post("http://localhost:1155/matches", data);
            setLoading(false);
            navigate("/home")
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
    <div className='p-4'>
        <BackButton destination='/home' />
        {
            loading ? (
                <div className='flex justify-center'>
                <ThreeDots fill="#000000" />
                </div>
            ) : (
                <div className='flex flex-col border 2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Contact</label>
                    <input type='text' value={contact} onChange={(e) => setContact(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                    <label className='text-xl mr-4 text-gray-500'>Date</label>
                    <input type='text' value={date} onChange={(e) => setDate(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                    </div>
                    <button className='p-2 bg--sky-300 m-8'onClick={handleSaveMatch}>Save</button>
                </div>
            )
        }
    </div>
    )
}

export default CreateMatch