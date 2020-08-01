import axios from "axios";

const appID = 'TRwlDL5wNVLkuOBWi8zu'

export const getUsers = async () => {
    const res = await axios.get("https://dummyapi.io/data/api/user", {
        headers: {
            "app-id": appID
        }
    })
    return await res.data.data;
};

export const getUserById = async (id) => {
    const res = await axios.get(`https://dummyapi.io/data/api/user/${id}`, {
        headers: {
            "app-id": appID
        }
    })
    return await res.data;
};

export const getUserPost = async (id) => {
    const res = await axios.get(`https://dummyapi.io/data/api/user/${id}/post`, {
        headers: {
            "app-id": appID
        }
    })
    return await res.data.data;
}

export const getPostbyTag = async (tag) => {
    const res = await axios.get(`https://dummyapi.io/data/api/tag/${tag}/post/`, {
        headers: {
            "app-id": appID
        }
    })
    return await res.data.data;
}

export const getPostComment = async (postID) => {
    const res = await axios.get(`https://dummyapi.io/data/api/post/${postID}/comment`, {
        headers: {
            "app-id": appID
        }
    })
    return await res.data.data
}