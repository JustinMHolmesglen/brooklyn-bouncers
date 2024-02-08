import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css";



export const logo = style({
    width: "100px",
    marginLeft: vars.space['1x'],
    

})

export const navbar = style({
    fontFamily: vars.fonts.body,
    fontSize: vars.fonts['3x'],
    backgroundColor: vars.colors.brand,
    color: vars.colors.primary,
    padding: vars.space['3x'],
    transition: "background 0.2s ease-in, color 0.2s ease-in",
    boxShadow: "rgba(0,0,0,0.05) 0px 1px 2px 0px"
})

export const brandLink = style({
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space['2x'],
    alignItems: "center",
    textTransform: "uppercase",
    color: vars.colors.primary,
})

export const logoTextBox = style({
    display: "flex",
    flexDirection: "column",
})

export const brand = style({
    fontWeight: "900",
})

export const navLink = style({
    color: vars.colors.complementary,
    fontSize: vars.fontSizes["4x"],
    textTransform: "uppercase",
    transition: "0.2s ease-in",
    ":hover": {
        color: vars.colors.brandLight
    }
})