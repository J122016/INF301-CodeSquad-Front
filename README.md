# INF301-CodeSquad-Front
Frontend final para caso "Sistema de Obtención de Horas Médicas y Control de Comisiones" para el ramo Lenguajes de programación en WWW (INF301). Desarrollado en base a maqueta disponible en: [github PGallagherC INF301](https://github.com/PGallagherC/INF301)

## Requerimientos

- Node 14+
- Docker, solo para generar el contenedor final
- [Backend del proyecto](https://github.com/J122016/INF301-CodeSquad-Back) para realizar/ejecutar la integración.

## Ejecución ambiente desarrollo

- **Local** (recomendado):
  - Dentro de `react-app` ejecutar:
  1. `npm install`
  2. luego `npm start`

- **Vía Docker**, evitando instalar node y módulos locales, pero (al desarrollar puede indicar problemas de importaciones no encontradas): 
  - En carpeta raíz ejecutar
  1. `docker-compose build`
  2. luego `docker-compose up`, nota: puede ser que indique este ejecutando en puerto 3000, favor omitir.

*En ambos casos estará disponible el servicio en http://localhost:3006/*

## Recordatorio en caso de instalar un módulo

Instalar con `npm install <nombre módulo>` en carpeta `react-app`, esto para que se guarde en `package.json`

## Estructura del proyecto y usos:

```
root
├── react-app
|   ├── node_modules 
|   ├── public
|   ├── src                 // ---ESPACIO DE TRABAJO PRINCIPAL ---
|   │   ├── common          //1. Carpeta con componentes generales compartidos (ej: header, menú lateral)
|   |   |   ├── *.tsx       //- Contenido componente
|   │   |   └── *.css       //- Hoja de estilo de componente
|   |   |
|   │   ├── contents        //2. Carpeta con contenidos estáticos auxiliares (imágenes, archivos ejemplo ...)
|   |   |
|   │   ├── vistaX          //3. Carpeta por c/vista (vista0 puede ser tomada como base), contiene:
|   |   |   ├── *.tsx       //- Contenido componente
|   │   |   └── *.css       //- Hoja de estilo de componente
|   |   |
|   │   ├── models          //4. Carpeta que contiene interfaces de c/modelo (a confirmar)
|   |   |
|   |   ├── app.tsx         //5. App inicial a renderizar con RUTEO, LAYOUT y definiciones generales.
|   |   ├── index.tsx       //DOM inicial a renderizar, llama a app.tsx 
|   │   └── *.*             //Otros
|   |
|   ├── package.json        //Librerias a instalar con npm install
|   ├── readme.md           //Readme uso react
|   ├── tsconfig.json       //Configuración de react
|   └── *.*                 //otros
|            
|── .gitignore
|── docker-compose.yml  //Para levantar servicio
|── readme.md           //Este archivo
└── dockerfile          //Para crear imagen
```

## Enlaces de utilidad

- [Documentación react](https://react.dev/)
- Documentación MUI: 
  - [Componentes](https://mui.com/material-ui/all-components/)
  - [Breakpoints responsivos](https://mui.com/system/getting-started/usage/#responsive-values)