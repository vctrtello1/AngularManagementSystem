# Management System

Tablero de administración con Angular 18, como ejercicio del curso (módulo *component
deep dive*): un encabezado y tres tarjetas —estado del servidor, tráfico de los últimos
siete días y tickets de soporte— con datos de ejemplo.

La explicación del código —qué hace cada archivo, cómo se conectan y qué se aprendió en
el camino— está en **[DOCUMENTACION.md](DOCUMENTACION.md)**.

## Correrlo

```bash
npm start                                             # servidor en http://localhost:4200
npm test                                              # tests en modo watch (abre Chrome)
npx ng test --watch=false --browsers=ChromeHeadless   # los tests una vez, sin ventana
npm run build                                         # compila a dist/management-system
```

## Estado

El reparto está **hecho**: el encabezado, las tres tarjetas —envueltas en una tarjeta
reutilizable que recibe el título y la imagen por `@Input`— y `AppComponent` repartiendo
los datos. **14 pruebas en 5 specs**, y el build compila a `dist/management-system`. El
detalle, en la sección 4 de la guía.
