import axios from 'axios';
const url = '/api/persons'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getData = async () => {
    const response = await axios.get(url)
    return response.data
}

const addData = async (person) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(url, person, config)
    return response.data
}

const deleteData = async (person_id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${url}/${person_id}`, config)
    return response.data
}

const updateData = async (person_id, person) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${url}/${person_id}`, person, config);
    return response.data
}

export default { setToken, getData, addData, deleteData, updateData }