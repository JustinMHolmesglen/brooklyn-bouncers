import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../styles/themes.css"


export const Home = style({
    backgroundImage: "url('/basketball-bg.jpg')",
    backgroundPosition: "cover",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    zIndex: "2",
    maxWidth: "100%",
    height: "75vh",
    margin: "0",
    padding: "0",
    position: "relative",
    backgroundColor: vars.colors.complementary,

    
  })

export const Heading = style({
    position: "absolute",
    display: "flex",
    alignContent: "center",
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "middle",
    textShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",
    opacity: "0.7",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    '@media': {
        'screen and (max-width: 768px)': {
          fontSize: "2rem"
        },
      
      }
})

export const Text = style({
    position: "absolute",
    display: "flex",
    alignContent: "center",
    fontSize: "2.5rem",
    textAlign: "center",
    fontWeight: "700",
    textShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",
    opacity: "0.7",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    '@media': {
        'screen and (max-width: 768px)': {
          fontSize: "1.6rem",
          maxWidth: "100%",
          width: "100%",
        },
      
      }
})

export const Button = style({
    fontSize: "3rem",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    boxShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",

})

export const Svg = style({
  paddingTop: "0px",
  paddingBottom: "0px",
  margin: "0px",
  height: "70%",
  width: "100%",
})

export const pic = style({
  position: "absolute",
  display: "flex",
  alignContent: "center",
  fontSize: "2.5rem",
  textAlign: "center",
  fontWeight: "700",
  textShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",
  opacity: "0.7",
  top: "50%",
  left: "50%",
  zIndex: 9,
  transform: "translate(-50%, -50%)",
  '@media': {
      'screen and (max-width: 768px)': {
        fontSize: "1.6rem",
        maxWidth: "100%",
        width: "100%",
      },
    
    }
})

export const Middle = style({
  color: vars.colors.complementary,
  textAlign: "center", 
  fontWeight: "900"
})


