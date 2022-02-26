import React from 'react';
import {FilterValuesType} from "../App";

type ButtonType = {
    callBack:()=>void
    name?:string
    filter?:string
}


const Button = (props:ButtonType) => {
    const onClickHandler = ()=> {
props.callBack()
    }
    return (
        <button className={props.filter === props.name ? "activeFilter" : ""}
                onClick={onClickHandler}>{props.name}


        </button>
    );
};

export default Button;