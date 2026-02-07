a) Descripción del proyecto
API REST para la gestión de inventario de activos tecnológicos de Grupo EMIN. Permite registrar, consultar, actualizar y eliminar (soft delete) activos como notebooks, monitores, licencias de software y periféricos. Incluye sistema de autenticación JWT, gestión de usuarios y empresas, búsqueda avanzada con filtros, y paginación.

b) Tecnologías utilizadas y justificación de elección
Backend:

Node.js + Express 5: Framework robusto y maduro para APIs REST, con gran ecosistema y rendimiento.
TypeScript: Tipado estático para reducir errores en tiempo de desarrollo y mejorar mantenibilidad.
MongoDB + Mongoose: Base de datos NoSQL flexible para el modelo de documentos. Mongoose proporciona validaciones y esquemas.
JWT (jsonwebtoken): Estándar de la industria para autenticación stateless y segura.
Bcrypt: Algoritmo probado para hashing de contraseñas con salt automático.
Express-validator: Validación declarativa de requests con excelente integración con Express.
CORS: Configurado para permitir integración con frontend en diferentes dominios.
Justificación: Se eligió el stack MERN (sin React en este caso) por ser ampliamente conocido, tener excelente documentación, y permitir desarrollo rápido con TypeScript para mayor robustez.

# . Instalar MongoDB compass para visualizar los datos
https://www.mongodb.com/try/download/compass
StringConnection: mongodb+srv://root:uZBcJp9pmBntJTEI@cluster0.lpxcbjf.mongodb.net/?appName=Cluster0


# 1. Clonar el repositorio
git clone https://github.com/Nelson-Arenas/prueba-tecnica-emin-Nelson-Arenas.git
cd prueba-tecnica-emin-Nelson-Arenas

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# variables de entorno ".env"
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://root:uZBcJp9pmBntJTEI@cluster0.lpxcbjf.mongodb.net/?appName=Cluster0
JWT_SECRET=JWT_SECRET_KEY


# 4. Asegurarse de tener MongoDB corriendo
# Opción 1: MongoDB local en puerto 27017
# Opción 2: MongoDB Atlas (configurar URI en .env)

# 5. Ejecutar en modo desarrollo
npm run dev

# 6. Para producción
npm run build
npm start

# Puerto del servidor
PORT=3000


e) Link al deploy (netlify: Front) (render: Back)
https://nelson-eminadministrarequipos.netlify.app/
https://prueba-tecnica-emin-nelson-arenas.onrender.com/

f) Decisiones técnicas relevantes
Soft delete: Los activos no se borran, solo se marcan con deletedAt para conservar historial.
Validación doble: En rutas (express-validator) y en esquemas (Mongoose).
Relaciones pobladas: Uso de .populate() para traer datos completos de empresa y usuario.
Búsqueda flexible: Regex sin distinguir mayúsculas en varios campos.
Índices en MongoDB: code y serialNumber únicos para evitar duplicados y mejorar performance.
Lógica en pre-hooks: El estado cambia automáticamente a ASIGNADO al asignar usuario.
Paginación: Con skip/limit para grandes volúmenes.
Arquitectura MVC: Separación clara de responsabilidades.
Manejo de errores: Try-catch con mensajes descriptivos.
TypeScript estricto: Interfaces para todos los modelos.


g) Mejoras que harías con más tiempo
5. Refresh tokens - Para renovar JWT sin re-login
6. Tests unitarios y e2e - Jest + Supertest
7. Rate limiting - Protección contra fuerza bruta
8. Logging estructurado - Winston o Pino
9. Docker + docker-compose - Para desarrollo y producción
10. CI/CD - GitHub Actions para testing y deploy automático
11. Métricas y monitoring - Prometheus + Grafana
12. Documentación API - Swagger/OpenAPI
13. Versionado de API - /api/v1/
14. Exportación a Excel/CSV - Librería exceljs
15. Búsqueda avanzada - Elasticsearch para mejor rendimiento
16. Notificaciones - Email al asignar activos
17. Respaldos automáticos - Backup de MongoDB
18. i18n - Soporte multiidioma
19. Roles y permisos - Admin, user, viewer
20. Auditoría completa - Log de todos los cambios en activos
