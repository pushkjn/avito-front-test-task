import ReactDOM from 'react-dom'
import React from "react"
import { BrowserRouter, Route, Router, Switch, useHistory } from "react-router-dom"
import { Main } from './pages/main'
import { StoryPage } from './pages/storyPage'
import { Provider } from 'react-redux'
import { store } from './store/store'


const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/test">
                        <div>test</div>
                    </Route>
                    <Route path="/story/:id">
                        <StoryPage />
                    </Route>
                    <Route exact path="/">
                        <Main />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

