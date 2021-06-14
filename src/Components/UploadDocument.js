import React, {Component} from 'react';
import { uploadFile} from "../Assets/APIutils";
import Alert from "react-s-alert";
import Table from 'react-bootstrap/Table';
import {LanguageContext, Text} from "../Assets/Languages/Language";



class UploadDocument extends Component{

    static contextType = LanguageContext;


    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            message: ''
        }
    }

    fileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    handleSubmit = (event) => {

        let { dictionary } = this.context;
        event.preventDefault();
        if(this.state.selectedFile !== null){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            if( this.props.type === "acceptMembership"){
                formData.append("email",this.props.email);
            }
                uploadFile(formData,this.props.type).then(res => {
                    if(this.props.type ==="image") {this.props.refresh();}
                    if(this.props.type ==="acceptMembership") { this.props.history.push("/requests");}
                    Alert.success(dictionary["uploadFileAlert"]);
                    this.setState({message: dictionary.uploadFileAlert});
                }).catch(error => {
                    this.setState({message: error.message});
                    console.log(error.message);
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });


        }
    };

    render() {
        return (
            <div id="uploadForm">

                { this.state.message !== '' && <span >{this.state.message}</span>}
                <form  onSubmit={this.handleSubmit}>
                    <Table>
                        <tbody>
                        <tr>
                            <td><input type="file" name="profileImage" onChange={this.fileChange}/> </td>

                        </tr>
                        <tr>
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
