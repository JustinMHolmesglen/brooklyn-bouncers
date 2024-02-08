import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';

// import { toast } from 'react-toastify';
import * as styles from "./Login.css";
import authService from "../../services/authService";
import useAuth from '../../hooks/useAuth'
import TuCard from "../../components/common/TuCard";
import TuButton from "../../components/common/TuButton";

function Login() {
      const { loginSaveUser } = useAuth();

      const navigate = useNavigate()
    
    const [ user, setUser ] = useState({
      
      email: "",
      password: "",
    });
  
    const [ loading, setLoading ] = useState(false);
  
    const { email, password } = user;
  
    const handleTextChange = (e) =>  {
      setUser({ 
        ...user,
        [e.target.name]: e.target.value
        }) 
    } 
  
    const handleSubmit = async (e) =>  {
        e.preventDefault();
        console.log("test")
        setLoading(true);
      //api call
      try {
        const response = await authService.login(user);
        loginSaveUser(response.data);
        navigate('/dashboard');
        // navigate to the dashboard page
      } catch (err){
        console.log(err?.response);
        // toast.error(err.response.data);
        setTimeout(() => {setLoading(false)}, 1000)
      } 
  }
  return (
    <TuCard title="Login" authform>
    <Form className={styles.Login} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleTextChange}/>
        <Form.Text className="text-muted">
          <p>We'll never share your email with anyone else.</p>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleTextChange}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
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
    <span className={styles.loginSpan}>Not a Member?</span><Link to="/signup" className={styles.loginLink}>Sign up Here</Link>
    </TuCard>
  );
}

export default Login