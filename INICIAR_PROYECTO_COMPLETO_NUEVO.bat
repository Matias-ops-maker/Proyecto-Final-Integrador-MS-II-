@echo off
echo ========================================
echo   INICIANDO PROYECTO COMPLETO
echo ========================================

REM Crear ventana separada para el backend
echo Iniciando Backend...
start "Backend Server" /d "C:\Users\Usuario\Downloads\Front-Back-borrador-TUP\Desktop\ProyectoFinal\backend" cmd /k "npm start"

REM Esperar un momento antes de iniciar el frontend
timeout /t 3 /nobreak > nul

REM Crear ventana separada para el frontend  
echo Iniciando Frontend...
start "Frontend Server" /d "C:\Users\Usuario\Downloads\Front-Back-borrador-TUP\Desktop\ProyectoFinal\frontend" cmd /k "npm run dev"

REM Esperar y abrir el navegador
timeout /t 5 /nobreak > nul
echo Abriendo navegador...
start http://localhost:5173/

echo ========================================
echo   PROYECTO INICIADO CORRECTAMENTE
echo ========================================
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
pause