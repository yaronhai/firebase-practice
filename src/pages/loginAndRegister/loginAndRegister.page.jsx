import React from 'react';
import './loginAndRegister.scss';
import firebase , { usersCollection } from '../../firebase/firebase.utils.js';
import {Link} from 'react-router-dom';

class LoginAndRegister extends React.Component{

    state = {
        user: {
            email: '',
            password: ''
        }
    }


    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]:value
            }
        }))
    }

    handleLogin = (e) => {
        e.preventDefault();
        const {email, password} = this.state.user;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            if (user) {
                console.log('user signed in: ', user)
            }
            else {
                console.log('user is not signed in...')
            }  
        }).catch(e => alert(e))

        console.log(this.state)
    }

    handleRegister = (e) => {
        e.preventDefault();
        const {email, password} = this.state.user;
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            this.handleStoreRegisterUser(user);
            // Send verification email
        //     user.user.sendEmailVerification()
        //     .then(() => console.log('mail sent'))
        //     .catch(e => console.log(e))
        })
        .catch(e => alert(e));
        console.log(this.state)
    }

    handleStoreRegisterUser = (data) => {
        usersCollection.doc(data.user.uid).set({
            displayName: data.user.displayName,
            email: data.user.email
        })
        .then( (data) => console.log(data) )
        .catch( e => console.log(e))
    }
    handleLogout = () => {
        const currUser = firebase.auth().currentUser;
        if (currUser) {
            console.log('Logging out user: ', currUser)
        } else {
            console.log('no user to log out');
            return;
        }
        firebase
        .auth()
        .signOut()
        .then(() => console.log('User logged out: ', this.state.user))
        .catch(e => console.log(e))
    }

    handleGetUserInfo = () => {
        const currUser = firebase.auth().currentUser;
        if(currUser) {
            console.log(currUser)
        } else {
            console.log('No user')
        }
    }

    handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then ( (result) => {
            this.handleStoreRegisterUser(result);
        }).catch(e => console.log(e))
    }



    render(){
        return(
            <div>
                <h1><Link to='/'> Homepage </Link></h1>
                <form onSubmit={e => this.handleLogin(e)}>
                    <div className='form-group'>
                        <label> Email </label>
                        <input 
                            type='email'
                            className='form-control'
                            name='email'
                            onChange= {(e) => this.handleChange(e) }
                        />
                    </div>

                    <div className='form-group'>
                        <label> password </label>
                        <input 
                            type='password'
                            className='form-control'
                            name='password'
                            onChange= {(e) => this.handleChange(e) }
                        />
                    </div>

                    <button 
                       type='submit'
                       className='btn btn-primary'
                       onClick={e => this.handleLogin(e)}
                    >
                        SIGN IN
                    </button>

                    <button
                       type='submit'
                       className='btn btn-primary'
                       onClick={e => this.handleRegister(e)}
                    >
                        REGISTER
                    </button>
                </form>
                <hr/>
                <button onClick={ (e) => this.handleLogout(e)}>
                    Logout
                </button>
                <hr/>
                <button onClick={ (e) => this.handleGetUserInfo(e)}>
                    Get user info
                </button>
                <hr/>
                <button onClick={ (e) => this.handleGoogleSignIn(e)}>
                    Google Sign In
                </button>

            </div>
        )
    }
}

export default LoginAndRegister;