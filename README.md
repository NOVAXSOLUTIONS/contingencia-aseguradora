# Consulta de Cobertura - Aseguradora

Aplicación web para consultar la cobertura de seguros de ProAssisLife mediante cédula del asegurado.

## Características

- 🔍 Búsqueda de contratos por cédula
- 📊 Visualización detallada de información del contrato
- 👥 Listado de beneficiarios y sus coberturas
- 🎨 Interfaz moderna con soporte de tema claro/oscuro
- 📱 Diseño responsive
- 🚀 Serverless functions para evitar CORS

## Tecnologías

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Vercel Serverless Functions
- **API Externa**: ProAssisLife

## Estructura del Proyecto

```
contingencia-aseguradora/
├── api/                    # Serverless functions (proxy para la API externa)
│   ├── token.ts           # Obtención de token de autenticación
│   └── contract.ts        # Consulta de contratos
├── src/
│   ├── components/        # Componentes React
│   │   ├── SearchForm.tsx
│   │   ├── ContractResults.tsx
│   │   └── InsuranceQuery.tsx
│   ├── services/          # Servicios de API
│   │   └── insuranceApi.ts
│   ├── types/            # TypeScript types
│   │   └── insurance.ts
│   └── App.tsx
└── vercel.json           # Configuración de Vercel
```

## Desarrollo Local

1. **Instalar dependencias**:
```bash
npm install
```

2. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

3. **Build para producción**:
```bash
npm run build
```

## Despliegue en Vercel

El proyecto está configurado para desplegarse automáticamente en Vercel.

### Despliegue Automático desde Git

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. Cada push a la rama principal desplegará automáticamente

### Despliegue Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## Cómo Funciona

### Flujo de Datos

1. **Usuario ingresa cédula** → Frontend
2. **Frontend solicita token** → `/api/token` (Serverless Function)
3. **Serverless Function obtiene token** → API ProAssisLife
4. **Frontend consulta contrato** → `/api/contract?cedula=XXX` (Serverless Function)
5. **Serverless Function consulta** → API ProAssisLife
6. **Frontend muestra resultados** → Usuario

### Solución al Problema de CORS

La API externa de ProAssisLife no permite peticiones directas desde el navegador (CORS). La solución implementada usa **Vercel Serverless Functions** como proxy:

- En **desarrollo**: Vite proxy (`/api/proassis/*`)
- En **producción**: Vercel Serverless Functions (`/api/token`, `/api/contract`)

Las serverless functions hacen las peticiones desde el servidor (Node.js), evitando las restricciones CORS del navegador.

## Variables de Entorno

No se requieren variables de entorno. Las credenciales de la API están configuradas en las serverless functions.

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint

## Características de Seguridad

- Las credenciales de la API están en el servidor (serverless functions)
- No se exponen credenciales en el frontend
- Las peticiones a la API externa solo se hacen desde el servidor

## Soporte de Navegadores

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)

## Licencia

Privado
