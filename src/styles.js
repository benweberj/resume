import { createGlobalStyle } from 'styled-components'

const baseStyles = {
  primary: '#60b389',
  accent: '#97cfb3',

  darkColor: '#5f7687', // 2B2F32 -- the real one
  lightColor: '#EDE6D1',

  red: '#f5877f', // DB5461
  purple: '#7678ED',
  blue: '#91C4F2',
  green: '#83E8BA',
  wine: '#912F40',
  brown: '#A49E8D',
  orange: '#ED9B40',

  green2: '#7FB685',
  green3: '#61C9A8',
  green4: '#97cfb3',

  light: 200,
  regular: 400,
  bold: 600,

  corners: 8,
  cornersSm: 4,
  padding: 30,
  paddingSm: 15,

  spacing: 20,
  spacingSmall: 10,
  spacingLarge: 30,

  font: 'Assistant',
  codeFont: 'Ubuntu Mono',
  rem: 17,
  
}

const themes = {
  dark: {
    mode: 'dark',
    base: baseStyles.darkColor,
    complement: baseStyles.lightColor,
    ...baseStyles
  },

  light: {
    mode: 'light',
    base: baseStyles.lightColor,
    complement: baseStyles.darkColor,
    ...baseStyles
  }
}

// for right now, this is hard-coded, but in the future just add a prop to the globalstyles
// to determine the color scheme used. 
const theme = themes.dark

// Heres how the styling is going to go:

// - create the component with plain ol HMTML and give it a className
// - the className namespace won't get too diluted since you can use scss
// - use js variables for all the common colors, fontSizes, fonts, paddings, borderRadiuses, and 
//      any other value that you would like to adjust globally




export const GlobalStyles = createGlobalStyle`
    html {
        font-size: ${theme.rem}px;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: ${theme.complement};
        font-family: ${theme.font};
        font-weight: ${theme.regular};
        line-height: 1;
    }

    // landing, animations, games, contact
    .full-page { 
        width: 100vw;
        height: 100vh;
        maxHeight: 100vh;
        padding: 20px;
    }

    .landing-page {
        background: ${theme.base};
    }


    // button {
    //     padding: 5px 20px;
    //     background: ${theme.complement};
    //     color: ${theme.base};
    //     border: none;
    //     border-radius: ${theme.cornersSm}px;
    //     // font-weight: ${theme.bold}
    //     font-size: 1rem;
    //     transition: all .5s ease;

    //     :hover {
    //         transform: rotate(360deg);
    //         background: ${theme.base};
    //         color: ${theme.complement};
    //     }
    // }


    // .my-name {
    //     transition: transform .8s ease;
    // }

    // .show-title {

    // }

    // .hide-title {
    //     width: 10px;
    //     background: blue;
    // }

    .next-page {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 80px;
        cursor: pointer;
        
        svg { transition: transform .5s ease; }

        :hover svg {
            transform: translateY(5px);
        }

        :active svg {
            transform: translateY(10px);
        }

        :hover:after {
            opacity: .3;
            transform: translateY(20px) scaleY(.25);
            filter: blur(6px);
        }

        :active:after {
            filter: blur(3px);
            opacity: .4;
        }


        :after {
            transition: all .5s ease;
            content: '';
            background: black;
            position: absolute;
            width: 32px;
            height: 20px;
            border-radius: 999px;
            opacity: .1;
            filter: blur(7px);
            transform: translateY(20px) scaleY(.3) scaleX(.9);
        }
    }

    .two-face-container {
        width: 250px;
        height: 250px;
    }

    .two-face-container:hover {
        .vec { background: ${theme.complement}; }

        :active { transform: scale(.9); }
    }

    .two-face {
        width: 250px;
        height: 250px;
        border-radius: 999px;
        overflow: hidden;
        user-select: none;
        user-drag: none;
        transition: all .5s ease;
        
        &.vec {
            position: absolute;
            left: 0;
            background: ${theme.base};
        }

        &.hidden { opacity: 0; }
    }

    .flipping {
        animation: flip-coin 1.25s ease-out;
    }

    @keyframes flip-coin {
        from { transform: rotateX(0); }
        to { transform: rotateX(720deg); }
    }

    .shrink {
        transform: scale(0);
    }

    .social-icon {
        p {
            position: absolute;
            opacity: 0;
            transform: translateY(20px);
        }

        p, svg { transition: transform .5s ease, opacity .5s ease; }

        :hover {
            svg {
                transform: translateY(-100%);
                opacity: 0;
            }

            p {
                opacity: 1;
                transform: translateY(0px);
            }
        }
    }

    // Flex    
    .flex { display: flex; }
    .iflex { display: inline-flex; }
    .col { flex-direction: column; }
    .stretch { align-items: stretch; }
    .split { justify-content: space-between }
    .center { align-items: center; justify-content: center; }
    .align-end { align-items: flex-end; }
    
    // Other shorthands
    .inline { display: inline; }
    .pointer { cursor: pointer }
    .fullh { height: 100%; }
    .notouch { user-select: none; cursor: default }
    .hazy { opacity: 50%; }
    .contain { overflow: hidden; }
    .trans { transition: all .5s ease; }
    .rel { position: relative; }
    .abs { position: absolute; }
    
    .dark-bg { background-color: ${theme.base}; }
    .light-bg { background-color: ${theme.complement}; }

    // an element that's rendered size is needed, but only for js computation
    .reference {
        opacity: 0;
        position: absolute;
        user-select: none;
        user-drag: none;
    }

    // Small margins
    .ms { margin: ${theme.spacingSmall}px; }
    .msl { margin-left: ${theme.spacingSmall}px; }
    .msr { margin-right: ${theme.spacingSmall}px; }
    .mst { margin-top: ${theme.spacingSmall}px; }
    .msb { margin-bottom: ${theme.spacingSmall}px; }
    .mxs { margin-left: ${theme.spacingSmall}px; margin-right: ${theme.spacingSmall}px; }
    .mys { margin-top: ${theme.spacingSmall}px; margin-bottom: ${theme.spacingSmall}px; }

    // Medium margins
    .mm { margin: ${theme.spacing}px; }
    .mml { margin-left: ${theme.spacing}px; }
    .mmr { margin-right: ${theme.spacing}px; }
    .mmt { margin-top: ${theme.spacing}px; }
    .mmb { margin-bottom: ${theme.spacing}px; }
    .mxm { margin-left: ${theme.spacing}px; margin-right: ${theme.spacing}px; }
    .mxy { margin-top: ${theme.spacing}px; margin-bottom: ${theme.spacing}px; }

    // Large margins
    .ml { margin: ${theme.spacingLarge}px; }
    .mll { margin-left: ${theme.spacingLarge}px; }
    .mlr { margin-right: ${theme.spacingLarge}px; }
    .mlt { margin-top: ${theme.spacingLarge}px; }
    .mlb { margin-bottom: ${theme.spacingLarge}px; }
    .mxl { margin-left: ${theme.spacingLarge}px; margin-right: ${theme.spacingLarge}px; }
    .myl { margin-top: ${theme.spacingLarge}px; margin-bottom: ${theme.spacingLarge}px; }


    // Small padding
    .ps { padding: ${theme.spacingSmall}px; }
    .psl { padding-left: ${theme.spacingSmall}px; }
    .psr { padding-right: ${theme.spacingSmall}px; }
    .pst { padding-top: ${theme.spacingSmall}px; }
    .psb { padding-bottom: ${theme.spacingSmall}px; }
    .pxs { padding-left: ${theme.spacingSmall}px; padding-right: ${theme.spacingSmall}px; }
    .pys { padding-top: ${theme.spacingSmall}px; padding-bottom: ${theme.spacingSmall}px; }

    // Medium padding
    .pm { padding: ${theme.spacing}px; }
    .pml { padding-left: ${theme.spacing}px; }
    .pmr { padding-right: ${theme.spacing}px; }
    .pmt { padding-top: ${theme.spacing}px; }
    .pmb { padding-bottom: ${theme.spacing}px; }
    .pxm { padding-left: ${theme.spacing}px; margin-right: ${theme.spacing}px; }
    .pxy { padding-top: ${theme.spacing}px; margin-bottom: ${theme.spacing}px; }

    // Large padding
    .pl { padding: ${theme.spacingLarge}px; }
    .pll { padding-left: ${theme.spacingLarge}px; }
    .plr { padding-right: ${theme.spacingLarge}px; }
    .plt { padding-top: ${theme.spacingLarge}px; }
    .plb { padding-bottom: ${theme.spacingLarge}px; }
    .pxl { padding-left: ${theme.spacingLarge}px; padding-right: ${theme.spacingLarge}px; }
    .pyl { padding-top: ${theme.spacingLarge}px; padding-bottom: ${theme.spacingLarge}px; }
    
    .debug {
        
        border: 1px solid white;
        > * {
            border: 1px dashed white;
            > * {
                border: 1px solid gray;
                > * {
                    border: 1px dashed gray;
                }
            }
        }
    }


    p  { font-size: 1rem; }
    h1 { font-size: 3rem; margin-bottom: ${theme.spacingSmall}px}
    h2 { font-size: 2rem; margin-bottom: ${theme.spacingSmall}px}
    h3 { font-size: 1.6rem; margin-bottom: ${theme.spacingSmall}px}

    h1, h2, h3 { font-weight: ${theme.bold}; }

    p { font-weight: ${theme.light};  }

    .tcenter { text-align: center; }

    .light { font-weight: ${theme.light} }
    .bold { font-weight: ${theme.bold} }


    .parallax-effect {
        transform-style: preserve-3d;
        * { transform-style: preserve-3d; }
    }
`





// for some reason you can't css import fonts so you'll just need to keep here and index.html in sync


// export const theme = {
//   dark: {
//     mode: 'dark',
//     base: darkColor,
//     complement: lightColor,
//     ...baseStyles
//   },

//   light: {
//     mode: 'light',
//     base: lightColor,
//     complement: darkColor,
//     ...baseStyles
//   }
// }