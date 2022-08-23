import {createMuiTheme} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'


const mainBarHeight = 65;
const tabBarHeight = 48;
const barColor = '#f1f1f1';
const barColor2 = '#eaeaea';

const theme = createMuiTheme({
    typography: {
        fontFamily: " Lato, Almarai"
    },

    custom: {
        mainBarHeight: mainBarHeight,
        mainBarBackground: barColor,
        tabBarHeight: tabBarHeight,
        tabBarBackground: barColor2,
    },
    mixins: {
        // toolbar: {
        //     minHeight: 64,
        //     top: mainBarHeight,
        //     position: 'fixed',
        //     background: 'red',
        //     [breakpoints.down('sm')]: {
        //         minHeight: 56,
        //     }
        // }
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            superlight: 'rgba(36,76,140,0.12)',
            main: '#029ABD',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            superlight: '#FFD699',
            main: '#D46D27',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        tertiary: {
            superlight: '#FFD699',
            main: '#D4B127',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        background: {
            paper: "#ffffff",
            grayDark: "#ffffff",
            grayVeryDark: "#ffffff",
            offWhite: "#ffffff",

        }
        // error: will use the default color
    },
});

export default theme;