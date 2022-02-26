import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import Input from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId:string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId:string
    removeTodolist:(todolistId:string)=>void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    console.log(title)

    const addTaskHandlerForAddTitle = () =>{
        props.addTask(props.todolistId, title)
    }

    const onClickHandlerToRemoveTdl = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const tsarFoo=(filter:FilterValuesType)=>{
        props.changeFilter(props.todolistId, filter)
    }

    const onClickHandlerToRemoveTask = (Tid:string) => {
        props.removeTask(props.todolistId, Tid)
    }

    const addTaskHandlerForEnter = () =>{
        props.addTask(props.todolistId, title)
    }

    return <div>
        <h3>{props.title}</h3>
<Button callBack={onClickHandlerToRemoveTdl} name={"x"}/>
        {/*<InputWithBtn todolistId={props.todolistId}
        addTask={props.addTask}
        />*/}
<Input setTitle={setTitle}
       title={title}
       addTask={addTaskHandlerForEnter}
/>
        <Button callBack={addTaskHandlerForAddTitle}/>
        <ul>
            {
                props.tasks.map(t => {

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                          <Button callBack={()=>{onClickHandlerToRemoveTask(t.id)}} name={"X"}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={"all"} callBack={()=>{tsarFoo("all")}} filter={props.filter}/>
            <Button name={"completed"} callBack={()=>{tsarFoo("completed")}} filter={props.filter}/>
            <Button name={"active"} callBack={()=>{tsarFoo("active")}} filter={props.filter}/>
        </div>
    </div>
}
