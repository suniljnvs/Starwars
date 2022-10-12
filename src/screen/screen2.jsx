import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Screen2.css';
import logo from '../logo.png'

const Screen2 = () => {
    const [people, setPeople] = useState({});
    const [charImg, setCharImg] = useState('');
    const [films, setFilms] = useState([]);
    const { charId } = useParams();

    const peopleDetails = async (charId) => {
        const data = await axios.get(`https://swapi.dev/api/people/${charId}/`);
        setPeople(data.data);
        const imgData = await axios.get(`https://akabab.github.io/starwars-api/api/id/${charId}.json`);
        setCharImg(imgData.data.image);
    }

    const movies = async (filmsApi) => {
        if (filmsApi) {
            const promise = await Promise.allSettled(filmsApi.map(film => {
                return axios.get(film).then(res => res)
            }))
            setFilms(promise)
        }
    }

    useEffect(() => {
        peopleDetails(charId);
        movies(people.films);
    }, [charId, people.films]);

    return (
        <div className='screen2_main_container'>
            <Link to='/' ><img src={logo} alt='logo' className='logo_image' /> </Link>
            <div className='details_container'>
                <img src={charImg} alt={people.name} className='screen2_image' />
                <div className='details_content'>
                    {
                        people && <div>
                            <h3>Name: {people.name}</h3>
                            <h3>Birth Year: {people.birth_year}</h3>
                            <h3>Gender: {people.gender}</h3>
                            <h3>Height: {people.height}</h3>
                            <h3>Hair Color: {people.hair_color}</h3>
                            <h3>Skin Color: {people.skin_color}</h3>
                            <h3>Eye Color: {people.eye_color}</h3>
                        </div>
                    }
                </div>
                <div className='films_container'>
                    <h4>{people.name} Movies</h4>
                    {
                        films && films.map((film, i) => (
                            <div key={i}>{film.value.data.title}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Screen2