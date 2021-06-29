import React from 'react';
import { storageRef } from '../../firebase/firebase.utils';

class Upload extends React.Component{
    constructor(props) {
        super(props);

        const pauseRef = React.createRef();
        const resumeRef = React.createRef();
        const cancelRef = React.createRef();

        this.state = {
            image:null,
            url:'',
            progress:0
        }
    }

    

    render(){
        return(
            <div>
                <form onSubmit={this.handleUpload}>
                    <progress value={this.state.progress} max='100'/>
                    <div className='form-group'>
                        <label>File</label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={ this.handleChange}
                        />
                    </div>

                </form>

                <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={ this.handleUpload }
                >
                    Upload file
                </button>
                <hr/>

                <div className='form-group'>
                    <button className='btn btn-primary' ref={this.pauseRef}>PAUSE</button>
                    <button className='btn btn-primary' ref={this.resumeRef}>RESUME</button>
                    <button className='btn btn-primary' ref={this.cancelRef}>CANCEL</button>
                </div>

            </div>
        )
    }

    handleUpload = (event) => {
        event.preventDefault();
        const {image} = this.state;
        if (!image) {
            console.log('no image to upload')
            return;
        }
        const uploadTask = storageRef.child(`/images/users/${image.name}`).put(image)

        uploadTask
        .on('state_changed',
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                this.setState({progress})
                switch(snapshot.state) {
                    case 'paused':
                        console.log('upload paused');
                        break;
                    case 'error':
                        console.log('error');
                        break;
                    case 'success':
                        console.log('success');
                        break;
                    default:
                        console.log(snapshot.state);
                }
            },
            (error)=>{
                console.log(error);
                this.setState({progress:0})
            },
            ()=>{console.log('upload completed')}
        );

        this.pauseRef.current.addEventListener('click', ()=>{
            uploadTask.pause();
        })
        this.resumeRef.current.addEventListener('click',()=>{
            uploadTask.resume();
        })
        this.cancelRef.current.addEventListener('click',()=>{
            uploadTask.cancel();
        })
    }

    handleChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState({
                image
            })
        }
    }
}

export default Upload;