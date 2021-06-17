import React from 'react';
import { db } from '../../firebase/firebase.utils';
import { convertSnapshotToArray } from '../../firebase/firebase.tools';


class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            users: null
        }
    }
    

    componentDidMount() {
        db.collection('users').get().then( snapshot => {
            snapshot.forEach(doc => {
                const users = convertSnapshotToArray(snapshot);
                this.setState({
                    users
                })
            })
        }).catch(e => console.log('didMountError: ',e));
    }

    handleUsersData = (users) => (
        users.map((user) => (
            <p>{user.name} </p>
        ))
    )

    render() {
        console.log('state users: ', this.state.users);
        const { users } = this.state;
        console.log('users: ', users);
        return(
            <div>
                <h2>...</h2>
            </div>
            
        )
    }
}

export default Users;