import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    setTitle:(title:string)=>void
    title:string
    addTask:() => void
}

export const Input = (props:InputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       /* props.setError(null);*/
        if (e.charCode === 13) {
            props.addTask();
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                 /*  className={error ? "error" : ""}*/
            />
        </div>
    );
};

export default Input;