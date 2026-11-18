import{Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from './Pages/Register';
import Welcome from './Pages/Welcome';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/forgot-password/*" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
