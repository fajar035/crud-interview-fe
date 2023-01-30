import axios from "axios";

export const getUsers = ({ search, sort, by, page, limit }) => {
  const url = `${process.env.REACT_APP_HOST}api/users?search=${search}&sort=${sort}&by=${by}&page=${page}&limit=${limit}`;
  return axios.get(url);
};
