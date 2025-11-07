@echo off
title RepuestosAuto - Inicialización Completa

echo.
echo ================================================
echo    🚗 REPUESTOSAUTO - SISTEMA COMPLETO 🚗
echo ================================================
echo.
echo Iniciando sistema completo...
echo.

REM Verificar que Node.js esté instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Cambiar al directorio del proyecto
cd /d "%~dp0"
cd Desktop\ProyectoFinal

echo 📦 Instalando dependencias del backend...
cd backend
call npm install

echo.
echo 🔄 Ejecutando seed de la base de datos...
node src/seed.js

echo.
echo 📦 Instalando dependencias del frontend...
cd ..\frontend
call npm install

echo.
echo ================================================
echo    🚀 INICIANDO SERVIDORES 🚀
echo ================================================
echo.

echo Backend iniciado en: http://localhost:4000
echo Frontend iniciado en: http://localhost:5173
echo.
echo 👤 Credenciales de administrador:
echo    Email: admin@repuestos.com
echo    Password: admin123
echo.
echo 👤 Credenciales de usuario:
echo    Email: juan@gmail.com  
echo    Password: user123
echo.
echo ================================================
echo    📋 FUNCIONALIDADES DISPONIBLES 📋
echo ================================================
echo.
echo ✅ Sistema de autenticación completo
echo ✅ Catálogo de productos con 40 items
echo ✅ Carrito de compras funcional
echo ✅ Sistema de órdenes/compras registradas
echo ✅ Panel de administración completo
echo ✅ Gestión de categorías y marcas
echo ✅ Reportes PDF y Excel descargables
echo ✅ Perfil de usuario con historial
echo ✅ Checkout con registro de compras
echo.

REM Iniciar backend en nueva ventana
echo Iniciando backend...
start "RepuestosAuto Backend" cmd /k "cd backend && node src/app.js"

REM Esperar un momento para que el backend inicie
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana  
echo Iniciando frontend...
start "RepuestosAuto Frontend" cmd /k "cd frontend && npm run dev"

REM Esperar un momento para que el frontend inicie
timeout /t 5 /nobreak >nul

REM Abrir navegador
echo Abriendo navegador...
start http://localhost:5173

echo.
echo ✅ Sistema iniciado exitosamente!
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul