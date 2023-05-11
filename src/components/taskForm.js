import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../bd";

export default function Task(props) {

    const initialStateTasks = {
        name: '',
        description: '',
        date: '',
    }
    const  [task, setTask] = useState(initialStateTasks);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        props.actionTask(task);
        setTask({...initialStateTasks});
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setTask({...task, [name]:value});
    };

    const getTaskById = async (id) =>{
        const docRef = doc(db, 'tasks', id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().nameObject);
        setTask({...docSnap.data().nameObject});
    }

    useEffect(()=>{
        if(props.currentId===''){
            setTask({...initialStateTasks});
        }else{
            getTaskById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <div className="log-box">
            <h2 className="text-center">Nueva tarea</h2>
            <form onSubmit={handleSubmit}>
            <div className="register d-flex flex-column">
                <label htmlFor="name">Nombre de la tarea:</label> 
                <input type="text" name="name" className="form-control" placeholder="nombre ejemplo" onChange={handleChange} value={task.name}/>

                <label htmlFor="description">Descripción:</label>
                <textarea className="form-control" name="description" placeholder="Descripción" onChange={handleChange} value={task.description}></textarea>

                <label htmlFor="date">Fecha:</label>
                <input type="date" className="form-control" name="date" onChange={handleChange} value={task.date}></input>

                <button className="btn-log btn btn-success btn-block">{props.currentId===''? 'Registrar tarea' : 'Guardar cambios'}</button>

            </div>
          </form>
        </div>
    )
}