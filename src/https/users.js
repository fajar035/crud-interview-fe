import axios from "axios";

export const getUsers = (props) => {
  const params = new URLSearchParams(props).toString();
  const url = `${process.env.REACT_APP_HOST}api/users?${params}`;
  return axios.get(url);
};

export const getUserById = (id) => {
  const url = `${process.env.REACT_APP_HOST}api/users/${id}`;
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
