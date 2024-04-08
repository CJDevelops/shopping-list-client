import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Input from './Components/Input';
import Entry from './Components/Entry';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

function App() {
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState(() => Cookies.get('bgColor') || '#212529');

  const fetchData = async () => {
    const response = await axios.get('/api/shopping');
    setData(response.data);
    console.log("Data fetched");
  };

  useEffect(() => {
    fetchData();
    
    const savedColor = Cookies.get('bgColor') || '#212529';
    document.body.style.backgroundColor = savedColor;
    const tableElement = document.querySelector('.main-table'); 
    tableElement.classList.add('custom-table-bg'); 
    document.documentElement.style.setProperty('--custom-bg-color', savedColor);
  }, []);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    console.log(newColor);
    setBgColor(newColor);
    Cookies.set('bgColor', newColor);
    
    // Change the background color of the HTML body
    document.body.style.backgroundColor = newColor;
  
    // Change the background color of Bootstrap table
    const tableElement = document.querySelector('.main-table'); 
    tableElement.classList.add('custom-table-bg'); 
    document.documentElement.style.setProperty('--custom-bg-color', newColor);
  };

  return (
    <>
      <Container>
        <Stack direction="horizontal" gap={3} style={{ display: 'flex' }}>

          <h1 className="text-center" style={{ flexGrow: 1 }}>Shopping List 🛒</h1>
          <Form.Control className='ms-auto' type="color" id="exampleColorInput" defaultValue={bgColor} title="Choose your color" onChange={handleColorChange} />
          
        </Stack>
        <Table borderless className="main-table text-center align-middle">
          <tbody>
            {data.map(item => (
              <Entry key={item.item_id} item_id={item.item_id} item_name={item.item_name} purchased={item.purchased} fetchData={fetchData} />
            ))}
          </tbody>
        </Table>
        <Input fetchData={fetchData} />
      </Container>
    </>
  );
}

export default App;