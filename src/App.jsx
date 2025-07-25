import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyFirstComponent from './Components/MyFirstComponent'
import Map from './Components/Map'
import ControlledInput from './Components/ControlledInput'
import SideEffect from './Components/SideEffect'
import ProgramList from './Components/ProgramList'
import Carousel from './Components/Carousel'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/leaderships" element={<leadership></leadership>}></Route>
    {/* <MyFirstComponent></MyFirstComponent> */}
    {/* <Map></Map> */}
    {/* <ControlledInput></ControlledInput> */}
    {/* <SideEffect></SideEffect> */}
    <Carousel></Carousel>
    <ProgramList></ProgramList>
    </Routes>
    
  )
}

export default App
