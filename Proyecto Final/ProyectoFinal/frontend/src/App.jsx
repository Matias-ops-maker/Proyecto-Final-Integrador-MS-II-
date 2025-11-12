import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/admin/Dashboard"
import Orders from "./pages/admin/Orders"
import ProductsNew from "./pages/admin/ProductsNew"
import ProductFormNew from "./pages/admin/ProductFormNew"
import Categories from "./pages/admin/Categories"
import Brands from "./pages/admin/Brands"
import Reports from "./pages/admin/Reports"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TestComponent from "./pages/TestComponent";
import HomeFinal from "./pages/usuario/HomeFinal"
import Catalogo from "./pages/usuario/Catalogo"
import Carrito from "./pages/usuario/Carrito"
import ProductoDetalle from "./pages/usuario/ProductoDetalle"
import Checkout from "./pages/usuario/Checkout"
import CheckoutNew from "./pages/CheckoutNew"
import PaymentSuccess from "./pages/PaymentSuccess"
import PaymentFailure from "./pages/PaymentFailure"
import PaymentPending from "./pages/PaymentPending"
import Perfil from "./pages/usuario/Perfil"

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Navbar />
            <div className="admin-content">
                <Sidebar />
                <main className="admin-main">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="products" element={<ProductsNew />} />
                        <Route path="products/new" element={<ProductFormNew />} />
                        <Route path="products/edit/:id" element={<ProductFormNew />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="brands" element={<Brands />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot" element={<ForgotPassword />} />
                <Route path="/" element={<HomeFinal />} />
                <Route path="/test" element={<TestComponent />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/usuario/catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/usuario/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<CheckoutNew />} />
                <Route path="/checkout-old" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />
                <Route path="/payment-pending" element={<PaymentPending />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
        </BrowserRouter>
    )
}

