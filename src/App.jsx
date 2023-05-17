import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Login from "./Components/Login";
import viteLogo from "/vite.svg";
import Questions from "./Components/Questions";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./Components/Welcome";
import Student from "./Components/Student";
import Admin from "./Components/Admin";
import RouteProtector from "./Components/RouteProtector";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  //   function protectRouter(props){
  // if(!user){
  // return <Navigate to="/login"/>
  // }else{
  // return props.childer
  // }
  //   }
  console.log(user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        {/* <Route element={<RouteProtector type="doctor" userType={user.type} />}> */}
          <Route
            path="/questions"
            element={<Questions user={user} setUser={setUser} />}
          />
        {/* </Route> */}
        <Route
          path="/student"
          element={<Student user={user} setUser={setUser} />}
        />

        <Route path="/admin" element={<Admin />} />
        {/* <Route path='/docotr' /> */}
      </Routes>
    </div>
  );
}

export default App;
