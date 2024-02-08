// Import Bootstrap modules
import * as styles from "./Header.css";
import logoImg from '../../../public/basketball-png.png'
import useAuth from '../../hooks/useAuth'
import TuButton from '../common/TuButton'
import TuLink from '../common/TuLink'
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { RiShoppingCartFill } from "react-icons/ri";

const Header = ({ handleToggleTheme }) => {
  
  const {user, logout} = useAuth();

  return (
    <Navbar className={styles.navbar} sticky="top" variant='dark' expand="lg">
     <Container>
     

        <Navbar.Brand className={styles.brandLink} as={Link} to='/' >
          <img className={styles.logo} src={logoImg} alt="Brooklyn Bouncers logo"/>
          <div className={styles.logoTextBox}>
            <span className={styles.brand}>Brooklyn Bouncers</span>
            <span className={styles.brandSub}>The Official Online Store</span>
          </div>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className={styles.navLink} as={Link} to='/'>Home</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/store/products'>Products</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/store/sale'>Sale</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/feedback'>Feedback</Nav.Link>
            
            
            

            </Nav>
            <Nav>
            {/* <Nav.Link className={styles.navLink} as={Link} to="/theme">Theme</Nav.Link> */}
            <TuButton onClick={() => { handleToggleTheme() }}>Theme</TuButton>
            {!user && <TuLink to="/signup">Sign&nbsp;Up</TuLink>}
            {!user && <TuLink to="/login">Log&nbsp;In</TuLink>}
            
            {user && <TuLink to="/dashboard">Dashboard</TuLink>}
            {user && <TuButton onClick={() => logout()}>Logout</TuButton>}
            {<TuButton><RiShoppingCartFill /></TuButton>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
