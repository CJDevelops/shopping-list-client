import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import axios from 'axios';
import { useState } from 'react';

function Input({ fetchData }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            try {
                console.log(inputValue);
                await axios.post('/api/add_item', { item_name : inputValue });
                setInputValue('');
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Form onSubmit={handleButtonClick} className="mb-3" >
            <InputGroup className="mb-3">
                <Form.Control value={inputValue} onChange={handleInputChange} />
                <Button variant="success" onClick={handleButtonClick}>Add</Button>
            </InputGroup>
        </Form>
    );
}


export default Input;