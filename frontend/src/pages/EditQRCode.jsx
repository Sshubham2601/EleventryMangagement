import React, { useEffect, useState } from 'react';
import '../assets/GenerateQRCode.css';
import httpClient1 from '../utils/component'; // Assuming this is your HTTP client
import { useParams } from "react-router-dom";

function EditQRCode() {
  const params = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Assuming httpClient1 is correctly configured and used
      httpClient1.get(`/${params.id}`)
        .then(response => {
                  console.log("Response data:", response.data);
          setName(response.data.data.name);
          setDate(response.data.data.dateReceived.substring(0, 10));
          setQuantity(response.data.data.numberDispatched);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [params.id]);

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

  const onUpdateHandler = () => {
    if (name && date && quantity) {
      // Assuming httpClient1.put is correctly implemented
      httpClient1.put(`/${params.id}`, { name, dateDispatched: date, numberDispatched:quantity })
        .then(response => {
          console.log("Update response:", response.data);
          setSuccessMessage(true);
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    } else {
      setSuccessMessage(false);
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="generate-qr-container">
      <div className="generate-qr-box">
        <h2>Update QR Code</h2>
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
        <button onClick={onUpdateHandler}>Update QR</button>
        {successMessage && <p className="success-message">Success</p>}
      </div>
    </div>
  );
}

export default EditQRCode;
