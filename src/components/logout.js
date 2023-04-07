import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import axios from 'axios';
import { UserContext } from '../App';

export default function Logout() {
    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/logout', {
        }, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            navigate("/")
            dispatch({ type: "USER", payload: false })

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <>

        </>
    )
}