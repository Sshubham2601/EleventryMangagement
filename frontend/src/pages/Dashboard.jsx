import React, { useEffect, useState } from "react";
import "../assets/Dashboard.css";
import httpClient1 from "../utils/component";
import { useNavigate } from "react-router-dom";

function Dashboard({ isLogin }) {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const getData = (data) => {
    httpClient1
      .get("/")
      .then((response) => {
        // Handle successful response here
        console.log("response.data?.accessToken", response.data.data);
        if (response.data.data) setData(response.data.data);
        // Example: navigate to dashboard or set user state
      })
      .catch((error) => {
        // Handle error
        console.error("Items not available:", error);
        // Example: display error message to user
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    if (isLogin) navigate(`/edit-qr/${id}`);
    else navigate("/login");
  };
  const handleDelete = (id) => {
    if (isLogin)
      httpClient1
        .delete(`/${id}/`)
        .then((response) => {
          console.log("response.data?.accessToken", response.data.data);
          getData();
        })
        .catch((error) => {
          // Handle error
          console.error("Items not available:", error);
          // Example: display error message to user
        });
    else navigate("/login");
  };
  const download = (url) => {
    if (isLogin)
      fetch(url, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "image.png"); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else navigate("/login");
  };
  return (
    <div className="dashboard-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Items</th>
            <th>Status</th>
            <th>QR Code (Click to download)</th>
            <th>Admin Panel</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>
                  {item?.dateReceived}/{item?.numberReceived}
                </td>
                {item?.numberDispatched ? (
                  <td>
                    {item?.dateDispatch}/{item?.numberDispatched}
                  </td>
                ) : (
                  <td>--------</td>
                )}
                <td>{item?.balanceItems}</td>
                <td>{item?.status}</td>
                <td
                  onClick={() => {
                    download(item.qrCodeBase64);
                  }}
                >
                  <img src={item.qrCodeBase64} alt="QR Code" />
                </td>
                <td>
                  <span
                    className="edit-icon"
                    onClick={() => handleEdit(item._id)}
                  >
                    ✏️
                  </span>
                  <span
                    className="delete-icon"
                    onClick={() => handleDelete(item._id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
