# Lips language tools

Editor tooling for [Lips](https://github.com/fabrice8/lips) templates, as
RFC-009 plans it. A Lips template is a string, so the editor needs to be told
what is in it: this repository colours it now, and will check it later.

| Phase | Delivers | State |
|---|---|---|
| 1 | Highlighting: `.lips` files, and templates and stylesheets inside `.ts` / `.js` | **here** |
| 2 | Lips's diagnostics and type errors for `.lips` files; `lips-check` | planned |
| 3 | The same for components in `.ts` files | planned |
| 4 | Component inputs checked by tag | planned |
| 5 | Completion, hover, go-to-definition, rename | planned |

## Layout

```
packages/language-core/syntaxes/   the grammars (later also the generator of RFC-009 §4)
extensions/vscode/                 the VS Code extension: manifest, language configuration
tests/constructs/                  one assertion fixture per construct
tests/snapshots/                   scope snapshots of every template in Lips's demos and reference
scripts/mutate.mjs                 breaks one grammar rule at a time; the tests must notice
```

The extension ships a copy of the grammars (`npm run build` makes it), so the
grammars have one home that later packages can own.

## What is coloured where

| Grammar | Scope | Colours |
|---|---|---|
| `lips.tmLanguage.json` | `source.lips` | the template: HTML, `{…}` slots and every expression as TypeScript, and each construct Lips adds (below) |
| `lips-stylesheet.tmLanguage.json` | `source.css.lips` | a component stylesheet: CSS with nesting, top-level declarations, `//` comments, `{expr}` values with a unit |
| `lips-sfc.tmLanguage.json` | `source.lips.sfc` | a `.lips` file: TypeScript up to the first line that opens with markup, then the template |
| `lips-injection.tmLanguage.json` | `inline.lips` | templates and stylesheets inside TypeScript and JavaScript, at the markers below only |

Constructs: `<if( … )>` `<else-if( … )>` `<else>`, `<switch( … )>` `<case is=…>`
`<default>`, `<for [a, b] in=… from= to= by=>`, `<let>`, `<const>`,
`<async await( … )>` `<loading>` `<then [v]>` `<catch [e]>`, `<macro [args] name=…>`,
`<{expr}/>` and `<>…</>`, `<log( … )>`, `<i18n lang=…>`, `<context …>`,
`on-click( … )` with modifiers (`on-click.stop( … )`), `@text=` `@html=` `@ref=`
`@format="key, { params }"`, `...spread`, `i18n=` and `i18n-<attr>=`, quoted,
unquoted (`value=state.query`) and braced (`value={ a + b }`) values, `!bool`,
character references. Each rule names the parser path it mirrors
(`src/ir/parser.ts`, `src/ir/style.ts` and `src/ir/tags.ts` in Lips).

Markers (RFC-009 D2): the field is the marker, no tag and no import.

```ts
const counter = {
  default: `<p>{state.n}</p>`,               // template
  macros: `<macro name="pill">…</macro>`,    // template
  stylesheet: `.pill { color: {state.c} }`   // stylesheet
}

export default `…`                            // a module's template
export const macros = `…`                     // a module's macros (const alone in a .lips script)
export const stylesheet = `…`                 // a module's stylesheet
const built = /* lips */ `<b>{x}</b>`         // any other string Lips reads
```

### Limits

- A marker and its opening backtick share a line; `default:` on one line and
  the backtick on the next is not coloured.
- Only backtick strings are coloured. `{ default: '<b>…</b>' }` stays a string.
- `${…}` inside a template in a `.ts` file is read as text `$` and a Lips slot.
- Every rule in `source.lips` also ends at an unescaped backtick, so a
  template left open while typing stops at its string. The cost, in a `.lips`
  file only: a raw backtick inside a tag, a quoted value or a comment ends it.

## Develop

```bash
npm install
```

```bash
npm test
```

```bash
npm run mutate
```

`npm test` runs the construct fixtures (`vscode-tmgrammar-test`) and the
snapshots (`vscode-tmgrammar-snap`); after a deliberate change, update the
snapshots with `npm run snap:lips -- -u` and `npm run snap:ts -- -u` and read
the diff. `npm run mutate` applies each mutation in `scripts/mutate.mjs` and
fails if the tests survive one. To try the extension, open this folder in VS
Code and run **Lips extension** (F5).

The TypeScript grammar used by the tests comes from `tm-grammars`, pinned, so
a snapshot changes only when a grammar here does.

## License

MIT, see [LICENSE](LICENSE).
