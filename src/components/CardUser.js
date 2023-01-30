import imageDefault from "../assets/Images/photo-profile-default.webp";

function CardUser({ email, fullname }) {
  return (
    <div className="wrapper-card">
      <div className="wrapper-img">
        <img src={imageDefault} className="img-user" />
      </div>
      <p>{email}</p>
      <div className="wrapper-name">
        <p>{fullname}</p>
      </div>
    </div>
  );
}

export default CardUser;
