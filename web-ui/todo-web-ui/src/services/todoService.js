import axios from '../api/axios'

const END_POINTS = {
    TODO_ITEMS: 'TodoItems'
}

export const getTodoApi = () => {
    return axios.get(END_POINTS.TODO_ITEMS)
}

export const addTodoApi = (data) => {
    return axios.post(END_POINTS.TODO_ITEMS, data)
}

// export const deleteTodoApi = (id) => {
//     return axios.delete(`${END_POINTS.TODO_ITEMS}/${id}`)
// }