import Navbar from "./navbar.js";
import Task from "./taskForm.js";
import {db} from '../bd.js';
import {addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';

export function Home() {
    const [tasks, setTasks] = useState([])
    const [currentId, setCurrentId] = useState('');

const actionTask = async (nameObject) =>{
    if(currentId===''){
        const docRef = await addDoc(collection(db, 'tasks'), {nameObject});
        console.log('Tarea agregada con ID:', docRef.id );
        toast('Nueva tarea agregada', {
            type: 'success'
        });
    }else{
        const washingtonRef = doc(db, 'tasks', currentId);
        await updateDoc(washingtonRef, {
            nameObject
        });
        toast('Tarea actualizada', {
            type: 'warning'
        })
        setCurrentId('');
    }
}

const getTasks = async () =>{
    const q = query(collection(db, 'tasks'));
    onSnapshot(q, (querySnapchot) =>{
        const docs = [];
        querySnapchot.forEach((doc)=>{
            docs.push({...doc.data(), id:doc.id});
        });
        console.log(docs);
        setTasks(docs);
    })
}

const onDelete = async (id) =>{
    if(window.confirm('¿Deseas eliminar esta tarea?')){
        await deleteDoc(doc(db, 'tasks', id));
        toast('Tarea eliminada', {
            type: 'error'
        })
    }
}
 
useEffect(() =>{
getTasks();
}, []);

    return (
        <div className="home d-flex">
            <Navbar />
            <Task {...{actionTask, currentId, tasks}}/>
            <div className="col-md-8">
                {tasks.map((task) =>(
                    <div className="card mb-1">
                        <div className="card-body">
                            <div key={task.id}>
                                <div className="d-flex">
                                    <div className="col-md-10">
                                        <h3>Tarea: {task.nameObject.name}</h3>
                                    </div>
                                    <button className="btn btn-danger m-2"> <i className="medium material-icons" onClick={()=>onDelete(task.id)}>delete</i></button>
                                    <button className="btn btn-lg btn-success m-2"> <i className="medium material-icons" onClick={()=>setCurrentId(task.id)}>create</i></button>
                                </div>
                            <p>Descripción: {task.nameObject.description}</p>
                            <p>Fecha: {task.nameObject.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )
    
}