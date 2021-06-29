import React from 'react';
import { storageRef } from '../../firebase/firebase.utils';

class Upload extends React.Component{

    state = {
        image:null,
        url:'',
        progress:0
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
            (error)=>{console.log(error)},
            ()=>{console.log('upload completed')}
        );
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