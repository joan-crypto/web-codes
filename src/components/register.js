import { useState } from "react"
import { useAuth } from "../context/authContext.js";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const  [user, setUser] = useState ({
        email: '',
        password: '',
        });
    const [error, setError] = useState();

    const {signup} = useAuth();
    const navigate = useNavigate();

    const handleChange = ({target:{name, value}}) =>{
        setUser({...user, [name]:value})
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        try{
        await signup(user.email, user.password);
        navigate('/');
        }catch(error){
            console.log(error.code);
            if(error.code === "auth/weak-password"){
                setError('La contraseña debe ser de al menos 6 caracteres');
            }else if(error.code ==="auth/email-already-in-use"){
                setError('El correo ya esta registrado');
            }
        }
        
    }

    const changePage = (e) =>{
        e.preventDefault();
        navigate('/');
        }

    return (
        <div className="login">
             <div className="log-box">
            <h2 className="text-center">Registrarse</h2>
            {error && <p className="alert text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
            <div className="register d-flex flex-column">
                <label htmlFor="email">Correo electrónico</label> 
                <input type="email" name="email" className="form-control" placeholder="tucorreo@ejemplo.com" onChange={handleChange}/>

                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="******" onChange={handleChange}/>

                <button className="btn-log btn btn-success">Registrarse</button>
                <button className="btn-log btn btn-outline-success" onClick={changePage}>Inicar Sesión</button>
            </div>
          </form>
        </div>
        </div>
    )
}