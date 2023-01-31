import imageDefault from "../assets/Images/photo-profile-default.webp";
import { UilTrashAlt } from "@iconscout/react-unicons";

function CardUser({ id, email, fullname, handleDelete }) {
  return (
    <div className="wrapper-card">
      <div className="wrapper-img">
        <img src={imageDefault} className="img-user" />
      </div>
      <p>{email}</p>
      <div className="wrapper-name">
        <p>{fullname}</p>
      </div>
      <UilTrashAlt className="icon-delete" onClick={() => handleDelete(id)} />
    </div>
  );
}

export default CardUser;
