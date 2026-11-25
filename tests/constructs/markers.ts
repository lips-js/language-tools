// SYNTAX TEST "source.ts" "injection into TypeScript at the RFC-009 D2 markers only"
export const card = {
// <------ keyword.control.export.ts
  default: `<p on-click(go)>{state.n}</p>`,
//^^^^^^^ meta.object-literal.key.ts
//       ^ punctuation.separator.key-value.ts
//         ^ string.template.ts punctuation.definition.string.template.begin.ts
//           ^ meta.embedded.block.lips entity.name.tag.lips
//             ^^^^^^^^ meta.embedded.block.lips entity.other.attribute-name.event.lips
//                           ^^^^^ meta.embedded.block.lips meta.embedded.expression.lips
//                                       ^ string.template.ts punctuation.definition.string.template.end.ts
  macros: `<macro [label] name="pill"><b>{label}</b></macro>`,
//^^^^^^ meta.object-literal.key.ts
//          ^^^^^ meta.embedded.block.lips storage.type.lips
//                 ^^^^^ meta.embedded.block.lips variable.parameter.lips
  stylesheet: `.pill { color: {state.tone} }`,
//^^^^^^^^^^ meta.object-literal.key.ts
//             ^^^^^ meta.embedded.block.css.lips entity.other.attribute-name.class.css
//                     ^^^^^ meta.embedded.block.css.lips support.type.property-name.css
//                             ^^^^^ meta.embedded.block.css.lips meta.embedded.expression.lips
  title: `<b>{not.a.template}</b>`,
//^^^^^ - meta.embedded.block.lips
//        ^^^ string.template.ts - meta.embedded.block.lips
//           ^ string.template.ts - meta.embedded.expression.lips
  default : `<i>spaced</i>`
//^^^^^^^ meta.object-literal.key.ts
//            ^ meta.embedded.block.lips entity.name.tag.lips
}
export default `<div class="app">{state.ready}</div>`
// <------ keyword.control.export.ts
//     ^^^^^^^ keyword.control.default.ts
//             ^ string.template.ts punctuation.definition.string.template.begin.ts
//               ^^^ meta.embedded.block.lips entity.name.tag.lips
//                                                  ^ string.template.ts punctuation.definition.string.template.end.ts
export const macros = `<macro name="x"></macro>`
//     ^^^^^ storage.type.ts
//           ^^^^^^ variable.other.constant.ts
//                  ^ keyword.operator.assignment.ts
//                      ^^^^^ meta.embedded.block.lips storage.type.lips
export const stylesheet: string = `.b { margin: 0 }`
//           ^^^^^^^^^^ variable.other.constant.ts
//                       ^^^^^^ support.type.primitive.ts
//                                 ^^ meta.embedded.block.css.lips entity.other.attribute-name.class.css
const built = /* lips */ `<p>{x}</p>`
//            ^^ comment.block.ts
//               ^^^^ comment.block.ts storage.type.annotation.lips
//                       ^ string.template.ts punctuation.definition.string.template.begin.ts - comment.block.ts
//                         ^ meta.embedded.block.lips entity.name.tag.lips
const plain = `<p>{x}</p>`
//             ^^^ string.template.ts - meta.embedded.block.lips
// default: `<p>{x}</p>`
//           ^^^ comment.line.double-slash.ts - meta.embedded.block.lips
const s = 'default: `<p>`'
//                   ^^^ string.quoted.single.ts - meta.embedded.block.lips
lips.register('c', { default: '<b>{input.name}</b>' })
//                             ^^^ string.quoted.single.ts - meta.embedded.block.lips
const esc = { default: `<p title="\`x\`">\`code\`</p>` }
//                       ^ meta.embedded.block.lips entity.name.tag.lips
//                                ^^^^^ meta.embedded.block.lips string.quoted.double.lips
//                                                ^^ meta.embedded.block.lips
//                                                   ^ string.template.ts punctuation.definition.string.template.end.ts
const open = { default: `<div class="never closed
`, next: 1 }
// <- string.template.ts punctuation.definition.string.template.end.ts
// ^^^^ meta.object-literal.key.ts - meta.embedded.block.lips
const slot = { default: `<p>{ state.
//                            ^^^^^ meta.embedded.block.lips meta.embedded.expression.lips
`, after: 2 }
// <- string.template.ts punctuation.definition.string.template.end.ts
// ^^^^^ meta.object-literal.key.ts - meta.embedded.expression.lips
const after = 1
// <----- storage.type.ts - meta.embedded.block.lips
