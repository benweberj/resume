import { createGlobalStyle } from 'styled-components'

const baseStyles = {
  primary: '#60b389',
  accent: '#97cfb3',
  darkColor: '#2B2F32', // 2B2F32 -- the real one    | 2B2F32 -- the light one
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
        padding: ${theme.spacing}px;
        position: relative;        
    }

    .landing-page {
    }


    // .p5Canvas:nth-child(2) {
    //     display: none;
    // }


    // #sketch-container > div {
    //     // background: red;
    //     canvas:nth-child(1) {
    //         border: 1px solid white;
            
    //     }
    //     canvas:nth-child(2) {
    //         display: none;
    //     }
    // }

    body {
        background-size: 300% 300%;
        background-image: linear-gradient( -45deg, #256a47 0%, #3c675a 25%, #42a081 51%, #155e46 100% );
        animation: wave 20s ease infinite;
    }

    .xs { font-size: .8rem; }
    p  { font-size: 1rem; }
    h1 { font-size: 3rem; margin-bottom: ${theme.spacingSmall}px}
    h2 { font-size: 2rem; margin-bottom: ${theme.spacingSmall}px}
    h3 { font-size: 1.6rem; margin-bottom: ${theme.spacingSmall}px}
    h4 { font-size: 1.2rem; margin-bottom: ${theme.spacingSmall/2}px}

    h1, h2, h3, 4 { font-weight: ${theme.bold}; }

    p { font-weight: ${theme.light};  }

    .tcenter { text-align: center; }

    .light { font-weight: ${theme.light} }
    .bold { font-weight: ${theme.bold} }

    input {
        outline: none;
        border: none;
        border-radius: ${theme.cornersSm}px;
        padding: 2px 5px;
    }

    .next-page {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 80px;
        cursor: pointer;
        
        svg { transition: transform .5s ease; }
        :hover svg { transform: translateY(5px); }
        :active svg { transform: translateY(10px); }

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

        // &.hidden { opacity: 0; }
    }

    .flipping { animation: flip-coin 1.25s ease-out; }

    @keyframes flip-coin {
        from { transform: rotateX(0); }
        to { transform: rotateX(720deg); }
    }

    button {
        border: none;
        border-radius: 999px;
        background: ${theme.darkColor};
        color: ${theme.lightColor};
        padding: 5px 30px;
        cursor: pointer;
        transition: all .35s ease;

        &.selected {
            background: ${theme.lightColor};
            color: ${theme.darkColor};
        }
    }

    #sketch-options {
        position: absolute;
        top: 0;
        left: 0;
        // width: 100px;
        height: 100%;
        background: ${theme.lightColor}88;
        backdrop-filter: blur(5px);
        padding: ${theme.spacingSmall}px;
        transition: transform .5s ease, opacity .5s ease;

        &.closed {
            transform: translateX(-100%);
            opacity: 0;
        }

        button.close {
            // background: red;
        }

        > div {
            padding-bottom: 4px;
            p {
                font-size: .8rem;
                padding-right: ${theme.spacing}px;
            }

            input {
                width: 50px;
                color: ${theme.darkColor};
            }
        }
    }

    .show-sketch-options {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 25px;
        height: 25px;
        filter: invert(1);
        opacity: .3;
        transition: all .5s ease;

        &.closed {
            opacity: 0;
            transform: scale(0);
        }

        :hover {
            opacity: 1;
        }
        // background: ${theme.accent};

    }

    .sketch-buttons {
        // background: red;

        button {
            padding: 6px 20px;
            font-size: .8rem;
            transition: all .5s ease;
            margin: 2px;

            :hover {
                background: ${theme.lightColor};
                color: ${theme.darkColor};
                transform: scale(1.05);
            }
        }

        .demo {

        }
    }

    .close-btn {
        width: 25px;
        height: 25px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        background: white;
        color: black;
        font-size: 1rem;
        font-weight: ${theme.bold};
    }

    .daydream-close {
        position: absolute;
        z-index: 99999;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
        transform-origin: left;
        transition: all .25s ease;
        opacity: .2;
        color: gray;

        :hover {
            color: inherit;
            opacity: 1;
        }
    }

    .top-left {
        position: absolute;
        left: 0;
        top: 0;
    }

    .top-right {
        position: absolute;
        right: 0;
        top: 0;
    }

    .daydreamer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${theme.darkColor}ee;
        z-index: 999;
        // padding: ${theme.spacingLarge}px;
        backdrop-filter: blur(5px);
        transition: all .5s ease;

        &.back-to-sleep {
            backdrop-filter: blur(0px);
            opacity: 0;
            pointer-events: none;
        }
    }

    .avoid {
        position: relative;
        transition: all .5s ease;
        
        &.off {
            transform: scale(0);
        }

        .player {
            width: 15px;
            height: 15px;
            background: ${theme.lightColor};
            border-radius: 999px;
            position: absolute;
            z-index: 99;
            animation: avoid 5s ease infinite;
        }

        .enemy {
            border-radius: 999px;
            background: ${theme.lightColor}88;
            transition: all .5s ease;
            position: absolute;
        }

        .enemy-1 {
            width: 10px;
            height: 10px;
            animation: chase-1 5s ease infinite;
            animation-delay: .3s;
        }

        .enemy-2 {
            width: 5px;
            height: 5px;
            animation: chase-2 5s ease infinite;
            animation-delay: .2s;
        }
          
        .enemy-3 {
            width: 7px;
            height: 7px;
            animation: chase-3 5s ease infinite;
            animation-delay: .1s;
        }
    }

    @keyframes avoid {
        0% { transform: translate(0, 0); }
        20% { transform: translate(-20px, -10px);  }
        40% { transform: translate(-40px, 20px); }
        60% { transform: translate(20px, 30px); }
        80% { transform: translate(10px, -20px); }
        100% { transform: translate(0, 0); }
    }

    @keyframes chase-1 {
        0% { transform: translate(20px, 15px); } /*red*/
        20% { transform: translate(0px, -5px); } /*blue*/
        40% { transform: translate(-30px, 5px); } /*green*/
        60% { transform: translate(5px, 15px); } /*yellow*/
        80% { transform: translate(5px, 0px); } /*pink*/
        100% { transform: translate(20px, 15px); } /*red*/
    }

    @keyframes chase-2 {
        0% { transform: translate(-10px, -5px); } /*red*/
        20% { transform: translate(-30px, -4px); } /*blue*/
        40% { transform: translate(-40px, 6px); } /*green*/
        60% { transform: translate(30px, 15px); } /*yellow*/
        80% { transform: translate(0px, -15px); } /*pink*/
        100% { transform: translate(-10px, -5px); } /*red*/
    }

    @keyframes chase-3 {
        0% { transform: translate(-10px, 20px); } /*red*/
        20% { transform: translate(-25px, 15px); } /*blue*/
        40% { transform: translate(-40px, 40px); } /*green*/
        60% { transform: translate(40px, 45px); } /*yellow*/
        80% { transform: translate(35px, -20px); } /*pink*/
        100% { transform: translate(-10px, 20px); } /*red*/
    }

    .sketch-gallery {
        display: grid;
        width: max(60vw, 700px);
        grid-gap: ${theme.spacingSmall}px;
        grid-template-areas:    "particles particles particles orbit orbit mech mech"
                                "snake snake lightning lightning wordle wordle wordle"
                                "matrix matrix matrix avoid avoid fireworks fireworks";

        > div.glass {
            transition: all .5s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .5s ease;

            .sketch-preview-container {
                transition: all .5s ease;

                .sketch-preview {
                    transition: all .5s ease;    
                }
            }

            .sketch-details {
                transition: all .5s ease;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            
            :hover {
                .sketch-preview-container {
                    .sketch-preview {
                        transform: scale(.8);
                        opacity: .3;
                    }
                }

                .sketch-details {
                    opacity: 1;
                    backdrop-filter: blur(2px);
                }
            }
        }

    }

    .wordle-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 3px;

        .box {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            background: ${theme.lightColor};
            transition: all .25s ease;

            &.unchanging {
                background: #EDE6D1;
                font-size: 12px;
                color: #0006;
            }
        }
    }

    .mech-key {
        background: ${theme.lightColor};
    }

    .orbit-ring {
        border-radius: 999px;
        // background: ${theme.lightColor};
        border: 1px dashed ${theme.lightColor};
        width: 70px;
        height: 70px;
        position: relative;
        animation: rotate 10s linear infinite;
        padding: 10px;
        transition: all .5s ease;
        
        &.off {
            // width: 0px;
            // height: 0px;

            > .orbit-object {
                transform: scale(0);                
            }

            border: 0px dashed ${theme.lightColor};

            > .orbit-planet {
                transform: scale(0);
            }

            transform: scale(0);
        }
        
        > .orbit-planet {
            border-radius: 999px;
            background: ${theme.lightColor};
            width: 100%;
            height 100%;
            transition: all 1s ease;

        }

        > .orbit-object {
            transition: all .5s ease;
            transition-delay: .5s;
            position: absolute;
            top: -5px;
            border-radius: 999px;
            width: 8px;
            height: 8px;
            background: ${theme.lightColor};
        }
    }

    .fireworks-outer-ring {
        padding: 10px;
        border: 2px dashed ${theme.lightColor}11;
        border-radius: 999px;
        animation: rotate-ccw 6s ease infinite;
        transition: opacity 5s ease;

        &.off {
            // animation: none;
            // transform: scale(10) !important;
            opacity: 0;

            // > div {
            //     padding: 0;
            // }
        }

        > div {
            border-radius: 999px;
            padding: 10px;
            border: 3px dashed ${theme.lightColor}66;
            animation: rotate-ccw 6s ease infinite;
            animation-delay: .5s;
            // transition: all .5s ease;

            > div {
                border-radius: 999px;
                padding: 10px;
                border: 4px dashed ${theme.lightColor}aa;
                animation: rotate-ccw 6s linear infinite;

                > div {
                    border-radius: 999px;
                    width: 20px;
                    height: 20px;
                    border: 5px dashed ${theme.lightColor};
                    animation: rotate-ccw 6s linear infinite;
                }
            }
        }
    }

    .bool-toggle {
        width: 40px;
        background: ${theme.red};
        border-radius: 999px;
        padding: 4px;
        transition: background .25s ease;

        &.on {
            background: ${theme.green3};

            > div {
                transform: translateX(22px);
            }
        }

        > div {
            transition: transform .2s ease;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: white;
        }
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
    .wrap { flex-wrap: wrap; }
    .iflex { display: inline-flex; }
    .col { flex-direction: column; }
    .stretch { align-items: stretch; }
    .split { justify-content: space-between }
    .center { align-items: center; justify-content: center; }
    .align-center { align-items: center; }
    .align-end { align-items: flex-end; }
    
    // Other shorthands
    .inline { display: inline; }
    .pointer { cursor: pointer }
    .fullh { height: 100%; }
    .fullw { width: 100%; }
    .full { width: 100%; height: 100%; }
    .notouch { user-select: none; cursor: default; pointer-events: none; }
    .hazy { opacity: 50%; }
    .circle { border-radius: 999px; }
    .contain { overflow: hidden; }
    .trans { transition: all .5s ease; }
    .rel { position: relative; }
    .abs { position: absolute; }
    .shrink { transform: scale(0); }
    .hidden { opacity: 0; }
    .outline { border: 1px solid ${theme.lightColor} }
    // .hidden { opacity: 0; transition: opacity .25s ease !important; }

    .glass {
        background: ${theme.darkColor}88;

        border-radius: ${theme.spacingSmall}px;
    }

    .code {
        font-family: ${theme.codeFont};
    }

    .rounded { border-radius: ${theme.corners}px; }
    .rounded-bottom { border-bottom-left-radius: ${theme.corners}px; border-bottom-right-radius: ${theme.corners}px; }
    .rounded-top { border-top-left-radius: ${theme.corners}px; border-top-right-radius: ${theme.corners}px; }

    .rounded-sm { border-radius: ${theme.cornersSm}px; }
    .rounded-sm-bottom { border-bottom-left-radius: ${theme.cornersSm}px; border-bottom-right-radius: ${theme.cornersSm}px; }
    .rounded-sm-top { border-top-left-radius: ${theme.cornersSm}px; border-top-right-radius: ${theme.cornersSm}px; }
    
    .dark-bg { background-color: ${theme.base}; }
    .light-bg { background-color: ${theme.complement}; }

    // an element that's rendered size is needed, but only for js computation
    .reference {
        opacity: 0;
        position: absolute;
        user-select: none;
        user-drag: none;
    }

    // Extra small margin
    .mxs {  margin: ${theme.spacingSmall / 3}px; }

    // Small margins
    .ms { margin: ${theme.spacingSmall}px; }
    .msl { margin-left: ${theme.spacingSmall}px; }
    .msr { margin-right: ${theme.spacingSmall}px; }
    .mst { margin-top: ${theme.spacingSmall}px; }
    .msb { margin-bottom: ${theme.spacingSmall}px; }
    .msx { margin-left: ${theme.spacingSmall}px; margin-right: ${theme.spacingSmall}px; }
    .msy { margin-top: ${theme.spacingSmall}px; margin-bottom: ${theme.spacingSmall}px; }

    // Medium margins
    .mm { margin: ${theme.spacing}px; }
    .mml { margin-left: ${theme.spacing}px; }
    .mmr { margin-right: ${theme.spacing}px; }
    .mmt { margin-top: ${theme.spacing}px; }
    .mmb { margin-bottom: ${theme.spacing}px; }
    .mmx { margin-left: ${theme.spacing}px; margin-right: ${theme.spacing}px; }
    .mmy { margin-top: ${theme.spacing}px; margin-bottom: ${theme.spacing}px; }

    // Large margins
    .ml { margin: ${theme.spacingLarge}px; }
    .mll { margin-left: ${theme.spacingLarge}px; }
    .mlr { margin-right: ${theme.spacingLarge}px; }
    .mlt { margin-top: ${theme.spacingLarge}px; }
    .mlb { margin-bottom: ${theme.spacingLarge}px; }
    .mlx { margin-left: ${theme.spacingLarge}px; margin-right: ${theme.spacingLarge}px; }
    .mly { margin-top: ${theme.spacingLarge}px; margin-bottom: ${theme.spacingLarge}px; }


    // Extra small padding
    .pxs { padding: ${theme.spacingSmall / 3}px; }

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
    .pmx { padding-left: ${theme.spacing}px; padding-right: ${theme.spacing}px; }
    .pmy { padding-top: ${theme.spacing}px; padding-bottom: ${theme.spacing}px; }

    // Large padding
    .pl { padding: ${theme.spacingLarge}px; }
    .pll { padding-left: ${theme.spacingLarge}px; }
    .plr { padding-right: ${theme.spacingLarge}px; }
    .plt { padding-top: ${theme.spacingLarge}px; }
    .plb { padding-bottom: ${theme.spacingLarge}px; }
    .plx { padding-left: ${theme.spacingLarge}px; padding-right: ${theme.spacingLarge}px; }
    .ply { padding-top: ${theme.spacingLarge}px; padding-bottom: ${theme.spacingLarge}px; }
    
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

    ::-webkit-scrollbar {
        display: none;
    }

    .parallax-effect {
        transform-style: preserve-3d;
        * { transform-style: preserve-3d; }
    }


    @keyframes wave {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

    @keyframes rotate {
        0%{ transform: rotate(0deg) }
        100%{ transform: rotate(360deg) }
    }

    @keyframes rotate-ccw {
        0%{ transform: rotate(0deg) }
        50%{ transform: rotate(-180deg) scale(.6) }
        100%{ transform: rotate(-360deg) }
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