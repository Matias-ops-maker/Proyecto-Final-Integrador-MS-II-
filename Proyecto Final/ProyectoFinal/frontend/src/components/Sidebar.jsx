import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: 'ðŸŽ›ï¸', label: 'Dashboard' },
        { path: '/admin/products', icon: 'ðŸ“¦', label: 'Productos' },
        { path: '/admin/products/new', icon: 'âž•', label: 'Nuevo Producto' },
        { path: '/admin/orders', icon: 'ðŸ›’', label: 'Pedidos' },
        { path: '/admin/categories', icon: 'ðŸ“‚', label: 'CategorÃ­as' },
        { path: '/admin/brands', icon: 'ðŸ·ï¸', label: 'Marcas' },
        { path: '/admin/reports', icon: 'ðŸ“Š', label: 'Reportes' },
    ];

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h1>ðŸ”§ Panel Admin</h1>
            </div>
            
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <Link to="/" className="sidebar-item">
                    <span className="sidebar-icon">ðŸ </span>
                    <span className="sidebar-label">Ir al Sitio</span>
                </Link>
                <button onClick={handleLogout} className="sidebar-item logout">
                    <span className="sidebar-icon">ðŸšª</span>
                    <span className="sidebar-label">Cerrar SesiÃ³n</span>
                </button>
            </div>
        </div>
    )
}
