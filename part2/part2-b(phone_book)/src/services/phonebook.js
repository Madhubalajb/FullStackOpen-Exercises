import axios from 'axios';
//const url = 'http://localhost:3001/persons';
const url = 'https://limitless-falls-24071.herokuapp.com/api/persons'

const getData = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
}

const addData = (person) => {
    const request = axios.post(url, person);
    return request.then(response => response.data);
}

const deleteData = (person_id) => {
    const request = axios.delete(`${url}/${person_id}`);
    return request.then(response => response.data);
}

const updateData = (person_id, person) => {
    const request = axios.put(`${url}/${person_id}`, person);
    return request.then(response => response.data)
}

export default { getData, addData, deleteData, updateData }