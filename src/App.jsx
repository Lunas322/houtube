import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainVideos from './components/MainVideos'
import LayOut from './components/Layout'
import Detail from './components/Detail'


function App() {

  return (
  <>
    <Routes>
      <Route path='/' element={<LayOut/>}>
      <Route index element={<MainVideos/>}/>
      <Route path='/Detail/:id' element={<Detail/>}/>
      </Route>
    </Routes>

  </>
  )
}

export default App
