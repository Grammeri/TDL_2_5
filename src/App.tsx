import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListPropsType = {
    id:string
    title:string
    filter:FilterValuesType
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolist] = useState<Array<TodoListPropsType>>([
        {id:todolistId1, title:"Book", filter:"active"},
        {id:todolistId2, title:"Milk", filter:"completed"},
    ])

    const removeTodolist =(todolistId:string)=>{
        debugger;
        let filteredTodolist = todolists.filter(f=>f.id!==todolistId)
        setTodolist(filteredTodolist)
        delete tasksObj[todolistId]
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    });


    function removeTask(id: string, todolistId:string) {

        let tasks = tasksObj[todolistId];//this is required array
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId]=filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId:string) {
        let task = {id: v1(), title: title, isDone: false};//We need to add this into the required array
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId]=newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(f => f.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }

/*   let todolistId1 = v1()
   let todolistId2 = v1()*/



    return (
        <div className="App">
            {
                todolists.map((m) => {
                let tasksForTodolist = tasksObj[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }

                return (
                    <Todolist title={m.title}
                              key={m.id}
                              id={m.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={m.filter}
                              removeTodolist={removeTodolist}
                    />)

            })
            }

        </div>
    );
}

export default App;
