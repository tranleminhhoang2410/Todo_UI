import axios from '../api/axios'

const END_POINTS = {
    TODO_ITEMS: 'TodoItems'
}

export const addTodoApi = (data) => {
    return axios.post(END_POINTS.TODO_ITEMS, data)
}

export const getTodoApi = () => {
    return axios.get(END_POINTS.TODO_ITEMS)
}

export const updateTodoApi = (id, data) => {
    return axios.put(`${END_POINTS.TODO_ITEMS}/${id}`, data)
}

export const deleteTodoApi = (id) => {
    return axios.delete(`${END_POINTS.TODO_ITEMS}/${id}`)
}