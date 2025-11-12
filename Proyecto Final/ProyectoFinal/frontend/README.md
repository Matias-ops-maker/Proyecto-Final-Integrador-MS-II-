# 🚗 RepuestosAuto - Frontend React

## 📋 Descripción

Frontend del sistema RepuestosAuto desarrollado con React 18 y Vite. Proporciona una interfaz de usuario moderna y responsiva para el e-commerce de repuestos automotrices con integración completa de MercadoPago.

## ✨ Características Principales

- **React 18**: Framework moderno con hooks y context
- **Vite**: Build tool rápido para desarrollo
- **React Router**: Navegación SPA completa
- **MercadoPago Integration**: Componentes de pago integrados
- **Responsive Design**: Adaptado a todos los dispositivos
- **CSS Modular**: Estilos organizados por componente
- **API Integration**: Conexión completa con backend

## 🚀 Tecnologías Utilizadas

- **React** v18.2+
- **Vite** v7.1+
- **React Router DOM** v6+
- **MercadoPago SDK React** v0.0.19+
- **Axios** (API calls)
- **CSS3** (Estilos personalizados)
- **ESLint** (Code quality)

## 📦 Instalación

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:4000/api
VITE_MP_PUBLIC_KEY=tu_public_key_de_mercadopago
```

### 3. Iniciar en Desarrollo
```bash
npm run dev
```

### 4. Build para Producción
```bash
npm run build
npm run preview
```

## 🌐 Acceso a la Aplicación

- **Desarrollo**: http://localhost:5173
- **Preview**: http://localhost:4173

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación principal
│   ├── Sidebar.jsx     # Sidebar para filtros
│   └── UserNavbar.jsx  # Navegación de usuario
├── pages/              # Páginas de la aplicación
│   ├── admin/          # Panel de administración
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductForm.jsx
│   │   ├── Orders.jsx
│   │   ├── Reports.jsx
│   │   ├── Brands.jsx
│   │   └── Categories.jsx
│   ├── auth/           # Autenticación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   ├── usuario/        # Área de usuario
│   │   ├── Catalogo.jsx
│   │   ├── Carrito.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   └── OrderHistory.jsx
│   └── payments/       # Páginas de pago
│       ├── PaymentSuccess.jsx
│       ├── PaymentFailure.jsx
│       └── PaymentPending.jsx
├── styles/             # Archivos CSS
│   ├── auth.css
│   ├── catalogo.css
│   ├── catalogo-new.css
│   └── usuario.css
├── api.js             # Configuración de API
├── App.jsx           # Componente principal
└── main.jsx         # Punto de entrada
```

## 🔗 Rutas de la Aplicación

### Rutas Públicas
```
/                    # Página principal (catálogo)
/login              # Inicio de sesión
/register           # Registro de usuario
/catalogo           # Catálogo de productos
/carrito            # Carrito de compras
```

### Rutas de Usuario Autenticado
```
/usuario/catalogo    # Catálogo para usuarios
/usuario/carrito     # Carrito de usuario
/usuario/perfil      # Perfil de usuario
/usuario/ordenes     # Historial de órdenes
/usuario/checkout    # Proceso de compra
```

### Rutas de Administrador
```
/admin/dashboard     # Panel de control
/admin/productos     # Gestión de productos
/admin/productos/nuevo  # Crear producto
/admin/productos/editar/:id  # Editar producto
/admin/ordenes       # Gestión de órdenes
/admin/reportes      # Reportes y estadísticas
/admin/marcas        # Gestión de marcas
/admin/categorias    # Gestión de categorías
```

### Rutas de Pago
```
/payment/success     # Pago exitoso
/payment/failure     # Pago fallido
/payment/pending     # Pago pendiente
```

## 💳 Integración MercadoPago

### Configuración
```javascript
// Instalar dependencia
npm install @mercadopago/sdk-react
```

### Componente de Pago
```jsx
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar SDK
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

// Componente Wallet
<Wallet 
  initialization={{ preferenceId: preferenceId }}
  customization={{ texts: { valueProp: 'smart_option' } }}
/>
```

### Proceso de Checkout
```javascript
// 1. Crear preferencia en backend
const response = await fetch('/api/payments/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    items: cartItems,
    totalAmount,
    userInfo
  })
});

const { preferenceId } = await response.json();

// 2. Mostrar Wallet de MercadoPago
setPreferenceId(preferenceId);
```

## 🎨 Estilos y Diseño

### CSS Modular
- **auth.css**: Estilos para login/registro
- **catalogo.css**: Estilos originales del catálogo
- **catalogo-new.css**: Nuevo diseño de dos columnas
- **usuario.css**: Estilos del área de usuario

### Diseño Responsivo
```css
/* Mobile First */
.main-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Desktop */
@media (min-width: 768px) {
  .main-layout {
    grid-template-columns: 300px 1fr;
  }
}
```

### Componentes Clave

#### Navbar
```jsx
<nav className="navbar">
  <div className="nav-brand">
    <Link to="/">RepuestosAuto</Link>
  </div>
  <div className="nav-search">
    <SearchBar />
  </div>
  <div className="nav-actions">
    <CartIcon />
    <UserMenu />
  </div>
</nav>
```

#### SearchBar
```jsx
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const handleSearch = async (searchTerm) => {
    const response = await api.get(`/products/search?q=${searchTerm}`);
    setSuggestions(response.data);
  };
  
  return (
    <div className="search-container">
      <input 
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Buscar productos..."
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(product => (
            <div key={product.id} onClick={() => selectProduct(product)}>
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

#### ProductCard
```jsx
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="brand">{product.Brand?.name}</p>
      <button onClick={() => addToCart(product)}>
        Agregar al Carrito
      </button>
    </div>
  );
};
```

## 🔐 Autenticación

### Context de Autenticación
```jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    
    return { success: true };
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Protected Routes
```jsx
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};
```

## 🛒 Gestión del Carrito

### Context del Carrito
```jsx
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

## 📊 Componentes del Admin

### Dashboard
```jsx
const Dashboard = () => {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    loadDashboardStats();
  }, []);
  
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard title="Productos" value={stats.totalProducts} />
        <StatCard title="Órdenes" value={stats.totalOrders} />
        <StatCard title="Usuarios" value={stats.totalUsers} />
        <StatCard title="Ventas" value={`$${stats.totalSales}`} />
      </div>
      
      <div className="recent-orders">
        <h3>Órdenes Recientes</h3>
        <OrdersList orders={stats.recentOrders} />
      </div>
    </div>
  );
};
```

### ProductForm
```jsx
const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brandId: '',
    imageUrl: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/products', formData);
      navigate('/admin/productos');
    } catch (error) {
      setError('Error al crear producto');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      {/* Más campos... */}
      <button type="submit">Guardar Producto</button>
    </form>
  );
};
```

## 🔧 Scripts NPM

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
}
```

## 🌐 API Integration

### Configuración de Axios
```javascript
// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 10000
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Variables de Producción
```env
VITE_API_URL=https://tu-api.com/api
VITE_MP_PUBLIC_KEY=tu_public_key_produccion
```

### Deploy en Netlify/Vercel
```bash
# Build automático con CI/CD
# Configurar variables de entorno en el dashboard
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .main-layout {
    grid-template-columns: 250px 1fr;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .main-layout {
    grid-template-columns: 300px 1fr;
  }
}
```

## 📞 Soporte

Para soporte técnico:
- 📧 Email: frontend@repuestosauto.com
- 🐛 Issues: GitHub Issues
- 📚 Documentación: /docs

---

## 🏆 Estado: COMPLETAMENTE FUNCIONAL ✅

✅ **Interfaz React completa**  
✅ **Integración MercadoPago operativa**  
✅ **Diseño responsivo**  
✅ **Autenticación JWT funcional**  
✅ **Gestión de carrito operativa**  

**¡Frontend listo para producción!** 🚀
