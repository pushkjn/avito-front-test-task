import ReactDOM from 'react-dom'
import React from "react"
import { BrowserRouter, Route, Router, Switch, useHistory, useLocation } from "react-router-dom"
import { Main } from './pages/main'
import { StoryPage } from './pages/storyPage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from "./theme"
import { Header } from './components/header'


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container sx={{
                paddingTop: '5rem'
            }}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/story/:id">
                            <StoryPage />
                        </Route>
                        <Route exact path="/">
                            <Main />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)

