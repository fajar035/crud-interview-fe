/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserById
} from "./https/users";
import CardUser from "./components/CardUser";
import AddUser from "./components/AddUser";
import IsNull from "./components/IsNull";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";

import {
  UilArrowCircleRight,
  UilArrowCircleLeft
} from "@iconscout/react-unicons";
import EditUser from "./components/Edituser";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState({});
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "", // email / fullname
    by: "asc" // asc / desc
  });
  const [pagination, setPaginations] = useState({
    next: null,
    prev: null
  });

  const getAllUsersApi = async () => {
    try {
      const res = await getUsers(params);
      setUsers(res.data.data.result);
      setMeta(res.data.data.meta);
      setIsLoading(false);
      setIsError(false);
      setIsNull(false);
    } catch (err) {
      setIsError(false);
      setIsLoading(false);
      if (err.response.status === 404) {
        setIsNull(true);
      }
    }
  };

  const addUserApi = async (body) => {
    try {
      const res = await addUser(body);
      setOnBlur(false);
      setOpenAddUser(false);
      getAllUsersApi();
      return toast.success("Successfully add user 😍", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (err) {
      if (err)
        return toast.error("User already exist 😭", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
    }
  };

  const updateUserApi = async (body, id) => {
    try {
      const res = await updateUser(body, id);
      setOnBlur(false);
      setOpenEditUser(false);
      getAllUsersApi();
      return toast.success("Successfully update user 😍", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (err) {
      if (err)
        return toast.error("User already exist 😭", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
    }
  };

  const getUserByIdApi = async (id) => {
    try {
      const res = await getUserById(id);
      const data = res.data.data[0];
      setUserId(data);
    } catch (err) {
      setIsError(true);
    }
  };

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        getAllUsersApi();
        return toast.success("Successfully delete data 😊", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      })
      .catch((err) => {
        if (err)
          return toast.error("Something when wrong 😭", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
      });
  };

  const handleEdit = (id) => {
    setOnBlur(true);
    setOpenEditUser(true);
    getUserByIdApi(id);
  };

  const handleAdd = () => {
    setOnBlur(true);
    setOpenAddUser(true);
  };

  const handleClose = () => {
    setOnBlur(false);
    setOpenAddUser(false);
    setOpenEditUser(false);
  };

  const handleSearchInput = (e) => {
    setParams({ ...params, search: e.target.value });
  };

  const handleSearch = () => {
    getAllUsersApi(params);
  };

  const handleNext = () => {
    setIsLoading(true);
    const { next, prev } = meta;
    setPaginations({ prev, next });
    setParams({ ...params, page: params.page + 1 });
    if (next) {
      getUsers(next)
        .then((res) => {
          setUsers(res.data.data.result);
          setMeta(res.data.data.meta);
          setIsLoading(false);
          setIsError(false);
          setIsNull(false);
        })
        .catch((err) => {
          setIsError(false);
          setIsLoading(false);
          if (err.response.status === 404) {
            setIsNull(true);
          }
        });
    }
  };

  const handlePrev = () => {
    setIsLoading(true);
    const { next, prev } = meta;
    setPaginations({ prev, next });
    setParams({ ...params, page: params.page - 1 });
    if (prev) {
      getUsers(prev)
        .then((res) => {
          setUsers(res.data.data.result);
          setMeta(res.data.data.meta);
          setIsLoading(false);
          setIsError(false);
          setIsNull(false);
        })
        .catch((err) => {
          setIsError(false);
          setIsLoading(false);
          if (err.response.status === 404) {
            setIsNull(true);
          }
        });
    }
  };

  useEffect(() => {
    getAllUsersApi(params);
  }, [params]);

  useEffect(() => {
    if (isError)
      return toast.error("Something when wrong 😭", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
  }, []);

  useEffect(() => {
    if (params.search.length === 0) {
      getAllUsersApi();
    }
  }, [params.search]);

  return (
    <>
      <div className={`App ${onBlur ? "blur-bg" : ""}`}>
        <h2>App CRUD Users</h2>
        <div className="wrapper-input">
          <input
            placeholder="Search Users .."
            onChange={(e) => handleSearchInput(e)}
          />
          <button onClick={handleSearch}>Search</button>
          <button className="btn-add" onClick={handleAdd}>
            Add User
          </button>
        </div>
        <div className="wrapper-filter">
          <select
            value={params.sort}
            onChange={(e) => setParams({ ...params, sort: e.target.value })}
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="email">Email</option>
            <option value="fullname">Fullname</option>
          </select>
          <button
            className="btn-filter"
            onClick={() => setParams({ ...params, sort: "" })}
          >
            Clear Filter
          </button>
        </div>
        <div className="wrapper-btn">
          <button
            onClick={handlePrev}
            className={!meta.prev ? "disable-btn" : ""}
          >
            <UilArrowCircleLeft className="icon-btn" />
          </button>
          <p>{params.page}</p>
          <button
            onClick={handleNext}
            className={!meta.next ? "disable-btn" : ""}
          >
            <UilArrowCircleRight className="icon-btn" />
          </button>
        </div>
        <div className="wrapper-info-page">
          <p>Total Page : {meta.totalPage}</p>
          <p>|</p>
          <p>Total Data : {meta.count}</p>
        </div>
        <section className="section-user">
          {isLoading ? (
            <Puff
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              visible={true}
              wrapperClass="loading"
            />
          ) : !isNull ? (
            users.map((item, idx) => {
              return (
                <CardUser
                  key={idx}
                  id={item.id}
                  email={item.email}
                  fullname={item.fullname}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })
          ) : (
            <IsNull onClick={handleAdd} />
          )}
        </section>
      </div>
      {/* MODAL */}
      {openAddUser ? (
        <AddUser handleClose={handleClose} addUserApi={addUserApi} />
      ) : openEditUser ? (
        <EditUser
          handleClose={handleClose}
          updateUser={updateUserApi}
          dataUser={userId}
        />
      ) : null}
    </>
  );
}

export default App;
