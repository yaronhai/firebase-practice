import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase/firebase.utils';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

firebase.auth().onAuthStateChanged( user => {
  if(user) {
    console.log(user.email)
    console.log(user.uid)
  } else {
    console.log ('NO USER')
  }
})