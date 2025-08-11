import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MyFirstComponent from './Components/MyFirstComponent'
import Map from './Components/Map'
import ControlledInput from './Components/ControlledInput'
import SideEffect from './Components/SideEffect'
import ProgramList from './Components/ProgramList'
import Carousel from './Components/Carousel'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom'
import Leadership from './Components/leadership'
import Home from './Components/home'
import Navigation from './Components/Navigation'
import People from './Components/people'




function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/top-leaderships" element={<Leadership></Leadership>}></Route>
      <Route path="/people" element={<People />} />
    {/* <ControlledInput></Controll
    {/* <MyFirstComponent></MyFirstComponent> */}
    {/* <Map></Map> */}
    {/* <SideEffect></SideEffect> */}
    {/* <Carousel></Carousel>
    <ProgramList></ProgramList> */}
    </Routes>
    
  )
}

export default App
