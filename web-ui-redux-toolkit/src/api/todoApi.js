import axios from "./axiosClient";

const END_POINTS = {
  TODOS: "todo",
};

export const Add = (data) => axios.post(END_POINTS.TODOS, data);

export const GetAll = () => axios.get(END_POINTS.TODOS);

export const GetById = (id) => axios.get(`${END_POINTS.TODOS}/${id}`);

export const Update = (id, data) => axios.put(`${END_POINTS.TODOS}/${id}`, data);

export const Delete = (id) => axios.delete(`${END_POINTS.TODOS}/${id}`);
