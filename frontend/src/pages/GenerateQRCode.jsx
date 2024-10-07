import React, { useState } from 'react';
import '../assets/GenerateQRCode.css';
import httpClient1 from '../utils/component';

function GenerateQRCode() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const nameList = [
    { title: 'C1', value: 'c1' },
    { title: 'C2', value: 'c2' },
    { title: 'C3', value: 'c3' },
    { title: 'C4', value: 'c4' },
    { title: 'C5', value: 'c5' },
  ];

  const onSelectHandler = (e) => {
    setName(e.target.value);
  };

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const onGenerateHandler = () => {
    if (name && date && quantity) {
      console.log("Value",name ,date , quantity)
      httpClient1.post('/',{name:name,dateReceived:date, quantity:quantity})
    .then(response => {
        // Handle successful response here
        console.log("response.data?.accessToken",response.data.data)
        if(response.data.data)
        setSuccessMessage(true);
        // Example: navigate to dashboard or set user state
    })
    .catch(error => {
        // Handle error
        console.error('Items not available:', error);
        // Example: display error message to user
    });
      // Here you can add the logic to generate the QR code.
    } else {
      setSuccessMessage(false);
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="generate-qr-container">
      <div className="generate-qr-box">
        <h2>Generate QR Code</h2>
        <select className="select" onChange={onSelectHandler} name="name" value={name}>
          <option value="" disabled>Select a name</option>
          {nameList.map((item, index) => (
            <option value={item.value} key={index}>
              {item.title}
            </option>
          ))}
        </select>
        <input type="date" placeholder="Date" value={date} onChange={onDateChange} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={onQuantityChange} />
        <button onClick={onGenerateHandler}>Generate QR</button>
        {successMessage && <p className="success-message">Success</p>}
      </div>
    </div>
  );
}

export default GenerateQRCode;
