import React from 'react';
import './App.css';
import Routes from './routes';
import Users from './components/users/users.component';

class App extends React.Component {
   render() {
    return (
      <div className="App">
        <Users />
      </div>
    );
  
  }
}

export default App;
