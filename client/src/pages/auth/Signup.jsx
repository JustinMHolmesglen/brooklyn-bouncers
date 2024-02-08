
import { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import authService from "../../services/authService";
import useAuth from '../../hooks/useAuth';

import * as styles from "./Signup.css";
import TuCard from "../../components/common/TuCard";
import TuButton from "../../components/common/TuButton";

function Signup() {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate()
  const passwordConfirmRef = useRef();
  const [ user, setUser ] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [ loading, setLoading ] = useState(false);

  const { username, email, password } = user;

  const handleTextChange = (e) =>  {
    setUser({ 
      ...user,
      [e.target.name]: e.target.value
      }) 
  } 

  const handleSubmit = async (e) =>  {
      e.preventDefault();
      setLoading(true);

    //password check
    if(password !== passwordConfirmRef.current.value){
      toast.error("Passwords do not match")
      setLoading(false);
      return;
    }  

    //api call
    try {
      const response = await authService.register(user);
      loginSaveUser(response.data);
      navigate('/dashboard');
    } catch(err) {
      console.log(err?.response);
      setTimeout(() => {setLoading(false)}, 1000);
    }
}
  
  return (
    <TuCard title="Sign Up" authform>

    <Form className={styles.Signup} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Your Username</Form.Label>
        <Form.Control type="text" placeholder="username" name="username" value={username} onChange={handleTextChange}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="email" name="email" value={email} onChange={handleTextChange}/>
        <Form.Text className="text-muted">
          <p>We'll never share your email with anyone else.</p>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" name="password" value={password} onChange={handleTextChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password-confirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password Confirmation" ref={passwordConfirmRef}/>
      </Form.Group>
      
       {/* SUBMIT BUTTON */}
       <TuButton loadingState={loading}>
          {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'Submit'}
        </TuButton>
    </Form>
    <span className={styles.loginSpan}>Already a Member?&nbsp;<Link to="/login" className={styles.loginLink}>Login Here</Link></span>
    </TuCard>
  )
}

export default Signup;