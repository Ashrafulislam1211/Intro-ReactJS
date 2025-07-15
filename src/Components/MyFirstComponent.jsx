import { useState } from "react";


const MyFirstComponent = () => {
//count is kind of variable and setcount is a setter function 
const [count, setCount] = useState(10);
    
    console.log(count);

    const changeStateValue = () => {
        setCount(count + 10);
    };

    const decreaseStateValue = () => {
        setCount(count - 10);
    };

    return (
        <div>
        <h1>This is my first Component</h1>
        <p>Count :{count}</p>
        <button onClick={changeStateValue}>Increase Count</button>
       <button onClick={decreaseStateValue}>Decrease count</button>
        
        </div>
    );
};

export default MyFirstComponent;
