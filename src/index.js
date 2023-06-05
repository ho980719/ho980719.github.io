import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {Provider} from "react-redux"
import store from './store.js'
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <App/>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
)

reportWebVitals()
