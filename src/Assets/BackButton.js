import {useHistory} from "react-router-dom";
import React from "react";
import {Text} from "./Languages/Language";

export const BackButton = () =>{
    let history = useHistory();
    return (
        <>
            <button className="btn btn-block btn-primary"  onClick={() => history.goBack()}><Text tid="back" /> </button>
        </>
    )
}
