import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BasicPagination from '../component/pagination/Pagination';
import './Screen1.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import logo from '../logo.png'


const Screen1 = () => {
    const getLocalItems = localStorage.getItem('favChar') !== null ? JSON.parse(localStorage.getItem('favChar')) : []
    const [char, setChar] = useState([]);
    const [fav, setFav] = useState(getLocalItems);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    let navigate = useNavigate();

    const charFunction = async () => {
        const charData = await axios.get(`https://akabab.github.io/starwars-api/api/all.json`);
        setChar(charData.data);
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = char.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(char.length / recordsPerPage)

    useEffect(() => {
        charFunction();
    }, []);

    const charDetails = (id) => {
        navigate(`/details/${id}`);
    }

    function handleFav(list) {
        setFav([...fav, list])
    }

    useEffect(() => {
        localStorage.setItem('favChar', JSON.stringify([...new Set(fav)]));
    }, [fav])

    function favList() {
        navigate('/favourites');
    }

    return (
        <div className='main_container'>
            <br></br>
            <img src={logo} alt='logo' className='logo_image_main' />
            <div className='saved_list_button'>
                <Button style={{
                    color: 'white',
                    backgroundColor: 'red', fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                    variant="contained"
                    onClick={favList}
                >Saved People</Button></div>
            <BasicPagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
            <div className='characters_container'>
                {
                    currentRecords && currentRecords.map(list => (
                        <div className='char_container' key={list.id}>

                            <div onClick={() => charDetails(list.id)} className='image_container'>
                                <img src={list.image} alt={list.name} className='image' />
                                <h2 >{list.name}</h2>
                            </div>
                            <abbr title='Mark as favourite'>
                                <IconButton
                                    className='fav_button'
                                    aria-label="saved"
                                    onClick={() => handleFav(list)}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </abbr>
                        </div>
                    ))
                }
            </div >

        </div >
    )
}

export default Screen1