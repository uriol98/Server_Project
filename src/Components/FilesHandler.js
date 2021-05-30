import React, { Component } from 'react';
import {GeneratePDF} from "../Assets/APIutils";
import Button from 'react-bootstrap/Button';
import ReactTable from "react-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import UploadDocument from "./UploadDocument";
import {Text} from "../Assets/Languages/Language";



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

           <div className="center">
               <div id="content">
                   <h1> <Text tid="membership" /></h1>
                    <br/>
                   <Table borderless>
                       <tr>
                           <th><Text tid="generatePDF" /></th>
                           <th> </th>
                           <th><Text tid="upload" /> <Text tid="membership" /> <Text tid="file" /></th>
                       </tr>
                       <tbody>
                        <tr>
                            <td><Button onClick={this.downloadEvent} className="btn btn-block btn-primary"> <Text tid="generatePDF" /> </Button> </td>
                            <td> </td>
                            <td><UploadDocument /></td>
                        </tr>
                       </tbody>
                   </Table>

               </div>
           </div>
       );
   }


}

export default FilesHandler;
