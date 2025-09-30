# Sistema Web para la Venta de Repuestos de Vehículos

## Integrantes

1. Sandoval Sirimarco, Lautaro Agustin  
   [Lautaro.Sandoval98@gmail.com]

2. Aispuro, Francisco  
   [aispurofrancisco2003@gmail.com]

3. Perez Daniele, Matias Sebastian  
   [matiasperezdaniele@gmail.com]

## Descripción del Proyecto

### Problemática

Actualmente, muchas personas que buscan repuestos específicos para sus vehículos enfrentan dificultades para encontrar productos compatibles con su modelo y año. Los sitios existentes suelen tener catálogos desorganizados, sin filtros precisos ni estructura jerárquica clara. 

Este proyecto propone desarrollar una plataforma web que permita a los usuarios navegar por categorías ordenadas siguiendo la estructura:
**Marca → Vehículo → Modelo → Repuestos**

De esta manera, los usuarios podrán realizar compras de forma rápida, segura y eficiente.

### Objetivo General

Desarrollar un sistema web que permita la búsqueda, visualización y compra de repuestos de vehículos, organizados jerárquicamente por marca, modelo y año.

## Funcionalidades Principales

• **Registro/Login de usuarios**  
• **Navegación jerárquica**: Marca → Vehículo → Modelo → Año → Repuestos  
• **Filtros dinámicos** por categoría, precio, disponibilidad  
• **Carrito de compras** y confirmación  
• **Panel de administración** con ABM de productos, marcas y modelos  
• **Reportes de ventas** en PDF y Excel  
• **Perfil de usuario** con historial de compras  

## Arquitectura y Patrones de Diseño

### Patrones Implementados

**Patrón Singleton** para la conexión a la base de datos:
- Garantiza que toda la aplicación backend comparte una única instancia
- Mejora la eficiencia y la gestión de recursos
- Fundamental para proyectos que requieren acceso concurrente y seguro a la base de datos

**Patrón Factory** en los modelos:
- Permite que el sistema sea fácilmente escalable y mantenible
- Facilita la adición de nuevos modelos sin afectar el código existente
- Solo requiere modificar o agregar funciones factory para cambios estructurales

### Beneficios de la Arquitectura

Estos patrones permiten que el proyecto sea más robusto, escalable y fácil de mantener. El alcance actual cubre una arquitectura modular y preparada para crecer, facilitando:

- La integración de nuevas funcionalidades
- El trabajo en equipo
- El mantenimiento del código
- La escalabilidad del sistema

## Consideraciones Técnicas

La elección de tecnologías busca garantizar:
- **Escalabilidad**: Capacidad de crecimiento del sistema
- **Velocidad**: Rendimiento óptimo en las operaciones
- **Facilidad de mantenimiento**: Código limpio y bien estructurado

El sistema está orientado tanto a usuarios finales como a administradores, con una interfaz intuitiva y funcionalidades completas.

## Metodología de Desarrollo

Se prevé que el desarrollo se realice en equipo, con:
- Entregas parciales validadas por el docente
- Documentación técnica completa
- Seguimiento de buenas prácticas de desarrollo
- Arquitectura modular preparada para el crecimiento
