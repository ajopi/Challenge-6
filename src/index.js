import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './Pages/Layout';
import './Assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import store from './Redux/store/store'



store.subscribe(() =>{
  console.log(store.getState(), "ini adalah data API"); 
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
