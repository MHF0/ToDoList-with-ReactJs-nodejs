import axios from 'axios';

export const getToDoLists = async ()=>
    await axios.get(`${process.env.REACT_APP_API}/toDoList`);

export const getToDoList = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/toDoList/${slug}`);

export const removeToDoList = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/toDoList/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const updateToDoList = async (slug, toDoList, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/toDoList/${slug}`, toDoList, {
        headers: {
            authtoken,
        },
    });

export const createToDoList = async (toDoList, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/toDoList`, toDoList, {
        headers: {
            authtoken,
        },
    });