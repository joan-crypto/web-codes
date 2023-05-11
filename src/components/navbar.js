import { useAuth } from "../context/authContext.js";

export default function Navbar(){
    const {user, logOut, loading} = useAuth();

    const handleSignOut = async () =>{
        await logOut();
    }
    if(loading) return <h1>Loading</h1> 

    return (
            <nav className="header navbar navbar-expand-lg navbar-light bg-light">
                <nav className="container-fluid">
                    <h2>Tareas</h2>
                    <h2>Usuario: {user.email}</h2> 
                    <button className="btn-logout btn btn-success" onClick={handleSignOut}>Cerrar Sesión</button>
                </nav>
            </nav>
        )
}