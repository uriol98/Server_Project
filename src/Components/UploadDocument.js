import React, {Component} from 'react';
import { uploadFile} from "../Assets/APIutils";
import Alert from "react-s-alert";


class UploadDocument extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            error: ''
        }
    }

    fileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();
        if(this.state.selectedFile !== null){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            uploadFile(formData).then(res => {
                this.props.refresh();
                console.log("Updated profile image");
            }).catch(error => {
                this.setState({error: error.message});
                console.log(error.message);
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
    }

    render() {
        return (
            <div id="content">

                { this.state.error !== '' && <span style={{color: "red"}}>{this.state.error}</span>}
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <input type="file" name="profileImage" onChange={this.fileChange}/>
                    <br />
                    <br />
                    <br />
                    <button type="submit" className="btn btn-block btn-primary">Upload profile image</button>
                </form>
            </div>
        );
    }
}
export default UploadDocument;
