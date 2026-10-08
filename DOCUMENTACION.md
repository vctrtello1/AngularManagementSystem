# Management System, explicado

Este es el proyecto del módulo **component deep dive** del curso: un tablero de
administración con un encabezado y tres tarjetas (estado del servidor, tráfico de los
últimos siete días y tickets de soporte) que hoy muestran **datos de ejemplo**, sin
backend.

Esta guía cuenta qué hay en cada archivo, cómo se conectan las piezas y qué se aprendió
en el camino. Si es la primera vez que abrís el proyecto, leé las secciones en orden: van
de menos a más.

## Índice

1. [Qué es esta app](#1-qué-es-esta-app)
2. [De qué tipo de proyecto es](#2-de-qué-tipo-de-proyecto-es)
3. [En qué orden leer el código](#3-en-qué-orden-leer-el-código)
4. [El estado: el reparto está hecho](#4-el-estado-el-reparto-está-hecho)
5. [Los conceptos que aparecen](#5-los-conceptos-que-aparecen)
6. [Las trampas que ya pisamos](#6-las-trampas-que-ya-pisamos)
7. [Los tests](#7-los-tests)
8. [Cómo correrlo](#8-cómo-correrlo)

---

## 1. Qué es esta app

Una pantalla, sin rutas ni formularios:

- Un **encabezado** con el logo, tres enlaces y un botón de salir.
- Tres **tarjetas** en un tablero:
  - **Server Status**: dice si los servidores están online, offline o en un estado
    desconocido.
  - **Traffic**: una gráfica de barras con el tráfico de los últimos siete días.
  - **Support Tickets**: la lista de tickets de soporte.

Todo lo que se ve son **datos de ejemplo** escritos en el código, cada uno en su
componente (`dummyTrafficData` en la gráfica, `currentStatus` en el estado), así que la
app no pide nada por red.

---

## 2. De qué tipo de proyecto es

| Detalle | Valor |
| --- | --- |
| Angular | 18 |
| Nombre | `management-system` (el paquete, el proyecto de `angular.json` y la carpeta) |
| Tipo | **Standalone**: cada componente declara lo que necesita en su `imports`; **no hay `NgModule`** |
| Arranque | `bootstrapApplication(AppComponent)` (`main.ts:5`), sin módulo raíz |
| TypeScript | 5.4.5, con `strict` y plantillas estrictas (`strictTemplates`) |
| Estilos | Uno solo, global: `src/styles.css` (223 líneas). Ningún componente tiene CSS propio |
| Assets | Todo lo que está en `public/` se sirve desde la raíz, por eso el logo se pide como `logo.png` y no como `assets/...` |
| Salida del build | `dist/management-system` |
| Tests | **14 pruebas en 5 specs**, con Jasmine y Karma: el encabezado (3), la tarjeta (2), el estado del servidor (4), la gráfica (3) y los tickets (2) |

---

## 3. En qué orden leer el código

| # | Archivo | Por qué |
| --- | --- | --- |
| 0 | [`index.html`](src/index.html) | El HTML que envuelve todo: el `<app-root>` (`:11`) donde arranca la app |
| 1 | [`main.ts`](src/main.ts) | Arranca Angular con el componente raíz (5 líneas) |
| 2 | [`app.component.ts`](src/app/app.component.ts) | El componente raíz. Dice qué usa (`:10`), dónde está su plantilla (`:18`) y los tres items que reparte (`:23`) |
| 3 | [`app.component.html`](src/app/app.component.html) | La pantalla: el encabezado (`:1`) y las tres tarjetas, cada una con su item (`:6`, `:10`, `:14`) |
| 4 | [`dashboard/dashboard-item/…component.html`](src/app/dashboard/dashboard-item/dashboard-item.component.html) | La tarjeta reutilizable: la imagen y el título que recibe (`:4`, `:5`) y el `<ng-content />` (`:8`) donde entra lo que envuelve |
| 5 | [`header/…component.html`](src/app/header/header.component.html) | El encabezado en su componente: el logo (`:2`), la navegación (`:6`) y el botón de salir |
| 6 | [`dashboard/traffic/…component.html`](src/app/dashboard/traffic/traffic.component.html) | La gráfica: el `@for` que arma una barra por día (`:5`) y el `[style.height]` que las dimensiona (`:6`) |
| 7 | [`dashboard/server-status/…component.html`](src/app/dashboard/server-status/server-status.component.html) | El estado del servidor: los tres casos con `@if` / `@else if` / `@else` (`:2`, `:5`, `:8`) |
| 8 | [`styles.css`](src/styles.css) | Los estilos que dan forma a todo (`#dashboard` en `:74`, `#chart` en `:100`) |

---

## 4. El estado: el reparto está hecho

El ejercicio era repartir el tablero, y ya está. Además, las tres tarjetas se dibujan con
una **tarjeta reutilizable** ✓ que recibe el título y la imagen por `@Input` ✓:

| Pieza | Estado |
| --- | --- |
| `DashboardItemComponent` | **Hecho** ✓: la tarjeta que envuelve a las otras tres. Recibe `title` e `image` (`dashboard-item.component.ts:9`) y dibuja lo que le pasen con `<ng-content />` (`dashboard-item.component.html:8`) |
| `HeaderComponent` | **Hecho** ✓: el marcado del encabezado vive en su plantilla (`header.component.html:1`) |
| `ServerStatusComponent` | **Hecho** ✓: su marcado (`server-status.component.html:2`) y su dato, `currentStatus` (`server-status.component.ts:9`) |
| `TrafficComponent` | **Hecho** ✓: la gráfica (`traffic.component.html:5`) y los datos, `dummyTrafficData` y `maxTraffic` (`traffic.component.ts:9`) |
| `TicketsComponent` | **Hecho** ✓: su marcado (`tickets.component.html:1`) |
| `AppComponent` | **El que reparte** ✓: tiene los tres items, con el título y la imagen de cada tarjeta (`app.component.ts:23`), y se los pasa por `@Input` en su plantilla (`app.component.html:6`) |

Ese es **el patrón de la clase** ✓: el padre es dueño de lo que la tarjeta necesita ✓ y el
hijo lo recibe ✓. Lo único que cada hijo guarda es su propio contenido: la gráfica sus
datos ✓, el estado su `currentStatus` ✓.

Lo que **falta** ya no es código ✗: el reparto está completo ✓. Lo que venga después es lo
que traiga la próxima clase ✓.

---

## 5. Los conceptos que aparecen

| Concepto | Dónde | Qué es |
| --- | --- | --- |
| Componente standalone | `app.component.ts:17`, `header.component.ts:5` | Un componente que declara sus propias dependencias y no necesita un `NgModule`. |
| `selector` | `app.component.ts:9`, `header.component.ts:4` | El nombre de la etiqueta con la que se usa el componente en otra plantilla (`<app-root>`, `<app-header>`). |
| `imports` de un componente | `app.component.ts:10` | Lo que ese componente puede usar en su plantilla: otros componentes, directivas, pipes. |
| `templateUrl` | `app.component.ts:18`, `traffic.component.ts:6` | El archivo con el HTML del componente. |
| `bootstrapApplication` | `main.ts:5` | Arranca la app a partir del componente raíz. Es todo el arranque. |
| `@Input` | `dashboard-item.component.ts:9`, `app.component.html:6` | Un dato que **baja** del padre al hijo. La tarjeta recibe así su título y su imagen. |
| `<ng-content />` | `dashboard-item.component.html:8` | El hueco donde el componente dibuja lo que le pusieron entre las etiquetas. Es lo que le permite a la tarjeta envolver a las otras tres. |
| `@if` / `@else if` / `@else` | `server-status.component.html:2`, `:5`, `:8` | El bloque de decisión de la plantilla: muestra una cosa u otra. |
| `@for` + `track` | `traffic.component.html:5` | Repite un bloque por cada elemento de una lista. El `track` le dice a Angular cómo identificar cada uno. |
| Binding de estilo | `traffic.component.html:6` | `[style.height]="..."`: calcula la altura de cada barra de la gráfica. |
| Interpolación | `dashboard-item.component.html:5` | `{{ title }}`: mete un valor del componente en el HTML. |

---

## 6. Las trampas que ya pisamos

**1. Un componente que se dibuja a sí mismo** ✗

`header.component.html` arrancaba con:

```html
<app-header></app-header>
```

Es una línea que se copia sin querer de `app.component.html` ✗: el componente se
instanciaba a sí mismo, y así hasta que la pila explotaba ✗. El síntoma no dice nada del
código:

```
HeaderComponent should create FAILED
	RangeError: Maximum call stack size exceeded
```

Si ves `Maximum call stack size exceeded` en un test que solo hace `should create` ✓,
buscá un componente que se renderiza a sí mismo ✓ (o un ciclo de dos componentes que se
llaman entre ellos ✗).

**2. Un import que apunta a una carpeta que no existe** ✗

`app.component.ts` importaba `./components/app-header/app-header.component` ✗. El
síntoma:

```
TS2307: Cannot find module './components/app-header/app-header.component'
TS-991010: 'imports' must be an array of components, directives, pipes, or NgModules.
```

El segundo error es una **consecuencia** del primero ✗: como no encuentra el archivo ✗,
la clase no existe ✗, y entonces `imports` parece tener basura ✗. Cuando veas dos errores
así ✗, arreglá el primero ✗ y el segundo se va solo ✓.

**3. `Cannot find name 'describe'` (y `'beforeEach'`, `'it'`, `'expect'`)** ✗

Con **TypeScript 6**, el `tsconfig.json` de la raíz compilaba **todo** el proyecto, specs
incluidos ✗, y el 6 ya no incluye los `@types` solo ✗: Jasmine no existía para él ✗. La
solución fue convertir ese archivo en una **lista de proyectos** ✗→✓:

```json
"files": [],
"references": [
  { "path": "./tsconfig.app.json" },
  { "path": "./tsconfig.spec.json" }
]
```

Así la raíz deja de compilar ✗ y cada archivo lo revisa el proyecto que le toca ✓: los
tests, `tsconfig.spec.json`, que declara `types: ["jasmine"]` (`tsconfig.spec.json:6`) ✓.

Ojo: ese error **no** se arregla instalando `@types/jest` ✗, aunque el propio mensaje de
TypeScript lo sugiera ✗. Jasmine ya viene instalado con el proyecto ✓.

**4. Una etiqueta mal cerrada** ✗

En `app.component.html` una tarjeta quedó como `<app-tickets>/>` ✗: la barra del cierre
automático fue **después** del `>`, así que la etiqueta quedó abierta ✗ y el cierre de más
abajo quedó huérfano ✗. El mensaje que sale no señala la línea ✗:

```
NG5002: Unexpected closing tag "app-dashboard-item".
```

Es de los que engañan ✗: nombra **otra** etiqueta ✗ (el `</app-dashboard-item>` que sobra ✗),
no la que está mal ✗. Cuando lo veas ✗, contá aperturas y cierres ✗ en vez de buscar la que
dice el mensaje ✓.

**Y la lección que ya nos mordió dos veces** ✗: los tests **no** compilan la plantilla del
componente raíz ✗ (ningún spec lo importa ✗). Los 14 pasaban ✓ mientras el build estaba roto ✗.
Ante la duda de si el proyecto está sano ✓, **construilo** ✓ (sección 8) ✓.

---

## 7. Los tests

Catorce pruebas en cinco specs. Ninguna es el `should create` solo:

| Spec | Qué comprueba |
| --- | --- |
| `dashboard/dashboard-item/dashboard-item.component.spec.ts` | Que se cree y que dibuje el título y la imagen que recibe |
| `header.component.spec.ts` | Que se cree (el que cazó la recursión, sección 6), el logo y los dos enlaces con el botón de salir |
| `dashboard/server-status/server-status.component.spec.ts` | Los **tres** casos: online, offline y cualquier otro. Cada uno comprueba el mensaje que va **y** el que no |
| `dashboard/traffic/traffic.component.spec.ts` | Una barra por día, que todas tengan alto en porcentaje y que la del día más alto sea el 100% |
| `dashboard/tickets/tickets.component.spec.ts` | El lugar donde después va la lista (el título lo pone la tarjeta) |

Dos ideas que conviene copiar al escribir pruebas acá ✗:

- **Comprobar lo que no va** ✓: la del estado verifica que el mensaje de "online" **no**
  aparezca cuando está offline ✗. Sin eso, un `@if` mal escrito pasaría ✓.
- **No repetir los datos** ✓: la de la gráfica dice `component.dummyTrafficData.length` ✗ en
  vez de `7` ✓. Si mañana agregás un día ✗, la prueba sigue valiendo ✓.

Las herramientas ya están todas ✓: `jasmine-core` ✓, `@types/jasmine` ✓, `karma` ✓,
`karma-jasmine` ✓ y `karma-chrome-launcher` ✓. No hay `karma.conf.js` ✗: Angular 18 arma
la configuración desde `angular.json` (`:77`, el builder `@angular-devkit/build-angular:karma`) ✓.

---

## 8. Cómo correrlo

```bash
npm start                                             # servidor en http://localhost:4200
npm test                                              # tests en modo watch (abre Chrome)
npx ng test --watch=false --browsers=ChromeHeadless   # los tests una vez, sin ventana
npm run build                                         # compila a dist/management-system
```

Los tres comandos que se usan todo el tiempo mientras se trabaja:

- **`npm start`**: la app con recarga automática. Si algo no se ve ✓, casi siempre el
  problema está en la consola del navegador ✓, no en el código ✗.
- **El test headless**: la forma rápida de saber si rompiste algo ✓ sin abrir Chrome ✓.
- **`npm run build`**: lo que de verdad prueba que el proyecto está sano ✓. Los tests
  **no** compilan el componente raíz ✗ (ningún spec lo importa ✗), así que un error ahí
  solo lo ve el build ✗ — pasó con el import roto ✗ y con la etiqueta mal cerrada ✗
  (sección 6) ✓.
