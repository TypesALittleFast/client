
import axios from 'axios';
import { backendURL } from '../VarHost';


export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post(`${backendURL}/signup`, data, config);

    return response;
};


export const signin = async (data) => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',

    //     },

    // };

    const response = await axios.post(`${backendURL}/signin`,
    data,{withCredentials: true});

    return response;
};


export const updateUser = async (id, post) => {
    try {
        return await axios.patch(`${backendURL}/updateUser/${id}`, post);
        
    } catch(error) {
        console.log('Error while calling updateUser API ', error)
    }
}

export const uploadFile = async (dataF) => {
    console.log(dataF);
    try {
        return await axios.post(`${backendURL}/file/upload`, dataF);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}

export const MailSends = async (mData) => {
    try {
        return await axios.post(`${backendURL}/mailSend`,mData);
    } catch (error) {
        console.log('Error while Sending mail ', error);
    }
}