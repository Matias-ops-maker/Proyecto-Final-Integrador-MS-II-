import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import UserNavbar from '../../components/UserNavbar.jsx';
import MercadoPagoCheckout from '../../components/MercadoPagoCheckout.jsx';
import api from '../../api.js';
import '../../styles/payments.css';

initMercadoPago('TEST-c14ba9b2-4fda-4c26-85bc-f6e39c96a2f9', {
  locale: 'es-AR'
});

export default function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [paso, setPaso] = useState(1);
  const [datosEntrega, setDatosEntrega] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: ''
  });
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    expiracion: '',
    cvv: ''
  });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);
      setDatosEntrega({
        ...datosEntrega,
        nombre: user.firstName || '',
        apellido: user.lastName || '',
        email: user.email || ''
      });
    }
  }, []);

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  const calcularEnvio = () => {
    const subtotal = calcularSubtotal();
    return subtotal > 100 ? 0 : 15;
  };

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.21;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularEnvio() + calcularImpuestos();
  };

  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    const nuevoCarrito = carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const validarDatos = () => {
    const { nombre, apellido, email, telefono, direccion, ciudad, codigoPostal } = datosEntrega;
    return nombre && apellido && email && telefono && direccion && ciudad && codigoPostal;
  };

  const validarPago = () => {
    if (metodoPago === 'tarjeta') {
      const { numeroTarjeta, nombreTarjeta, expiracion, cvv } = datosPago;
      return numeroTarjeta && nombreTarjeta && expiracion && cvv;
    }
    return true;
  };

  const procesarPedido = async () => {
    setCargando(true);
    
    try {

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesiÃ³n para realizar una compra');
        navigate('/auth/login');
        return;
      }

      const cartItems = carrito.map(item => ({
        product_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.price
      }));

      for (const item of cartItems) {
        await api.post('/cart/items', {
          product_id: item.product_id,
          cantidad: item.cantidad
        });
      }

      const orderData = {
        shipping_address: `${datosEntrega.direccion}, ${datosEntrega.ciudad}, CP: ${datosEntrega.codigoPostal}`,
        payment_method: metodoPago,
        total: calcularTotal()
      };

      const response = await api.post('/orders', orderData);
      
      if (response.data) {

        localStorage.removeItem('carrito');
        setCarrito([]);

        setPaso(4);
        
        }
    } catch (error) {
      let errorMessage = 'Error al procesar el pedido. Intenta nuevamente.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 401) {
        errorMessage = 'Tu sesiÃ³n ha expirado. Por favor, inicia sesiÃ³n nuevamente.';
        navigate('/auth/login');
        return;
      }
      
      alert(errorMessage);
    } finally {
      setCargando(false);
    }
  };

  if (carrito.length === 0 && paso !== 4) {
    return (
      <div className="catalogo-container">
        <div className="checkout-vacio">
          <h2>ðŸ›’ Tu carrito estÃ¡ vacÃ­o</h2>
          <p>Agrega algunos productos para continuar con la compra</p>
          <Link to="/catalogo" className="btn-continuar-comprando">
            ðŸ›ï¸ Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <div className="header-content">
          <Link to="/" className="logo">ðŸª RepuestosAuto</Link>
          <div className="checkout-progress">
            <div className={`step ${paso >= 1 ? 'active' : ''}`}>1. Carrito</div>
            <div className={`step ${paso >= 2 ? 'active' : ''}`}>2. Datos</div>
            <div className={`step ${paso >= 3 ? 'active' : ''}`}>3. Pago</div>
            <div className={`step ${paso >= 4 ? 'active' : ''}`}>4. ConfirmaciÃ³n</div>
          </div>
          <div className="header-actions">
            {usuario ? (
              <span>ðŸ‘¤ {usuario.firstName}</span>
            ) : (
              <Link to="/auth/login" className="auth-link">Iniciar SesiÃ³n</Link>
            )}
          </div>
        </div>
      </header>

      <div className="checkout-content">
        {}
        {paso === 1 && (
          <div className="checkout-paso">
            <h2>ðŸ›’ Revisar Carrito</h2>
            <div className="checkout-grid">
              <div className="carrito-detalle">
                {carrito.map(item => (
                  <div key={item.id} className="checkout-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https:
                      }}
                    />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-marca">ðŸ­ {item.brand}</p>
                      <p className="item-precio">${item.price}</p>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => modificarCantidad(item.id, item.cantidad - 1)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => modificarCantidad(item.id, item.cantidad + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.cantidad).toFixed(2)}
                    </div>
                    <button 
                      className="eliminar-item"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      ðŸ—‘ï¸
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="resumen-pedido">
                <h3>ðŸ“Š Resumen del Pedido</h3>
                <div className="linea-resumen">
                  <span>Subtotal:</span>
                  <span>${calcularSubtotal().toFixed(2)}</span>
                </div>
                <div className="linea-resumen">
                  <span>EnvÃ­o:</span>
                  <span>{calcularEnvio() === 0 ? 'GRATIS' : `$${calcularEnvio().toFixed(2)}`}</span>
                </div>
                <div className="linea-resumen">
                  <span>IVA (21%):</span>
                  <span>${calcularImpuestos().toFixed(2)}</span>
                </div>
                <div className="linea-resumen total">
                  <span>Total:</span>
                  <span>${calcularTotal().toFixed(2)}</span>
                </div>
                
                <button 
                  className="btn-siguiente"
                  onClick={() => setPaso(2)}
                  disabled={carrito.length === 0}
                >
                  âž¡ï¸ Continuar con Datos de Entrega
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {paso === 2 && (
          <div className="checkout-paso">
            <h2>ðŸ“¦ Datos de Entrega</h2>
            <div className="checkout-grid">
              <div className="formulario-entrega">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      value={datosEntrega.nombre}
                      onChange={(e) => setDatosEntrega({...datosEntrega, nombre: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellido *</label>
                    <input
                      type="text"
                      value={datosEntrega.apellido}
                      onChange={(e) => setDatosEntrega({...datosEntrega, apellido: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={datosEntrega.email}
                      onChange={(e) => setDatosEntrega({...datosEntrega, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>TelÃ©fono *</label>
                    <input
                      type="tel"
                      value={datosEntrega.telefono}
                      onChange={(e) => setDatosEntrega({...datosEntrega, telefono: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>DirecciÃ³n *</label>
                  <input
                    type="text"
                    value={datosEntrega.direccion}
                    onChange={(e) => setDatosEntrega({...datosEntrega, direccion: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad *</label>
                    <input
                      type="text"
                      value={datosEntrega.ciudad}
                      onChange={(e) => setDatosEntrega({...datosEntrega, ciudad: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CÃ³digo Postal *</label>
                    <input
                      type="text"
                      value={datosEntrega.codigoPostal}
                      onChange={(e) => setDatosEntrega({...datosEntrega, codigoPostal: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Notas de entrega (opcional)</label>
                  <textarea
                    value={datosEntrega.notas}
                    onChange={(e) => setDatosEntrega({...datosEntrega, notas: e.target.value})}
                    rows="3"
                    placeholder="Instrucciones especiales para la entrega..."
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="btn-anterior"
                    onClick={() => setPaso(1)}
                  >
                    â¬…ï¸ Volver al Carrito
                  </button>
                  <button 
                    className="btn-siguiente"
                    onClick={() => setPaso(3)}
                    disabled={!validarDatos()}
                  >
                    âž¡ï¸ Continuar con Pago
                  </button>
                </div>
              </div>
              
              <div className="resumen-pedido">
                <h3>ðŸ“Š Resumen del Pedido</h3>
                <div className="items-resumen">
                  {carrito.map(item => (
                    <div key={item.id} className="item-resumen">
                      <span>{item.name} x{item.cantidad}</span>
                      <span>${(item.price * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="linea-resumen total">
                  <span>Total:</span>
                  <span>${calcularTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {paso === 3 && (
          <div className="checkout-paso">
            <h2>ðŸ’³ MÃ©todo de Pago</h2>
            <div className="checkout-grid">
              <div className="formulario-pago">
                <div className="metodos-pago">
                  <div className="metodo-option">
                    <input
                      type="radio"
                      id="tarjeta"
                      name="metodoPago"
                      value="tarjeta"
                      checked={metodoPago === 'tarjeta'}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label htmlFor="tarjeta">ðŸ’³ Tarjeta de CrÃ©dito/DÃ©bito</label>
                  </div>
                  <div className="metodo-option">
                    <input
                      type="radio"
                      id="transferencia"
                      name="metodoPago"
                      value="transferencia"
                      checked={metodoPago === 'transferencia'}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label htmlFor="transferencia">ðŸ§ Transferencia Bancaria</label>
                  </div>
                  <div className="metodo-option">
                    <input
                      type="radio"
                      id="efectivo"
                      name="metodoPago"
                      value="efectivo"
                      checked={metodoPago === 'efectivo'}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label htmlFor="efectivo">ðŸ’µ Efectivo contra entrega</label>
                  </div>
                </div>

                {metodoPago === 'tarjeta' && (
                  <div className="form-tarjeta">
                    <div className="form-group">
                      <label>NÃºmero de Tarjeta *</label>
                      <input
                        type="text"
                        value={datosPago.numeroTarjeta}
                        onChange={(e) => setDatosPago({...datosPago, numeroTarjeta: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        value={datosPago.nombreTarjeta}
                        onChange={(e) => setDatosPago({...datosPago, nombreTarjeta: e.target.value})}
                        placeholder="Como aparece en la tarjeta"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Vencimiento *</label>
                        <input
                          type="text"
                          value={datosPago.expiracion}
                          onChange={(e) => setDatosPago({...datosPago, expiracion: e.target.value})}
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          value={datosPago.cvv}
                          onChange={(e) => setDatosPago({...datosPago, cvv: e.target.value})}
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {metodoPago === 'transferencia' && (
                  <div className="info-transferencia">
                    <h4>ðŸ“„ Datos para Transferencia</h4>
                    <p><strong>Banco:</strong> Banco NaciÃ³n</p>
                    <p><strong>CBU:</strong> 0110599520000001234567</p>
                    <p><strong>Alias:</strong> REPUESTOS.AUTO.MP</p>
                    <p><strong>Titular:</strong> RepuestosAuto S.A.</p>
                    <p className="info-note">ðŸ’¡ El pedido se procesarÃ¡ al recibir el comprobante de pago</p>
                  </div>
                )}

                {metodoPago === 'efectivo' && (
                  <div className="info-efectivo">
                    <h4>ðŸ’µ Pago en Efectivo</h4>
                    <p>Puedes pagar en efectivo al momento de la entrega.</p>
                    <p className="info-note">ðŸ’¡ Recuerda tener el monto exacto disponible</p>
                  </div>
                )}
                
                <div className="form-actions">
                  <button 
                    className="btn-anterior"
                    onClick={() => setPaso(2)}
                  >
                    â¬…ï¸ Volver a Datos
                  </button>
                  <button 
                    className="btn-finalizar"
                    onClick={procesarPedido}
                    disabled={!validarPago() || cargando}
                  >
                    {cargando ? 'â³ Procesando...' : 'âœ… Finalizar Pedido'}
                  </button>
                </div>
              </div>
              
              <div className="resumen-pedido">
                <h3>ðŸ“Š Resumen Final</h3>
                <div className="items-resumen">
                  {carrito.map(item => (
                    <div key={item.id} className="item-resumen">
                      <span>{item.name} x{item.cantidad}</span>
                      <span>${(item.price * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="totales-finales">
                  <div className="linea-resumen">
                    <span>Subtotal:</span>
                    <span>${calcularSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="linea-resumen">
                    <span>EnvÃ­o:</span>
                    <span>{calcularEnvio() === 0 ? 'GRATIS' : `$${calcularEnvio().toFixed(2)}`}</span>
                  </div>
                  <div className="linea-resumen">
                    <span>IVA (21%):</span>
                    <span>${calcularImpuestos().toFixed(2)}</span>
                  </div>
                  <div className="linea-resumen total">
                    <span>Total a Pagar:</span>
                    <span>${calcularTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {paso === 4 && (
          <div className="checkout-paso confirmacion">
            <div className="confirmacion-content">
              <div className="confirmacion-icon">âœ…</div>
              <h2>Â¡Pedido Realizado con Ã‰xito!</h2>
              <p>Tu pedido ha sido procesado correctamente.</p>
              <p><strong>NÃºmero de pedido:</strong> #RP{Date.now()}</p>
              
              <div className="proximos-pasos">
                <h3>ðŸ“‹ PrÃ³ximos Pasos:</h3>
                <ul>
                  <li>âœ‰ï¸ RecibirÃ¡s un email de confirmaciÃ³n</li>
                  <li>ðŸ“¦ Prepararemos tu pedido</li>
                  <li>ðŸšš Te notificaremos cuando estÃ© en camino</li>
                  <li>ðŸ  Entrega estimada: 3-5 dÃ­as hÃ¡biles</li>
                </ul>
              </div>
              
              <div className="acciones-finales">
                <Link to="/catalogo" className="btn-continuar-comprando">
                  ðŸ›ï¸ Seguir Comprando
                </Link>
                <Link to="/" className="btn-inicio">
                  ðŸ  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


