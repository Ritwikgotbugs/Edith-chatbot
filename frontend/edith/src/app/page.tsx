'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [expressData, setExpressData] = useState(null);
  const [flaskData, setFlaskData] = useState(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send', { text: inputValue });
      setResponseMessage(response.data.message);
      const res= await axios.get('http://localhost:8000/users');
      console.log(res.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  useEffect(() => {
    //Express
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .then(response => {
        setExpressData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching Express data:', error);
      });

    //Flask
    axios.get(`${process.env.NEXT_PUBLIC_FLASK_URL}/data`)
      .then(response => {
        setFlaskData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching Flask data:', error);
      });
  }, []);

  return (
    <div>
      <p>Express: {expressData}</p>
      <p>Flask: {flaskData}</p>
      <div>
      <input
        className='text-black'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a string"
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{responseMessage}</p>
    </div>
    </div>
  );
}
