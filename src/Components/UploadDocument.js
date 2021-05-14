import React, {Component} from 'react';


class UploadDocument extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    fileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    handleSubmit = (event) => {
        if(this.state.selectedFile !== null){
            const formData = new FormData();
            formData.append('profileImage', this.state.selectedFile,this.state.selectedFile.name);
            axios.post( + '')
        }
    }

    render() {
        return (
            <div id="content">
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <input type="file" name="profileImage" onChange={this.fileChange}/>
                    <br />
                    <button type="submit" className="btn btn-block btn-primary">Upload profile image</button>
                </form>
            </div>
        );
    }
}
export default UploadDocument;
