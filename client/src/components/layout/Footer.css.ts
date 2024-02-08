import * as styles from './Footer';
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css"

export const footer = style({
    fontFamily: vars.fonts.body,
    fontSize: vars.fonts['3x'],
    color: vars.colors.primary,
    backgroundColor: vars.colors.complementary,
    padding: vars.space["4x"],
    borderTop: `1px solid ${vars.colors.grey300}`,
    textAlign: "center",
    
  })

  