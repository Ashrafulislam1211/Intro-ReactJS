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
                       <div className="user-info">
                        <div className="user-info">
                            <img src={user.image} alt={user.name} />
                        </div>
                         <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
