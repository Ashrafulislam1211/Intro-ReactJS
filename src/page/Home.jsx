import React, { useState } from 'react'
import Childrencomponent from '../Components/Childrencomponent'

const Home = () => {
  const [value, setValue] = useState(10)
  return (
    <div>
      <h1>This is parent Component
        <Childrencomponent title={"I am from the ChildrenComponent"}/>
        <Childrencomponent title={`I am ${value} years old.`}></Childrencomponent>
      </h1>
    </div>
  )
}

export default Home;
