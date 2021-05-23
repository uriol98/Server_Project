import React, { Component } from 'react';
import {GeneratePDF} from "../Assets/APIutils";

class FilesHandler extends Component{

    constructor(props) {
        super(props);

    }


    downloadEvent = (event) => {
        const FileDownload = require('js-file-download');
        GeneratePDF().then((response => {
            FileDownload(response, this.props.currentUser.name + '_' + this.props.currentUser.surname +'_entryDocument.pdf' );
        })).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
        });
    };

   render(){
       return(
           <div id="content"> Hello world
               <button onClick={this.downloadEvent}> Generate PDF </button>
           </div>
       );
   }


}

export default FilesHandler;
