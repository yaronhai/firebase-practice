import React from 'react';
import { db } from '../../firebase/firebase.utils';
import { convertSnapshotToArray } from '../../firebase/firebase.tools';


class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }
    

    componentDidMount() {
        db.collection('users').get().then( snapshot => {
            const users = convertSnapshotToArray(snapshot);
            this.setState({
                users
            })
        }).catch(e => console.log('didMountError: ',e));
    }

    handleUsersData = (users) => (
        users.map((user) => (
            <p key={user.id}>{user.email} </p>
        ))
    )

    render() {
        console.log('state users: ', this.state.users);
        const { users } = this.state;
        console.log('users: ', users);
        return(
            <div>
                {this.handleUsersData(users)}   
            </div>
            
        )
    }
}

export default Users;