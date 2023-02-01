import { useState } from "react";
import { toast } from "react-toastify";

function EditUser(props) {
  const { handleClose, updateUser, dataUser } = props;
  const [body, setBody] = useState({
    email: "",
    fullname: ""
  });

  const handleEdit = () => {
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
    updateUser(body, dataUser.id);
  };

  return (
    <div className="section-adduser">
      <div className="wrapper-add">
        <h1>UPDATE USER</h1>

        <div className="input-container">
          <input
            id="email"
            className="input"
            type="email"
            pattern=".+"
            required
            defaultValue={dataUser.email}
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
            defaultValue={dataUser.fullname}
            onChange={(e) => setBody({ ...body, fullname: e.target.value })}
          />
          <label htmlFor="fullname">Fullname</label>
        </div>

        <div className="wrapper-btn-adduser">
          <button onClick={handleEdit}>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
