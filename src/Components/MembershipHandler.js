import React, { Component } from 'react';
import {GeneratePDF, requestMembership} from "../Assets/APIutils";
import Button from 'react-bootstrap/Button';
import ReactTable from "react-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import UploadDocument from "./UploadDocument";
import {Text} from "../Assets/Languages/Language";
import AcceptedMembership from "./AcceptedMembership";
import NotAcceptedMembership from "./NotAcceptedMembership";
import {BackButton} from "../Assets/BackButton";



class MembershipHandler extends Component{

    constructor(props) {
        super(props);

    }


   render(){
       return(

           <div className="center">
               <div id="content">
                   <BackButton/>
                   <br/>
                   <h1> <Text tid="membership" /></h1>
                   { this.props.currentUser.state === "ACCEPTED" && this.props.currentUser.roles[0] !== "ROLE_NEW"
                        ? (<AcceptedMembership {...this.props} />) :
                       (<NotAcceptedMembership {...this.props} />)

                   }
               </div>
           </div>
       );
   }


}

export default MembershipHandler;
