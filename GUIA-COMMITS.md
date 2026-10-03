# Guía de mensajes de commit

Un mensaje de commit tiene una sola prueba: **¿se entiende qué pasó sin abrir el diff?**
Si hay que abrir el diff para saberlo, el mensaje no sirve.

## El formato

```
tipo(alcance): asunto en minúsculas, sin punto final

Por qué se hizo y qué cambia, en uno o dos párrafos. Lo que no entra
en el asunto va acá, separado por una línea en blanco.
```

El **alcance** es opcional y dice la parte del proyecto: `feat(tabla)`, `fix(api)`.

## Los tipos

| Tipo | Para qué |
| --- | --- |
| `feat` | Algo nuevo que el usuario puede ver o usar |
| `fix` | Arreglar algo que estaba mal |
| `docs` | Solo documentación (incluida esta guía) |
| `style` | Formato, espacios, comillas: nada de comportamiento |
| `refactor` | Reordenar el código sin cambiar lo que hace |
| `perf` | Hacerlo más rápido |
| `test` | Pruebas |
| `chore` | Mantenimiento: dependencias, configuración, limpieza |
| `build` / `ci` | Compilación y automatización |
| `revert` | Deshacer un commit anterior |

## Tus propios commits, reescritos

Los de la izquierda están en el historial; a la derecha, el mismo commit con el formato
puesto. Donde yo no puedo saber qué hiciste (por ejemplo `optimizacion`), la derecha
muestra **la forma** que debería tener.

| Como estaba ✗ | Como queda ✓ |
| --- | --- |
| `optimizacion` | `perf(front): quitar el re-render que trababa la tabla` |
| `cleanup code` | `chore: limpieza de restos del CLI y formato` |
| `emmiter` | `feat(user): emitir el usuario seleccionado al padre` |
| `pruebas unitarias` | `test(tasks): cubrir el alta y el borrado` |
| `Fix modal` | `fix(modal): el backdrop no cerraba con Escape` |
| `mostrar tasks` | `feat(tasks): mostrar la lista de tareas` |
| `documentcion` | `docs: documentacion del proyecto (md + pdf)` |
| `jasmine y primeflex` | `chore(deps): sumar Jasmine y PrimeFlex` |
| `first commit` | `chore: proyecto inicial de Angular` |
| `error en el codigo` | `fix(formulario): el submit fallaba sin los cuatro campos` |
| `submit data` | `feat(formulario): enviar los datos al componente padre` |
| `feaure header,investment-results y user-input components` | `feat: el encabezado, la tabla y el formulario` |

Lo que casi siempre falta en los flojos ✗: el **tipo** adelante ✗ (eso solo ya arregla
la mitad), **decir qué y no cómo** ✗ (`cleanup code` no dice nada ✗) y las **minúsculas
sin punto final** ✗.

## El hook que lo revisa

En este repo hay un hook en `.githooks/commit-msg` que rechaza un asunto que no siga el
formato, y explica qué falta. Se instala una vez por repo:

```bash
git config core.hooksPath .githooks
```

A partir de ahí, `git commit` avisa y no guarda el commit hasta que el asunto esté bien.
Cuando hace falta saltearlo (un merge, un apuro):

```bash
git commit --no-verify -m "lo que sea"
```

Si querés el mismo hook en otro repo, se copia la carpeta y se corre el mismo comando:

```bash
cp -r .githooks /ruta/al/otro/repo/
git -C /ruta/al/otro/repo config core.hooksPath .githooks
```

## Dos detalles que hacen la diferencia

- **El asunto, corto**: hasta 72 caracteres. Si no alcanza, el resto va en el cuerpo.
- **Un commit, una cosa**: si el mensaje necesita un "y" (`... y limpieza del codigo`),
  probablemente sean dos commits. Se nota al escribir el asunto ✗: si no sabés cómo
  resumirlo en una línea, es porque son dos cambios ✗.
