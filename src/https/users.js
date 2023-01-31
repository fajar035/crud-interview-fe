import axios from "axios";

export const getUsers = ({ search, sort, by, page, limit }) => {
  const url = `${process.env.REACT_APP_HOST}api/users?search=${search}&sort=${sort}&by=${by}&page=${page}&limit=${limit}`;
  return axios.get(url);
};

export const addUser = (body) => {
  const url = `${process.env.REACT_APP_HOST}api/users`;
  return axios.post(url, body);
};

export const deleteUser = (id) => {
  const url = `${process.env.REACT_APP_HOST}api/users/${id}`;
  return axios.delete(url);
};

export const updateUser = (body, id) => {
  const url = `${process.env.REACT_APP_HOST}api/users/${id}`;
  return axios.patch(url, body);
};
