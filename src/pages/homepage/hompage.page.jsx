import React from 'react';
import {Link} from 'react-router-dom';

class Homepage extends React.Component {

    render() {

        return(
            <div>
                <h1><Link to='/'> Homepage </Link></h1>
                <p><Link to='/login'> Login </Link></p>
                <p><Link to='/users'> Users </Link></p>
                
            </div>

        )
    }
}

export default Homepage;