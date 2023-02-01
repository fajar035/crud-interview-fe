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
    sort: "", // asc / desc
    by: "" // email / fullname
  });

  const getAllUsersApi = async () => {
    try {
      const res = await getUsers(params);
      setUsers(res.data.data.result);
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

  useEffect(() => {
    getAllUsersApi();
  }, []);

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
    console.log(params.search);
    if (params.search.length === 0) {
      getAllUsersApi();
    }
  }, [params.search]);

  return (
    <>
      <div className={`App ${onBlur ? "blur-bg" : ""}`}>
        <h1>App CRUD Users</h1>
        <div className="wrapper-input">
          <input
            placeholder="Search Users .."
            onChange={(e) => handleSearchInput(e)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="wrapper-btn">
          <button>
            <UilArrowCircleLeft className="icon-btn" />
          </button>
          <p>{params.page}</p>
          <button>
            <UilArrowCircleRight className="icon-btn" />
          </button>
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
