import React, { Component } from 'react';
import {canMakeRequest, GeneratePDF, requestMembership} from "../Assets/APIutils";
import Button from 'react-bootstrap/Button';
import ReactTable from "react-table";
import Alert from 'react-s-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import UploadDocument from "./UploadDocument";
import {LanguageContext, Text} from "../Assets/Languages/Language";
import {NavLink} from "react-router-dom";

class NotAcceptedMembership extends Component{
    constructor(props) {
        super(props);

    }

    static contextType = LanguageContext;

    downloadEvent = (event) => {


        const FileDownload = require('js-file-download');
        GeneratePDF().then((response => {
            FileDownload(response, this.props.currentUser.name + '_' + this.props.currentUser.surname +'_entryDocument.pdf' );
        })).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
        });
    };

    makeRequestMembership = (event) => {

        let { dictionary} = this.context;
        let isAble = false;
        canMakeRequest().then((response => {
            requestMembership().then((response => {
                this.props.refresh();
            })).catch(error => {
                this.setState({error: error.message});
                console.log(error.message);
            });
        })).catch(error => {
            this.setState({error: dictionary.errorMembershipRequest});
            Alert.error( dictionary.errorMembershipRequest);
        });

    };

    render(){
        let { dictionary } = this.context
        const newTo = {
            pathname: "/membershipForm/",
            currentUser: this.props.currentUser,
        };
        return(

            <div className="center">
                <div id="content">
                    <br/>
                    { this.props.currentUser.state === "REJECTED" && (
                        <span style={{color: "red"}}>{ dictionary.rejectText}</span>
                    )}
                    <Table borderless>
                        <thead>
                            <tr>

                                <th><Text tid="generatePDF" /></th>
                                <th> </th>
                                <th><Text tid="upload" /> <Text tid="membership" /> <Text tid="file" /></th>
                                <th> </th>
                                <th> <Text tid="diploma" /></th>

                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td> </td>
                        </tr>
                        <tr>
                            <td><NavLink to={newTo} > <Text tid="editMembershipForm" /> </NavLink>
                            <br/>
                            <br/>
                            <Button onClick={this.downloadEvent} className="btn btn-block btn-primary"> <Text tid="generatePDF" /> </Button>
                            </td>
                            <td> </td>
                            <td><UploadDocument type="membership" /></td>
                            <td> </td>
                            <td> <UploadDocument type="diploma" /> </td>
                        </tr>

                        </tbody>
                    </Table>
                    <br/>
                    <p> <strong><Text tid="informationPDF" /> </strong></p>
                    <br/>
                    <h2> <Text tid="makeMembershipRequest" /></h2>
                    <br/>
                    { this.props.currentUser.state === "REQUEST" ?
                        (<p> Request done. Waiting for a a response of the admins</p>)
                        : (
                            <React.Fragment>
                                <p> <Text tid="requestText" /></p>
                                <br/>
                                <Button className="btn btn-block btn-primary" onClick={this.makeRequestMembership} > Request </Button>
                            </React.Fragment>)
                    }
                </div>
            </div>
        );
    }

}

export default NotAcceptedMembership;
