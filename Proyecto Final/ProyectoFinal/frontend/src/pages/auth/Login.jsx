import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api.js';
import '../../styles/auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email vÃ¡lido');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', formData);

      if (response.data && response.data.token) {
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        if (response.data.user.rol === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Respuesta invÃ¡lida del servidor');
      }
    } catch (err) {
      
      if (err.response) {
        
        const status = err.response.status;
        const errorMessage = err.response.data?.error || err.response.data?.message;
        
        if (status === 400) {
          setError(errorMessage || 'Datos de entrada invÃ¡lidos');
        } else if (status === 401) {
          setError('Credenciales incorrectas. Verifica tu email y contraseÃ±a.');
        } else if (status === 429) {
          setError('Demasiados intentos. Intenta de nuevo mÃ¡s tarde.');
        } else if (status >= 500) {
          setError('Error del servidor. Intenta de nuevo mÃ¡s tarde.');
        } else {
          setError(errorMessage || 'Error al iniciar sesiÃ³n');
        }
      } else if (err.request) {
        
        setError('No se puede conectar al servidor. Verifica tu conexiÃ³n e intenta de nuevo.');
      } else {
        
        setError('Error inesperado. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-link">â† Volver al inicio</Link>
          <h1>ðŸª RepuestosAuto</h1>
          <h2>Iniciar SesiÃ³n</h2>
          <p>Accede a tu cuenta para gestionar tus compras</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">ðŸ“§ Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">ðŸ”’ ContraseÃ±a</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseÃ±a"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'â³ Iniciando sesiÃ³n...' : 'ðŸš€ Iniciar SesiÃ³n'}
          </button>
        </form>

        <div className="auth-links">
          <p>Â¿No tienes cuenta? <Link to="/auth/register">RegÃ­strate aquÃ­</Link></p>
          <p><Link to="/auth/forgot">Â¿Olvidaste tu contraseÃ±a?</Link></p>
        </div>

        <div className="demo-accounts">
          <h4>ðŸ§ª Cuentas de prueba:</h4>
          <div className="demo-list">
            <div className="demo-account">
              <strong>ðŸ‘¤ Usuario:</strong> juan@gmail.com / user123
            </div>
            <div className="demo-account">
              <strong>ðŸ‘‘ Admin:</strong> admin@repuestos.com / admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


