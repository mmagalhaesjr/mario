import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Jogo from './Pages/Jogo/Jogo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/jogo" element={<Jogo />} />
      </Routes>
    </Router>
  )
}

export default App