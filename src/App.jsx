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




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <MyFirstComponent></MyFirstComponent> */}
    {/* <Map></Map> */}
    {/* <ControlledInput></ControlledInput> */}
    {/* <SideEffect></SideEffect> */}
    <Carousel></Carousel>
    <ProgramList></ProgramList>
    </>
    
  )
}

export default App
