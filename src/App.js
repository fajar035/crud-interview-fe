/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { getUsers, addUser, deleteUser, updateUser } from "./https/users";
import CardUser from "./components/CardUser";
import IsNull from "./components/IsNull";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  UilArrowCircleRight,
  UilArrowCircleLeft
} from "@iconscout/react-unicons";

function App() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [params] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "", // asc / desc
    by: "" // email / fullname
  });

  const getAllUsers = useCallback(() => {
    getUsers(params)
      .then((res) => {
        setUsers(res.data.data.result);
        setMeta(res.data.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data.data) {
          const error = err.response.data.data.result.Message;
          console.log(error);
          if (error === "Data not found") {
            setIsNull(true);
            setIsLoading(false);
            return setIsError(false);
          }
          setIsError(true);
        }
        if (err.response.status === 500) return setIsError(true);
      });
  }, [users]);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
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

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (isError)
      toast.error("Something when wrong 😭", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
  }, [isError]);

  return (
    <>
      <div className="App">
        <h1>App CRUD Users</h1>
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
                />
              );
            })
          ) : (
            <IsNull />
          )}
        </section>
        <div className="wrapper-input">
          <input placeholder="Search Users .." />
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
      </div>
    </>
  );
}

export default App;
