import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id:string;
    title:string;
    filter:FilterValuesType
}

type TasksType = {[key:string]:Array<TaskType>}

function App() {

let todolistId1=v1();
let todolistId2=v1();

    let[todolists, setTodolists]=useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    const removeTodolist = (todolistId:string) =>{
        setTodolists(todolists.filter(f=>f.id !==todolistId))
    }

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(f=>f.id !==id)})
    }

    function addTask(todolistId: string, title: string) {
/*        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
         setTasks({...tasks,[todolistId]:[{id: v1(), title: title, isDone: false},...tasks[todolistId] ] })
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
/*        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);*/
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(m=>m.id===taskId ? {...m, isDone:isDone}:m)})
    }


/*    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }*/

    function changeFilter(todolistId:string, value: FilterValuesType) {
        setTodolists(todolists.map(m=>m.id===todolistId ? {...m, filter : value} : m))
/*       let currentTodolist = todolists.find(f=>f.id ===todolistId)
        if(currentTodolist){
            currentTodolist.filter=value
            setTodolists([...todolists])
        }*/
    }


    return (
        <div className="App">
            {todolists.map(m=>{
                let tasksForTodolist = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                return <Todolist
                    key={m.id}
                    todolistId={m.id}
                    title={m.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={m.filter}
                    removeTodolist={removeTodolist}
                />
        })}
        </div>
    );
}

export default App;
