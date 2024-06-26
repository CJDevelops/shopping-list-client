import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Input from './Components/Input';
import Entry from './Components/Entry';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/api/shopping');
    setData(response.data);
    console.log("Data fetched");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center">Shopping List 🛒</h1>
        <Table borderless className="text-center align-middle">
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