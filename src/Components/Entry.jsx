import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';

import axios from 'axios';

function Entry({ item_id, item_name, purchased, fetchData }) {

    const handleRemove = async () => {
        console.log('Remove button clicked');
        try {
            await axios.post('/api/remove_item', { item_id : item_id, item_name : item_name});
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        {purchased == false ?
            <tr>
                <td className='p-2' >{item_name}</td>
                {/* <td ><Button variant='danger'><FontAwesomeIcon icon={faXmark} /></Button></td> */}
                <td><Button onClick={handleRemove} variant='danger'>Remove</Button></td>
              </tr>
        : null}
        </>
    );
}

export default Entry;