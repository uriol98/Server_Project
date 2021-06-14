import React, {Component} from 'react';
import {BackButton} from "../Assets/BackButton";
import {Text} from "../Assets/Languages/Language";
import Table from 'react-bootstrap/Table';

const PrivacyNotice = () => {
    return (
        <div id="content">
            <br/>
            <BackButton/>
            <br/>
            <h1> <Text tid="privacyNotice" /></h1>
            <br/>
            <br/>
            <div >
                <h2> <Text tid="legalText" /></h2>
                <Table borderless>
                <tbody>
                    <tr>
                        <td> <strong><Text tid="legalResponsible" /> </strong></td>
                        <td> <Text tid="legalResponsibleText" /></td>
                    </tr>
                    <tr>
                        <td> <strong><Text tid="legalFinality" /> </strong></td>
                        <td> <Text tid="legalFinalityText" /></td>
                    </tr>
                    <tr>
                        <td> <strong><Text tid="legalLegitimacy" /> </strong></td>
                        <td> <Text tid="legalLegitimacyText" /></td>
                    </tr>
                    <tr>
                        <td> <strong><Text tid="legalAddressee" /> </strong></td>
                        <td> <Text tid="legalAddresseeText" /></td>
                    </tr>
                    <tr>
                        <td> <strong><Text tid="legalRights" /> </strong> </td>
                        <td>
                            <p><Text tid="legalRightsText" /> </p>
                            <p> <Text tid="legalRights1" /></p>
                            <p> <Text tid="legalRights2" /></p>
                            <p> <Text tid="legalRights3" /></p>
                            <p> <Text tid="legalRights4" /></p>
                            <p> <Text tid="legalRights5" /></p>
                            <p> <Text tid="legalRights6" /></p>
                            <p> <Text tid="legalRights7" /></p>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>
        </div>);
};
export default PrivacyNotice;
