// Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import authService from "../../services/authService";
// import useAuth from '../../hooks/useAuth';

import * as styles from "./Footer.css";
import { Form, Spinner } from 'react-bootstrap'
import TuButton from "../common/TuButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { post } from '../../services/feedbackService';


function Footer() {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  library.add(fas);

  // const { loginSaveUser } = useAuth();
  const navigate = useNavigate()

  
  const [ user, setUser ] = useState({
    username: "",
    phone: "",
    email: "",
    message: "",
  });

  const [ loading, setLoading ] = useState(false);

  const { username, phone, email, message } = user;

  const handleTextChange = (e) =>  {
    setUser({ 
      ...user,
      [e.target.name]: e.target.value
      }) 
  } 

  const handleSubmit = async (e) =>  {
      e.preventDefault();
      setLoading(true);
      

  try {
    
    const response = await post(user);
    navigate('/');
    setTimeout(() => {setLoading(false)}, 500);
    return;
  } catch(err) {
    console.log(err?.response);
    setTimeout(() => {setLoading(false)}, 1000);
  }
}
  return (
    <footer className={styles.footer}>
     <div className="row mb-3">
           <div className="col-md-3">
          <h3 style={{color: "#ffffff", zIndex: "9"}}>Enquiry Form</h3>
          <Form className={styles.Feedback} onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control size="sm" type="text" name="username" placeholder="Full Name" value={username} onChange={handleTextChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control size="sm" type="number" name="phone" placeholder="04xx-xxx-xxx" value={phone} onChange={handleTextChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control size="sm" type="email" name="email" placeholder="name@example.com" value={email} onChange={handleTextChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Your Query</Form.Label>
              <Form.Control size="sm" as="textarea" type="message" name="message" rows={3} value={message} onChange={handleTextChange}/>
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
          </div>
          <div className="col-md-3"><h3 className="mb-4">New York</h3><h3 className="mb-4">Sydney</h3><h3 className="mb-4">London</h3><p>mon-thurs | 9.00am-5pm</p><p>fri | 9.00am-9pm</p><p>sat | 9.00am-5pm</p><p>sun | 11.30am-5pm</p></div>
          <div className="col-md-3">
              <div style={{display: "flex", justifyItems: "center"}}><img src="../../src/assets/f_logo.png" alt="social-link-1" style={{width: "15%", textShadow: "2px 2px 3px #000000"}} /><h4 className="m-auto">Brooklyn Bouncers</h4></div>
              <hr></hr>
              <div style={{display: "flex", justifyItems: "center"}}><img src="../../src/assets/i_logo.png" alt="social-link-2" style={{width: "15%", textShadow: "2px 2px 3px #000000"}} /><h4 className="m-auto">Brooklyn Bouncers</h4></div>
              <hr></hr>
              <p className="mt-4"><FontAwesomeIcon icon="fa-solid fa-phone" />&nbsp;&nbsp;Tel: 0411 - X11 - 111</p>
              <p><FontAwesomeIcon icon="fa-solid fa-envelope" />&nbsp;&nbsp;Mail: info@BrooklynBouncers</p>
          </div>
          <div className="col-md-3">
          <img src="../../src/assets/brooklyn-long-black-tee.png" alt="Food-gallery-1" />
          </div>
          
        </div>
    <div className={styles.footer}>
      &copy; {getCurrentYear()} JP Computer Systems |  Brooklyn Bouncers&trade;
    </div>
    </footer>
  )
}



// Exports
export default Footer