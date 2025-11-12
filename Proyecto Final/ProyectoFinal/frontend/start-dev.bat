@echo off
cd /d "C:\Users\Usuario\Downloads\Front-Back-borrador-TUP\Desktop\ProyectoFinal\frontend"
echo Directorio actual: %CD%
echo Verificando package.json...
if exist package.json (
    echo package.json encontrado
    npm run dev
) else (
    echo ERROR: package.json no encontrado
    dir
)
pause