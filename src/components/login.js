import { useState } from "react"
import { useAuth } from "../context/authContext.js";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const  [user, setUser] = useState ({
        email: '',
        password: '',
        });
    const [error, setError] = useState();

    const {signIn} = useAuth();
    const navigate = useNavigate();

    const handleChange = ({target:{name, value}}) =>{
        setUser({...user, [name]:value})
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        try{
        await signIn(user.email, user.password);
        navigate('/home');
        }catch(error){
            console.log(error.code);
            if(error.code === "auth/wrong-password"){
                setError('Contraseña inválida');
            }else if(error.code ==="auth/user-not-found"){
                setError('El correo no está registrado');
            }
        }
        
    }

    const changePage = (e) =>{
    e.preventDefault();
    navigate('/register');
    }

    return (
        <div className="login">
            <div className="log-box">
            <h2 className="text-center">Iniciar Sesión</h2>
            {error && <p className="alert text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
            <div className="register d-flex flex-column">
                <label htmlFor="email">Correo electrónico</label> 
                <input type="email" name="email" className="form-control" placeholder="tucorreo@ejemplo.com" onChange={handleChange}/>

                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="******" onChange={handleChange}/>

                <button className="btn-log btn btn-success">Iniciar Sesión</button>
                <button className="btn-log btn btn-outline-success" onClick={changePage}>Registrarse</button>
                
            </div>
          </form>
        </div>
        </div>
    )
}