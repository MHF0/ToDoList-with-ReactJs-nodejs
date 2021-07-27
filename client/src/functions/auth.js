import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `/api/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const addToComplete = async (toDoListId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/complete`,
        { toDoListId },
        {
            headers: {
                authtoken,
            },
        }
    );

export const getComplete = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/completed`, {
        headers: {
            authtoken,
        },
    });

export const removeComplete = async (toDoListId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/complete/${toDoListId}`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );

export const removeFromHome = async (toDoListId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/remove/${toDoListId}`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );