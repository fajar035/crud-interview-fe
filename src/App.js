/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "./https/users";
import CardUser from "./components/CardUser";
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
  const [params] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "", // asc / desc
    by: "" // email / fullname
  });

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await getUsers(params);
        setUsers(res.data.data.result);
        setMeta(res.data.data.meta);
        setIsLoading(false);
      } catch {
        setIsError(true);
      }
    }
    getAllUsers();
  }, [setIsLoading]);

  useEffect(() => {
    if (isError)
      return toast.error("Something when wrong 😣", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "ligth"
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
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            users.map((item, idx) => {
              return (
                <CardUser
                  key={idx}
                  email={item.email}
                  fullname={item.fullname}
                />
              );
            })
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
