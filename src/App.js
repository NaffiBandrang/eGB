import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// PAGES
import AppNavBar from './components/AppNavBar'
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import Home from './pages/Home';
import ProductView from './pages/ProductView';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ResetPasswordPage from './pages/ResetPassword';
import ProfileUpdate from './pages/ProfileUpdate';
import Users from './pages/Users';
import OrderHistory from './pages/OrderHistory';

// Bootstrap
import { Container } from 'react-bootstrap';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
              id: null,
              isAdmin: null
          });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/b4/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container fluid className='px-0'>
          <AppNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route exact path="/update-profile" element={<ProfileUpdate />} />
            <Route path="/allUsers" element={<Users />} />
            <Route path="/orders" element={<OrderHistory />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  )
}

export default App;