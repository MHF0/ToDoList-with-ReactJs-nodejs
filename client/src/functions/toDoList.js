import axios from 'axios';

export const getToDoLists = async ()=>
    await axios.get(`/api/home`);

export const getToDoList = async (slug) =>
    await axios.get(`/api/home/${slug}`);

export const removeToDoList = async (slug, authtoken) =>
    await axios.delete(`/api/home/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const updateToDoList = async (slug, toDoList, authtoken) =>
    await axios.put(`/api/home/${slug}`, toDoList, {
        headers: {
            authtoken,
        },
    });

export const createToDoList = async (toDoList, authtoken) =>
    await axios.post(`/api/home`, toDoList, {
        headers: {
            authtoken,
        },
    });