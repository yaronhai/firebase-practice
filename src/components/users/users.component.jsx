import React from 'react';
import { usersCollection } from '../../firebase/firebase.utils';
import { convertSnapshotToArray } from '../../firebase/firebase.tools';
import './users.styles.scss';


class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }
    

    componentDidMount() {
        usersCollection
            .get()
            .then( snapshot => {
                const users = convertSnapshotToArray(snapshot); //array of objects:data + id
                this.setState({
                    users
                })
            })
            .catch(e => console.log('didMountError: ',e));
    }

    handleUsersData = (users) => (
        <div className='users_container'>
            <h1 className='title'>Users info:</h1>
            <div className='users'>
                {users.map((user) => (
                    <h3 
                        key={user.id}
                        className='user'
                    >
                        <p>{user.displayName} </p>
                        <p>{user.email} </p>
                    </h3>
                ))}
            </div>
            
        </div>
    )

    render() {
        const { users } = this.state;
        console.log('Users: ', users);
        return(
            <div>
                {this.handleUsersData(users)}   
            </div> 
        )
    }
}

export default Users;