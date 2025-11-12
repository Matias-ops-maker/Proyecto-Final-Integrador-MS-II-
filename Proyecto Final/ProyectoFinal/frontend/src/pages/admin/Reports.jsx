import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/usuario.css";

export default function Reports() {
    const navigate = useNavigate();

    const downloadFile = async (type) => {
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesiÃ³n como administrador');
            return;
        }

        const res = await fetch(`http:
            headers: { 
                "x-api-key": "mi_api_key_super_secreta",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!res.ok) {
            alert("Error al descargar archivo");
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ventas.${type === "pdf" ? "pdf" : "xlsx"}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        } catch (error) {
        alert("No se pudo descargar el archivo");
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>ðŸ“Š Reportes de Ventas</h1>
                <button 
                    className="btn-secondary"
                    onClick={() => navigate('/admin/dashboard')}
                >
                    â† Volver al Dashboard
                </button>
            </div>

            <div className="admin-welcome">
                <p>AquÃ­ puedes descargar los reportes de ventas en diferentes formatos.</p>
            </div>

            <div className="admin-sections">
                <div className="admin-section">
                    <h4>ðŸ“„ Reportes Disponibles</h4>
                    <div className="admin-buttons">
                        <button 
                            className="admin-action-btn primary"
                            onClick={() => downloadFile("pdf")}
                        >
                            ðŸ“„ Descargar PDF
                        </button>
                        <button 
                            className="admin-action-btn success"
                            onClick={() => downloadFile("xlsx")}
                        >
                            ðŸ“Š Descargar Excel
                        </button>
                    </div>
                </div>

                <div className="admin-section">
                    <h4>ðŸ“ˆ InformaciÃ³n de Reportes</h4>
                    <div className="admin-stats">
                        <span className="stat-item">ðŸ“… Datos actualizados al dÃ­a de hoy</span>
                        <span className="stat-item">ðŸ’¾ Formatos disponibles: PDF y Excel</span>
                        <span className="stat-item">ðŸ“Š Incluye ventas, productos y estadÃ­sticas</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
