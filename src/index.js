import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom'
import Thousand from './Thousand';
import TenThousand from './TenThousand';
import Hundred from './Hundred';

ReactDOM.render(<BrowserRouter>
       <div>
           <Route path="/" component={App}/>
            <Route path="/100" component={Hundred}/>
            <Route path="/1000" component={Thousand}/>
            <Route path="/10000" component={TenThousand}/>
       </div>
    </BrowserRouter>
    , document.getElementById('root'));
