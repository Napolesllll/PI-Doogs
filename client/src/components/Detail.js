import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index.js';
import { useEffect } from 'react';

import '../styles/Detail.css'

export default function Detail(props){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));   //accedo al id pasandole props a mi componente Detail
    }, [dispatch, props]);

    const myDog = useSelector((state) => state.detail) // me traigo el estado detail desde el reducer con useSelector

    return (
        <div className='backDetail' >
            {
                myDog.length > 0 ?
                <div className='detail'>
                    <div>
                    <img className="imgDetail"src= {myDog[0].image? myDog[0].image : myDog[0].img} alt="not found"/>
                    </div>
                    <div className='detailInfo'>
                    <h1>{myDog[0].name}</h1>
                    <h3>Weight:{myDog[0].weight}</h3>
                    <h3>Height:{myDog[0].height}</h3>
                    <h3>Life span:{myDog[0].life_span}</h3>
                    <ul className='ulDetail'>
                    Temperaments: →  
                    {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].Temperaments.map(el => el.name + (", "))}
                    </ul>

            <Link to= '/home'>
                <button className='back'>Back</button>
            </Link>
                    </div>
                </div> : <p className='loading'></p>
            }
        </div>
    )
}