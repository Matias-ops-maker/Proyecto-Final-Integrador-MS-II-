import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="nav-bar">
            <div className="nav-brand">
                <Link to="/">
                    <h2>ðŸª RepuestosAuto</h2>
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/catalogo">CatÃ¡logo</Link>
                
                {user ? (
                    <>
                        <span>Hola, {user.nombre}!</span>
                        <Link to="/perfil">Mi Perfil</Link>
                        <button onClick={handleLogout} className="btn-logout">
                            Cerrar SesiÃ³n
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login">Iniciar SesiÃ³n</Link>
                        <Link to="/auth/register" className="btn-primary">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
