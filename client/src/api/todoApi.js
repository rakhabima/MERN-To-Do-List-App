import axios from 'axios';

const API_URL = 'http://localhost:6543/api/todos';

export const getTodos = async () => {
    const res = await axios.get(API_URL);
    return res.data.data;
};

export const createTodo = async (data) => {
    return axios.post(API_URL, data);
};

export const toggleTodo = async (id) => {
    return axios.patch(`${API_URL}/${id}`);
};

export const deleteTodo = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updateTodo = async (id, updatedData) => {
    return axios.put(`${API_URL}/${id}`, updatedData);
};
