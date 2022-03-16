import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title:string
    callBack:(title:string)=>void
}

const EditableSpan = ({title, ...props}:EditableSpanPropsType) => {

    const [edit, setEdit]=useState(false)
    const [newTitle, setNewTitle]=useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle)
        }
    }
    const editTrue = () => {
        setEdit(true)
    }

    const editFalse = () => {
        setEdit(false)
    }
    addTask()

    return (
        edit
          ? <input value={newTitle}
                   onBlur={editFalse}
                   autoFocus
            onChange={onChangeHandler}
            />
            : <span onDoubleClick={editTrue}>{newTitle}</span>
          );
};

export default EditableSpan;