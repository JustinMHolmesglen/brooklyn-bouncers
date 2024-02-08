import * as styles from "./Home.css";
import { Fragment } from 'react';
import Container  from 'react-bootstrap/Container';
import TuBox from '../components/common/TuBox';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const spanStyle = {
  padding: '20px',
  background: '#ffffff',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: '40%',
  backgroundRepeat: "no-repeat",
  margin: "0 auto",
  height: '400px'
}
const slideImages = [
  {
    url: "../../src/assets/brooklyn-black-shorts.png",
    caption: 'Brooklyn Black Shorts, $69.00'
  },
  {
    url: '../../src/assets/phone3.png',
    caption: 'Brooklyn Phone cover, $10.99'
  },
  {
    url: '../../src/assets/bball.png',
    caption: 'Brooklyn Basketball, $45.00'
  },
  {
    url: '../../src/assets/brookllynWhiteHoodie.png',
    caption: 'Brooklyn Hoodie, $99.99'
  },
  {
    url: '../../src/assets/basketball-socks-white-removebg-preview.png',
    caption: 'White Socks, $5.99'
  },
  {
    url: '../../src/assets/whitehat.png',
    caption: 'Brooklyn White Hat, $39.99'
  },
];


const Home = () => {
  return (
    
    <Fragment>
             <svg className={styles.Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#059669" fill-opacity="1" d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,160C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>

</svg>
      <Container className={styles.Home}> <TuBox 
          title="Official Store for Brooklyn Bouncers"
          content="Join Brooklyn Bouncers's devoted fans with exclusive jerseys, scarves, and memorabilia"
          
        />
      </Container>
      <div className="row mt-5">
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-15.jpg" alt="night-scene" /></div>
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-14.jpg" alt="night-scene" /></div>
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-16.jpg" alt="night-scene" /></div>
          
        </div>
       
      <div className="row my-5 mx-auto" style={{margin: "0 auto"}}>
        <h2 className={styles.Middle}>Welcome to our Product Gallery</h2>
      </div>
      
        <div className="row mb-3">
          <div className="col-md-3"><img src="../../src/assets/blackSocks.png" alt="Apparel-gallery-1" /></div>
          <div className="col-md-3"><img src="../../src/assets/bball.png" alt="Apparel-gallery-2" /></div>
          <div className="col-md-3"><img src="../../src/assets/black-cap2.png" alt="Apparel-gallery-3" /></div>
          <div className="col-md-3"><img src="../../src/assets/brooklyn-long-black-tee.png" alt="Apparel-gallery-4" /></div>
          <div className="custom-shape-divider-bottom-1698660491" style={{backgroundImage: "url('../../src/assets/triangle.svg')", color: "primary" }}>
        </div>
       
        <div className="row mb-3 mx-auto mb-3">
          <Slide>
         {slideImages.map((slideImage, index, props)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})`, display: "flex", alignItems: "center", placeContent: "center", backgroundSize: "40%", backgroundRepeat: "no-repeat", margin: "0px auto 0 50px", height: "100vh" }}>
                <span style={spanStyle}>{slideImage.caption}</span>
                
              </div>
            </div>
          ))} 
        </Slide>
      </div>
        
        
      <div className="row my-5">
        <div className="justin">

          <img src="../../src/assets/bb-ring.jpg" alt="full width call to action"/>
        </div>
          
          
        </div>
        <div className="row mb-3">
          <div className="col-md-3"><img src="../../src/assets/number-singlet.png" alt="Apparel-gallery-5" /></div>
          <div className="col-md-3"><img src="../../src/assets/whitehat.png" alt="Apparel-gallery-6" /></div>
          <div className="col-md-3"><img src="../../src/assets/grey-hoodie.png" alt="Apparel-gallery-7" /></div>
          <div className="col-md-3"><img src="../../src/assets/basketball-socks-white-removebg-preview.png" alt="Apparel-gallery-8" /></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-11.jpg" alt="night-scene" /></div>
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-12.jpg" alt="night-scene" /></div>
          <div className="col-lg-4"><img style={{maxWidth: "80%", width: "500px", height: "auto", maxHeight: "80%", margin: "auto", boxShadow: "2px 3px 10px #000"}} src="../../src/assets/bg-13.jpg" alt="night-scene" /></div>
          
        </div>
        <svg className={styles.Svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,234.7C384,192,480,96,576,96C672,96,768,192,864,202.7C960,213,1056,139,1152,138.7C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </Fragment>
  )
}

export default Home