import React, { useContext } from "react";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from '../Admin/Account/Login';
import Dashboard from '../Admin/Page/DashBoard';
import { AuthContext } from "./AuthContext";
function App() {
    const {currentUser}=useContext(AuthContext);
    const ProtectedRoute = ({children}) => {
        if(!currentUser)
        {
          return <Navigate to="/Login"/>
        }
        return children;
      }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                    <Route path='/Login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;