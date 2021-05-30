import React, {Component} from 'react';
import { uploadFile} from "../Assets/APIutils";
import Alert from "react-s-alert";
import Table from 'react-bootstrap/Table';
import {Text} from "../Assets/Languages/Language";



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
            uploadFile(formData,"image").then(res => {
                this.props.refresh();
                console.log("File upload successfully");
                this.setState({error: ''});
            }).catch(error => {
                this.setState({error: error.message});
                console.log(error.message);
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
    };

    render() {
        return (
            <div id="content">

                { this.state.error !== '' && <span style={{color: "red"}}>{this.state.error}</span>}
                <form  onSubmit={this.handleSubmit}>
                    <Table>
                        <tbody>
                        <tr>
                            <td><input type="file" name="profileImage" onChange={this.fileChange}/> </td>
                            <td><button type="submit" className="btn btn-block btn-primary"><Text tid="upload" /> <Text tid="file" /></button> </td>
                        </tr>
                        </tbody>

                    </Table>

                </form>
            </div>
        );
    }
}
export default UploadDocument;
