import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loading-icons';
import { useUser } from '../components/UserContext';
import Modal from '../components/Modal';
import { MdCheck, MdClose, MdChat, MdSend, MdHelp } from 'react-icons/md'

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [outgoing, setOutgoing] = useState([]);
  const [currOutgoing, setCurrOutgoing] = useState([]);
  const [showOutgoing, setShowOutgoing] = useState(false);
  const [incoming, setIncoming] = useState([])
  const [currIncoming, setCurrIncoming] = useState({})
  const [showIncoming, setShowIncoming] = useState(false)
  const [approved, setApproved] = useState([])
  const [currApproved, setCurrApproved] = useState({});
  const [showApproved, setShowApproved] = useState(false);
  const [currChat, setCurrChat] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [currMessage, setCurrMessage] = useState('');
  const { user } = useUser();

  async function fetchData() {
    if (!user) {
      return;
    }

    setLoading(true);
    try {

      setLoading(true)

      const responseIn = await axios.get("http://localhost:1155/matches/incoming", { withCredentials: true });
      setIncoming(responseIn.data.incoming);

      const responseOut = await axios.get("http://localhost:1155/matches/outgoing", { withCredentials: true });
      setOutgoing(responseOut.data.outgoing);

      const responseApp = await axios.get("http://localhost:1155/matches/approved", { withCredentials: true });
      setApproved(responseApp.data.approved);

      const responseReject = await axios.get("http://localhost:1155/matches/rejected", { withCredentials: true });
      responseReject.data.rejected.forEach((match) => {
        alert(`${match.recipient.user.username} rejected your request`);
      })

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  const renderRequest = useCallback(() => {
    const render = () => (
      <div>
        <h1 className='font-semibold'>Offered Skill: {currIncoming.requester.title}</h1>
        <h2>requester: {currIncoming.requester.user.username}</h2>
        <p>focus: {currIncoming.requester.focus}</p>
        <p>description: {currIncoming.requester.description}</p>
        <p className='font-semibold'>Requested Skill: {currIncoming.recipient.title}</p>
        <br />
        <div className='flex justify-between'>
          <MdCheck onClick={handleApprove} className='text-green-700 cursor-pointer'></MdCheck>
          <MdClose onClick={handleReject} className='text-red-600 cursor-pointer'></MdClose>
        </div>
      </div>

    )

    return (
      <Modal render={render} onClose={() => setShowIncoming(false)} />
    )
  }, [currIncoming, showIncoming])

  const renderOutgoing = useCallback(() => {
    const render = () => (
      <div>
        <h1 className='font-semibold'>Offered Skill: {currOutgoing.requester.title}</h1>
        <h2>recipient: {currOutgoing.recipient.user.username}</h2>
        <p className='font-semibold'>Requested Skill: {currOutgoing.recipient.title}</p>
        <p>focus: {currOutgoing.recipient.focus}</p>
        <p>description: {currOutgoing.recipient.description}</p>
        <br />
      </div>

    )

    return (
      <Modal render={render} onClose={() => setShowOutgoing(false)} />
    )
  }, [currOutgoing, showOutgoing])

  const handleReject = async () => {
    setLoading(true)
    try {
      await axios.post("http://localhost:1155/matches/reject", { matchId: currIncoming._id }, { withCredentials: true })
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("failure");
    }
    setLoading(false)
  }

  const handleApprove = async () => {
    setLoading(true)
    try {
      await axios.post("http://localhost:1155/matches/approve", { matchId: currIncoming._id }, { withCredentials: true })
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("failure");
    }
    setLoading(false)
  }

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true)
      const response = await axios.get('http://localhost:1155/matches/approved', { withCredentials: true });
      setApproved(response.data.approved);
      setLoading(false)
    }

    fetchApproved();
  }, [])

  const renderApproved = useCallback(() => {
    const render = () => (
      <div>
        <h1 className='font-semibold'>Offered Skill: {currApproved.requester.title}</h1>
        <h2>requester: {currApproved.requester.user.username}</h2>
        <p>focus: {currApproved.requester.focus}</p>
        <p>description: {currApproved.requester.description}</p>
        <p className='font-semibold'>Requested Skill: {currApproved.recipient.title}</p>
        <br />
        <div className='flex justify-center items-center'>
          <MdChat onClick={() => {
            setShowApproved(false);
            setShowIncoming(false);
            setShowChat(true);
          }} className='cursor-pointer' />
        </div>
      </div>

    )

    return (
      <Modal render={render} onClose={() => setShowApproved(false)} />
    )
  }, [currApproved, setCurrApproved])

  useEffect(() => {
    if (!showChat) {
      return;
    }

    const fetchChat = async () => {
      setLoading(true)
      const recieverId = currApproved.requester.user._id == user._id ? currApproved.recipient.user._id : currApproved.requester.user._id;
      try {
        const response = await axios.post("http://localhost:1155/chatting/confirm", { recieverId, matchId: currApproved._id }, { withCredentials: true })
        setCurrChat(response.data.chat);
      } catch (error) {
        console.log(error);
        alert('error');
      }
      setLoading(false)
    }

    fetchChat();
  }, [showChat])

  const renderChat = useCallback(() => {
    if (Object.keys(currChat) == 0) {
      return;
    }

    const render = () => (
      <div>
        {currChat.messages.map((message) => (
          <div key={message._id} className={message.sender == user.username ? 'text-end' : 'text-start'}>
            <div className='m-4'>
              <h1 className='font-semibold'>{message.sender}</h1>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div className='flex items-center justify-between'>
          <input
            type="text"
            placeholder="Type your message here"
            value={currMessage}
            onChange={(e) => setCurrMessage(e.target.value)}
            className="border-2 border-black rounded-md my-2 p-1 w-full"
          />
          <MdSend onClick={handleSend} className='text-2xl ml-2 cursor-pointer' />
        </div>
      </div>
    )

    return (
      <Modal render={render} onClose={() => {
        setShowChat(false);
        setShowApproved(true);
        setCurrMessage('');
      }} />
    )
  }, [showChat, currChat, currMessage])

  const handleSend = async () => {
    if (!currMessage || !currChat) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1155/chatting/send', { message: currMessage, chatId: currChat._id }, { withCredentials: true });
      setCurrChat(response.data.chat);
      setCurrMessage('');
    } catch (error) {
      console.log(error);
      alert('error');
    }
    setLoading(false);
  }

  return (
    <div className='min-h-screen bg-background p-4'>
      {loading || !user ? (
        <div className='flex justify-center my-20'>
          <ThreeDots fill='#7E60BF' />
        </div>
      ) : (
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-3xl font-semibold text-gray-800 text-center mb-8'>
            Dashboard
          </h1>

          {showIncoming && renderRequest()}
          {showOutgoing && renderOutgoing()}
          {showApproved && renderApproved()}
          {showChat && renderChat()}

          {/* Outgoing and Incoming Requests */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Outgoing Requests */}
            <div>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
                Outgoing Requests
              </h2>
              <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='min-w-full'>
                  <thead className='bg-primary text-white'>
                    <tr>
                      <th className='px-4 py-2 text-left'>#</th>
                      <th className='px-4 py-2 text-left'>Contact</th>
                      <th className='px-4 py-2 text-left'>More Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outgoing.length > 0 ? (
                      outgoing.map((match, index) => (
                        <tr key={match._id} className='border-b'>
                          <td className='px-4 py-2'>{index + 1}</td>
                          <td className='px-4 py-2'>{match.recipient.user.username}</td>
                          <td className='px-4 py-2 flex justify-center space-x-4'><MdHelp onClick={() => {
                          setCurrOutgoing(match);
                          setShowOutgoing(true);
                        }} className='cursor-pointer'>More info</MdHelp>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className='px-4 py-2' colSpan='3'>
                          No outgoing requests.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Incoming Requests */}
            <div>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
                Incoming Requests
              </h2>
              <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='min-w-full'>
                  <thead className='bg-primary text-white'>
                    <tr>
                      <th className='px-4 py-2 text-left'>#</th>
                      <th className='px-4 py-2 text-left'>Contact</th>
                      <th className='px-4 py-2 text-left'>More Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incoming.length > 0 ? (
                      incoming.map((match, index) => (
                        <tr key={match._id} className='border-b'>
                          <td className='px-4 py-2'>{index + 1}</td>
                          <td className='px-4 py-2'>{match.requester.user.username}</td>
                          <td className='px-4 py-2 flex justify-center space-x-4'><MdHelp onClick={() => {
                          setCurrIncoming(match);
                          setShowIncoming(true);
                        }} className='cursor-pointer'>More info</MdHelp>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className='px-4 py-2' colSpan='4'>
                          No incoming requests.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Approved Requests */}
          <div className='mt-12'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
              Approved Requests
            </h2>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-primary text-white'>
                  <tr>
                    <th className='px-4 py-2 text-left'>#</th>
                    <th className='px-4 py-2 text-left'>Contact</th>
                    <th className='px-4 py-2 text-left'>More Info</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.length > 0 ? (
                    approved.map((match, index) => (
                      <tr key={match._id} className='border-b'>
                        <td className='px-4 py-2'>{index + 1}</td>
                        <td className='px-4 py-2'>
                          {user._id === match.recipient._id
                            ? match.requester.user.username
                            : match.recipient.user.username}
                        </td>
                        <td className='px-4 py-2 flex justify-center space-x-4'><MdHelp onClick={() => {
                          setCurrApproved(match);
                          setShowApproved(true);
                        }} className='cursor-pointer'>More info</MdHelp>
                          </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='px-4 py-2' colSpan='3'>
                        No approved requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;