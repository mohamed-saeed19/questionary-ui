import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


function Login({ user, setUser }) {
  const [national, setNational] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, type) => {
    if (!national || !studentCode || !email || !pwd) {
      return setError("all inputs are required");
    }
    setError("");
    const data = {
      national_id: national,
      password: pwd,
      email: email,
    };
   
  
    const res = await axios.post("http://localhost:3000/signIn", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: true,
      },
      // withCredentials: 'include'
    });
    if (res.status == 200) {
      setUser(res.data);
        //  setUser(data)
      if (type === "student") navigate("/student");
      else if (type === "doctor") navigate("/questions");
      else if (type === "admin") navigate("/admin");
 
    }

    // if(type === 'student') {
    //   navigate("/student", {replace: true});
    // }
  };
  return (
    <div id="login">
      <FormControl isInvalid={error} className="login__form">
        <FormLabel>National ID :</FormLabel>
        <Input
          type="number"
          value={national}
          onChange={(e) => setNational(e.target.value)}
        />

        <FormLabel>Code :</FormLabel>
        <Input type="number" onChange={(e) => setStudentCode(e.target.value)} />

        <FormLabel>University Email :</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        <FormLabel>Password :</FormLabel>
        <Input type="password" onChange={(e) => setPwd(e.target.value)} />

        {error && (
          <FormErrorMessage className="error__msg">{error}</FormErrorMessage>
        )}

        <ButtonGroup className="buttons__group">
          <Button colorScheme="teal" onClick={(e) => handleLogin(e, "student")}>
            Login as a Student
          </Button>
          <Button colorScheme="teal" onClick={(e) => handleLogin(e, "doctor")}>
            Login as a Doctor
          </Button>
          <Button colorScheme="teal" onClick={(e) => handleLogin(e, "admin")}>
           Login as a Admin
          </Button>
        </ButtonGroup>
      </FormControl>
    </div>
  );
}

export default Login;
