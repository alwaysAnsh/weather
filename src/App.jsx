import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PieChartComponent from './components/PieChartComponent'
import { Route, Routes } from 'react-router-dom'
import WeatherApi from './components/WeatherApi'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<WeatherApi/>} />
        <Route path='/assign2' element= {<PieChartComponent/>} />
      </Routes>
      
    </>
  )
}

export default App
