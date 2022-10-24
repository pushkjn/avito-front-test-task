import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export let theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
            light: purple[100]
        },
        secondary: {
            main: green[500],
        },
    },
})

theme.typography.caption = {
    fontSize: '2rem'
}
