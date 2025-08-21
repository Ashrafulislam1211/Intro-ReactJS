import { Link, Links } from "react-router-dom";
import data from "../staticData/people.json";
import '../styles/people.css';

const People = () => {
    console.log("data", data);

    return (
        <div className="app">
            <div className="nav">
                <h1>User Lists</h1>
            </div>
            <div className="user-list"> 
                {data.user.map((user) => (
                    <div key={user.id} className="user-link">
                        <Link to={`/user/${user.id}`}>
                       <div className="user-info">
                        <div className="user-info-img">
                            <img src={user.image} alt={user.name} />
                        </div>
                         <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                       </div>
                       </Link>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
