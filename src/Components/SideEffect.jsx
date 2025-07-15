import React, { useEffect, useState } from 'react'

const SideEffect = () => {
    const [data, setData] = useState([]);   // The empty dependency array [] means this effect runs only once (on mount)


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())           // Update state with fetched data
        .then((data) => setData(data))     // Update state with fetched data
        .catch((err) => console.log(err)); // Log any errors
    }, []); // Empty array prevents this effect from running on subsequent renders

      // Log the current data to console on every render (for debugging)
    console.log("data", data);
  return (
    <div>
        {data.map((item) => (
            <p key={item.id}>{item.username}</p>
        ))}
    </div>
  )
}

export default SideEffect
