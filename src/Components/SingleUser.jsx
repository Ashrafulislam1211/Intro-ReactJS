import { useLocation, useNavigate, useParams } from "react-router-dom";
import data from '../staticData/people.json'
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

const SingleUser = () => {
  const [user, setuser] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  console.log("location", location);

  useEffect(() => {
    const singleUser = data.user.find(user => user.id === parseInt(id));
    setuser(singleUser);

  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/people");
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div>
      <Navigation></Navigation>
      <h1 className='user-detail-title'>Single Profile Information</h1>
      {user && (
        <div className='user-detail-content'>
        <div className="user-detail-avatar">
          <img src={user.image} alt={user.name} />
        </div>
        <div className="singleUser-detail-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> <a href={user.website}>{user.website}</a>
          </p>
        </div>
      </div>
    )}
    </div>

  );
};

export default SingleUser;

