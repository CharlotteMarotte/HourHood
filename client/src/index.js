import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <React.StrictMode>
        {/* To enable React Router, wrap the entire App in <BrowserRouter>  */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
