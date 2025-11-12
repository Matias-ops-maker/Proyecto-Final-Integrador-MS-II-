import { useNavigate } from "react-router-dom";
import "../../styles/usuario.css";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>ðŸŽ›ï¸ Dashboard Administrativo</h1>
                <button 
                    className="btn-secondary"
                    onClick={() => navigate('/perfil')}
                >
                    â† Volver al Perfil
                </button>
            </div>

            <div className="admin-welcome">
                <p>Bienvenido al panel de control administrativo. Desde aquÃ­ puedes gestionar todos los aspectos de RepuestosAuto.</p>
            </div>
            
            <div className="admin-sections">
                <div className="admin-section">
                    <h4>ðŸ“¦ GestiÃ³n de Productos</h4>
                    <div className="admin-buttons">
                        <button 
                            className="admin-action-btn primary"
                            onClick={() => navigate('/admin/products')}
                        >
                            ðŸ“‹ Ver Todos los Productos
                        </button>
                        <button 
                            className="admin-action-btn success"
                            onClick={() => navigate('/admin/products/new')}
                        >
                            âž• Agregar Nuevo Producto
                        </button>
                    </div>
                </div>

                <div className="admin-section">
                    <h4>ðŸ›’ GestiÃ³n de Pedidos</h4>
                    <div className="admin-buttons">
                        <button 
                            className="admin-action-btn primary"
                            onClick={() => navigate('/admin/orders')}
                        >
                            ðŸ“‹ Ver Todos los Pedidos
                        </button>
                        <button 
                            className="admin-action-btn warning"
                            onClick={() => navigate('/admin/orders?status=pending')}
                        >
                            â³ Pedidos Pendientes
                        </button>
                    </div>
                </div>

                <div className="admin-section">
                    <h4>ðŸ“Š Reportes y AnÃ¡lisis</h4>
                    <div className="admin-buttons">
                        <button 
                            className="admin-action-btn primary"
                            onClick={() => navigate('/admin/reports')}
                        >
                            ðŸ“ˆ Ver Reportes
                        </button>
                    </div>
                </div>

                <div className="admin-section quick-actions">
                    <h4>âš¡ Acciones RÃ¡pidas</h4>
                    <div className="quick-actions-grid">
                        <div className="quick-action-card" onClick={() => navigate('/admin/products')}>
                            <span className="quick-icon">ðŸ“¦</span>
                            <span className="quick-text">Productos</span>
                        </div>
                        <div className="quick-action-card" onClick={() => navigate('/admin/orders')}>
                            <span className="quick-icon">ðŸ›’</span>
                            <span className="quick-text">Pedidos</span>
                        </div>
                        <div className="quick-action-card" onClick={() => navigate('/admin/reports')}>
                            <span className="quick-icon">ðŸ“Š</span>
                            <span className="quick-text">Reportes</span>
                        </div>
                        <div className="quick-action-card" onClick={() => navigate('/perfil')}>
                            <span className="quick-icon">ðŸ‘¤</span>
                            <span className="quick-text">Mi Perfil</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
