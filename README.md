# Product Microservice

## Dev

1. Clonar el repositorio 
2. Instalar dependecias
3. Crear un archivo `.env` basado en el `env.template`
4. Ejecutar migracion de prisma `pnpm dlx migrate dev`
5. Ejecutar `pnpm start:dev`

## Inicializar la BD

asegurarse que las variables de ambiente esten configuradas
ejecutar `pnpm dlx prisma db pull`
despues `pnpm dlx prisma generate`