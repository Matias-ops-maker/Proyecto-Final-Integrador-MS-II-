import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api.js";
import "../../styles/usuario.css";

export default function Brands() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        pais: ''
    });
    const fetchBrands = async () => {
        try {
            setLoading(true);
            const staticBrands = [
                { id: 1, nombre: 'Bosch', descripcion: 'TecnologÃ­a automotriz alemana', pais: 'Alemania', productos: 15 },
                { id: 2, nombre: 'NGK', descripcion: 'Especialista en bujÃ­as y componentes', pais: 'JapÃ³n', productos: 8 },
                { id: 3, nombre: 'Mann Filter', descripcion: 'Filtros de alta calidad', pais: 'Alemania', productos: 6 },
                { id: 4, nombre: 'Castrol', descripcion: 'Aceites y lubricantes premium', pais: 'Reino Unido', productos: 5 },
                { id: 5, nombre: 'Monroe', descripcion: 'Sistemas de suspensiÃ³n', pais: 'Estados Unidos', productos: 4 },
                { id: 6, nombre: 'Brembo', descripcion: 'Sistemas de frenado deportivo', pais: 'Italia', productos: 2 }
            ];
            setBrands(staticBrands);
        } catch (error) {
            } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBrand) {
                } else {
                }
            
            setShowForm(false);
            setEditingBrand(null);
            setFormData({ nombre: '', descripcion: '', pais: '' });
            fetchBrands();
        } catch (error) {
            }
    };

    const deleteBrand = async (id) => {
        if (!confirm("Â¿EstÃ¡s seguro de que quieres eliminar esta marca?")) {
            return;
        }
        
        try {
            fetchBrands();
        } catch (error) {
            }
    };

    const editBrand = (brand) => {
        setEditingBrand(brand);
        setFormData({
            nombre: brand.nombre,
            descripcion: brand.descripcion,
            pais: brand.pais
        });
        setShowForm(true);
    };

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando marcas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>ðŸ­ GestiÃ³n de Marcas</h1>
                <div className="header-buttons">
                    <button 
                        className="btn-primary"
                        onClick={() => {
                            setEditingBrand(null);
                            setFormData({ nombre: '', descripcion: '', pais: '' });
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? 'âŒ Cancelar' : 'âž• Nueva Marca'}
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        â† Volver al Dashboard
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="category-form">
                        <h3>{editingBrand ? 'Editar Marca' : 'Nueva Marca'}</h3>
                        
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre de la Marca *</label>
                            <input
                                type="text"
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                required
                                placeholder="Ej: Bosch"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pais">PaÃ­s de Origen</label>
                            <input
                                type="text"
                                id="pais"
                                value={formData.pais}
                                onChange={(e) => setFormData({...formData, pais: e.target.value})}
                                placeholder="Ej: Alemania"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion">DescripciÃ³n</label>
                            <textarea
                                id="descripcion"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                rows="3"
                                placeholder="DescripciÃ³n de la marca..."
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn-primary">
                                {editingBrand ? 'Actualizar' : 'Crear'} Marca
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>PaÃ­s</th>
                            <th>DescripciÃ³n</th>
                            <th>Productos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map(brand => (
                            <tr key={brand.id} className="product-row">
                                <td>#{brand.id}</td>
                                <td className="name-cell">
                                    <div className="product-name">{brand.nombre}</div>
                                </td>
                                <td>{brand.pais}</td>
                                <td className="description-cell">
                                    {brand.descripcion}
                                </td>
                                <td>
                                    <span className="product-count">{brand.productos} productos</span>
                                </td>
                                <td className="actions-cell">
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-action edit"
                                            onClick={() => editBrand(brand)}
                                            title="Editar marca"
                                        >
                                            âœï¸
                                        </button>
                                        <button 
                                            className="btn-action delete"
                                            onClick={() => deleteBrand(brand.id)}
                                            title="Eliminar marca"
                                        >
                                            ðŸ—‘ï¸
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-stats-footer">
                <div className="stat-card">
                    <span className="stat-number">{brands.length}</span>
                    <span className="stat-label">Total marcas</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">
                        {brands.reduce((sum, brand) => sum + brand.productos, 0)}
                    </span>
                    <span className="stat-label">Total productos</span>
                </div>
            </div>
        </div>
    );
}

