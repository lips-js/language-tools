/**
 * Mutation check for the grammars: break one rule at a time, run both
 * suites, and expect them to fail. A mutation the suites survive names a rule
 * no fixture holds. The sources in packages/language-core are never written:
 * each mutant goes to the extension's build copy, which `npm run build`
 * restores at the end.
 *
 *   npm run mutate
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const SRC = 'packages/language-core/syntaxes/'
const OUT = 'extensions/vscode/syntaxes/'

const T = 'lips.tmLanguage.json', SFC = 'lips-sfc.tmLanguage.json'
const CSS = 'lips-stylesheet.tmLanguage.json', INJ = 'lips-injection.tmLanguage.json'

const mutations = [
  [ T, 'head: <else-if( … )> takes no head', 'if|else-if|switch|log))\\\\(', 'if|switch|log))\\\\(' ],
  [ T, 'tag-name: <loading> is not a syntax tag', 'default|for|async|loading|then', 'default|for|async|then' ],
  [ T, 'tag-name: <svg> is a component', '|video|wbr|svg|', '|video|wbr|' ],
  [ T, 'event: modifiers are part of the event name', '"match": "(on-[^\\\\s=/>().`]+)', '"match": "(on-[^\\\\s=/>()`]+)' ],
  [ T, 'unquoted value: does not end at whitespace', '"end": "(?=[\\\\s>`]|/>)",\n      "contentName": "meta.embedded.expression.lips",\n      "patterns": [ { "include": "#expression" } ]\n    },\n\n    "attribute-boolean"', '"end": "(?=[>`]|/>)",\n      "contentName": "meta.embedded.expression.lips",\n      "patterns": [ { "include": "#expression" } ]\n    },\n\n    "attribute-boolean"' ],
  [ T, 'spread: ...expr is read as an attribute name', '        { "include": "#spread" },\n', '' ],
  [ T, 'entity: &#x…; is not a reference', '#\\\\d+|#[xX][0-9a-fA-F]+|', '#\\\\d+|' ],
  [ T, '@format: the params are a slot, not an object', '"include": "source.ts#object-member"', '"include": "#expression"' ],
  [ T, 'slot: no backtick guard', '"end": "\\\\}|(?=(?<!\\\\\\\\)`)",\n      "endCaptures": { "0": { "name": "punctuation.section.embedded.end.lips" } },\n      "patterns": [ { "include": "#expression" } ]\n    },\n\n    "entity"', '"end": "\\\\}",\n      "endCaptures": { "0": { "name": "punctuation.section.embedded.end.lips" } },\n      "patterns": [ { "include": "#expression" } ]\n    },\n\n    "entity"' ],
  [ T, 'comment: a slot inside a comment is read', '"endCaptures": { "0": { "name": "punctuation.definition.comment.end.lips" } }\n', '"endCaptures": { "0": { "name": "punctuation.definition.comment.end.lips" } },\n      "patterns": [ { "include": "#slot" } ]\n' ],
  [ SFC, 'sfc: the template must start at column 0', '"end": "(?=^\\\\s*<[A-Za-z{>!])"', '"end": "(?=^<[A-Za-z{>!])"' ],
  [ SFC, 'sfc: a file that opens with markup still has a script', '"begin": "\\\\A(?!\\\\s*<[A-Za-z{>!])"', '"begin": "\\\\A"' ],
  [ CSS, 'declaration: any "name:" is a declaration', '(?=(?:[^;{}`]|\\\\{(?=\\\\s*[^\\\\s}])[^{};?:`]*(?:\\\\?[^{};`]*)?\\\\})*(?:[;}`]|$))', '' ],
  [ CSS, 'interpolation: no unit after {expr}', '{ "name": "keyword.other.unit.css", "match": "(?<=\\\\})(?:%|[A-Za-z]+)" }', '{ "name": "keyword.other.unit.css", "match": "(?<=\\\\})%" }' ],
  [ CSS, 'line comment: // is not a comment', '        { "include": "#line-comment" },\n', '' ],
  [ INJ, 'injection: the stylesheet field is not a marker', '    { "include": "#field-stylesheet" },\n', '' ],
  [ INJ, 'injection: /* lips */ is not a marker', ',\n    { "include": "#comment-marked" }', '' ],
  [ INJ, 'injection: markers match inside comments and strings', 'L:source.ts -comment -string,', 'L:source.ts,' ],
  [ INJ, 'injection: an escaped backtick ends the template', '"end": "(?<!\\\\\\\\)`",\n      "endCaptures": { "0": { "name": "string.template.ts punctuation.definition.string.template.end.ts" } },\n      "contentName": "meta.embedded.block.lips",\n      "patterns": [ { "include": "source.lips" } ]\n    },\n    "field-stylesheet"', '"end": "`",\n      "endCaptures": { "0": { "name": "string.template.ts punctuation.definition.string.template.end.ts" } },\n      "contentName": "meta.embedded.block.lips",\n      "patterns": [ { "include": "source.lips" } ]\n    },\n    "field-stylesheet"' ]
]

const fails = cmd => { try { execSync( cmd, { stdio: 'ignore' } ); return false } catch { return true } }

execSync( 'npm run -s build' )
const rows = []
let survived = 0

for( const [ file, what, from, to ] of mutations ){
  const src = readFileSync( SRC + file, 'utf8' )
  const n = src.split( from ).length - 1
  if( n !== 1 ) throw new Error( `'${what}': expected one match in ${file}, found ${n}` )

  writeFileSync( OUT + file, src.replace( from, to ) )
  const constructs = fails('npm run -s test:constructs'), snapshots = fails('npm run -s test:snapshots')
  writeFileSync( OUT + file, src )

  constructs || snapshots || survived++
  rows.push( `| ${file} | ${what} | ${constructs ? 'caught' : '—'} | ${snapshots ? 'caught' : '—'} |` )
}

console.log( '| Grammar | Mutation | Construct fixtures | Snapshots |\n|---|---|---|---|\n' + rows.join('\n') )
console.log( `\n${mutations.length - survived} of ${mutations.length} mutations caught` )
process.exitCode = survived ? 1 : 0
