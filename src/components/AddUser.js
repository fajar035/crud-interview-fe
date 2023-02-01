import { useState } from "react";
import { toast } from "react-toastify";

function AddUser(props) {
  const { handleClose, addUserApi } = props;
  const [body, setBody] = useState({
    email: "",
    fullname: ""
  });

  const handleAdd = () => {
    if (body.email === 0 || body.fullname.length === 0)
      return toast.error("please fill in the data first ..", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    addUserApi(body);
  };

  return (
    <div className="section-adduser">
      <div className="wrapper-add">
        <h1>ADD USER</h1>

        <div className="input-container">
          <input
            id="email"
            className="input"
            type="email"
            pattern=".+"
            required
            onChange={(e) => setBody({ ...body, email: e.target.value })}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-container">
          <input
            id="fullname"
            className="input"
            type="text"
            pattern=".+"
            required
            onChange={(e) => setBody({ ...body, fullname: e.target.value })}
          />
          <label htmlFor="fullname">Fullname</label>
        </div>

        <div className="wrapper-btn-adduser">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
