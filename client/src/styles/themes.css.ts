import { createGlobalTheme, createTheme, createThemeContract } from "@vanilla-extract/css";
import twColors from 'tailwindcss/colors';

export const root = createGlobalTheme(":root", {
  fonts: {
    brand: "Playpen Sans, cursive",
    body: "Lato, Helvetica, Sans-serif",
  },
  
  space: {
    none: '0',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    '6x': '48px',
  },
  fontSizes: {
    '1x': '12px',
    '2x': '16px',
    '3x': '20px', 
    '4x': '24px', 
    '5x': '28px', 
  },
  fontWeights: {
    light: "300",
    normal: "400",
    bold: "700",
  }
  })

  const colors = createThemeContract({
    // Semantic tokens
    primary: null,
    complementary: null,
    brand: null,
    brandLight: null,
    brandDark: null,
    seconday: null,
    tertiary: null,
    fourth: null,
    

    // Color tokens
    success: null,
    warning: null,
    error: null,
    grey200: null,
    grey300: null,
    grey400: null,
    grey500: null,
    grey600: null,

  });

  export const lightTheme =  createTheme(colors, {
    primary: twColors.white,
    complementary: twColors.black,
    brand: twColors.emerald[600],
    brandLight: twColors.emerald[400],
    brandDark: twColors.emerald[700],
    seconday: twColors.blue[600],
    tertiary: twColors.blue[900],
    fourth: twColors.blue[400],
    

    // Color tokens
    success: twColors.green[400],
    warning: twColors.amber[400],
    error: twColors.rose[600],
    grey200: twColors.gray[200],
    grey300: twColors.gray[300],
    grey400: twColors.gray[400],
    grey500: twColors.gray[500],
    grey600: twColors.gray[600],
  });
  
  export const darkTheme =  createTheme(colors, {
    primary: twColors.black,
    complementary: twColors.white,
    brand: twColors.emerald[600],
    brandLight: twColors.emerald[400],
    brandDark: twColors.emerald[700],
    seconday: twColors.blue[600],
    tertiary: twColors.blue[900],
    fourth: twColors.blue[400],
    

    // Color tokens
    success: twColors.green[400],
    warning: twColors.amber[400],
    error: twColors.rose[600],
    grey200: twColors.gray[200],
    grey300: twColors.gray[300],
    grey400: twColors.gray[400],
    grey500: twColors.gray[500],
    grey600: twColors.gray[600],
  });
  


export const vars = { ...root, colors };