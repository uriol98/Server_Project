import React, { Component } from 'react';
import {getDocumentByType} from "../Assets/APIutils";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {LanguageContext, Text} from "../Assets/Languages/Language";

class AcceptedMembership extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);

    }

    downloadMembershipDeclaration = (event) => {
        const FileDownload = require('js-file-download');
        getDocumentByType("MEMBERSHIP_DECLARATION").then((response => {
            FileDownload(response, "membership_declaration_"+this.props.currentUser.name+"_"+this.props.currentUser.surname+".pdf" );
        })).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
        });
    };

    downloadConfirmation = (event) => {
        const FileDownload = require('js-file-download');
        getDocumentByType("CONFIRM_MEMBERSHIP").then((response => {
            FileDownload(response, "confirmation_"+this.props.currentUser.name+"_"+this.props.currentUser.surname+".pdf" );
        })).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
        });
    };

    render() {
        let { dictionary } = this.context;
        return (
            <div className="center">
                <div id="content">
                    <p> <Text tid="acceptedMembershipText1" /> { dictionary[this.props.currentUser.roles[0]]}</p>
                    <p> <Text tid="acceptedMembershipText2" /> </p>
                    <br/>
                    <br/>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th> <Text tid="confirmationMembership" /></th>
                                <th>  </th>
                                <th> <Text tid="membershipDeclaration" /> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                            </tr>
                            <tr>
                                <td> <Button onClick={this.downloadConfirmation} className="btn btn-block btn-primary">  <Text tid="download" /> </Button>  </td>
                                <td> </td>
                                <td> <Button onClick={this.downloadMembershipDeclaration} className="btn btn-block btn-primary">  <Text tid="download" /> </Button>  </td>
                            </tr>

                        </tbody>

                    </Table>
                </div>
            </div>
        );
    }
}
export default AcceptedMembership;
