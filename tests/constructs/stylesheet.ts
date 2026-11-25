// SYNTAX TEST "source.ts" "stylesheet: CSS with nesting, top-level declarations, {expr} values (style.ts scan, readValue, readInterpolation)"
export const stylesheet = `
//                        ^ string.template.ts punctuation.definition.string.template.begin.ts
  padding: .5rem;
//^^^^^^^ meta.embedded.block.css.lips support.type.property-name.css
//       ^ punctuation.separator.key-value.css
//         ^^ constant.numeric.css
//           ^^^ keyword.other.unit.css
//              ^ punctuation.terminator.rule.css
  --gap: {state.gap}rem;
//^^^^^ variable.css
//       ^ meta.embedded.expression.lips punctuation.section.embedded.begin.lips
//        ^^^^^ meta.embedded.expression.lips variable.other.object.ts
//                 ^ punctuation.section.embedded.end.lips
//                  ^^^ keyword.other.unit.css - meta.embedded.expression.lips
  // a Stylis comment: {not.an.expression}
//^^ comment.line.double-slash.lips
//                     ^^^^ comment.line.double-slash.lips - meta.embedded.expression.lips
  /* a comment with {braces} and \`ticks\` */
//^^ comment.block.css
//                  ^^^^^^^^ comment.block.css - meta.embedded.expression.lips
//                                         ^^ comment.block.css
  &.card { border: 1px solid #ccc }
//^ entity.name.tag.nesting.css
// ^^^^^ entity.other.attribute-name.class.css
//       ^ punctuation.section.property-list.begin.bracket.curly.css
//         ^^^^^^ support.type.property-name.css
//                 ^ constant.numeric.css
//                     ^^^^^ support.constant.property-value.css
//                           ^^^^ constant.other.color.rgb-value.hex.css
//                                ^ punctuation.section.property-list.end.bracket.curly.css
  .title:hover, a > b { font-size: {state.size}px; color: {state.on ? 'red' : 'blue'} }
//^^^^^^ entity.other.attribute-name.class.css
//      ^^^^^^ entity.other.attribute-name.pseudo-class.css - support.type.property-name.css
//            ^ punctuation.separator.list.comma.css
//              ^ entity.name.tag.css
//                ^ keyword.operator.combinator.css
//                      ^^^^^^^^^ meta.property-list.css support.type.property-name.css
//                                  ^^^^^ meta.embedded.expression.lips
//                                             ^^ keyword.other.unit.css
//                                                 ^^^^^ support.type.property-name.css
//                                                                  ^ meta.embedded.expression.lips keyword.operator.ternary.ts
//                                                                            ^^^^^^ meta.embedded.expression.lips string.quoted.single.ts
//                                                                                  ^ meta.embedded.expression.lips punctuation.section.embedded.end.lips
  a:hover { }
//^ entity.name.tag.css - support.type.property-name.css
// ^^^^^^ entity.other.attribute-name.pseudo-class.css
//        ^ punctuation.section.property-list.begin.bracket.curly.css
  li:nth-child(2) { color: var(--x, red) !important }
//^^ entity.name.tag.css
//  ^^^^^^^^^^ entity.other.attribute-name.pseudo-class.css
//                         ^^^ support.function.css
//                             ^^^ variable.argument.css
//                                  ^^^ support.constant.property-value.css
//                                       ^^^^^^^^^^ keyword.other.important.css
  input[type="range"] { width: 100% }
//^^^^^ entity.name.tag.css
//      ^^^^ meta.attribute-selector.css entity.other.attribute-name.css
//           ^^^^^^^ string.quoted.double.css
//                             ^^^ constant.numeric.css
//                                ^ keyword.other.unit.css
  .row {
//^^^^ entity.other.attribute-name.class.css
    gap: .4rem;
//  ^^^ meta.property-list.css support.type.property-name.css
    &:hover .icon { opacity: {state.dim ? .5 : 1} }
//  ^ entity.name.tag.nesting.css
//          ^^^^^ meta.property-list.css entity.other.attribute-name.class.css - meta.property-list.declaration.css
//                  ^^^^^^^ support.type.property-name.css
//                                        ^^ meta.embedded.expression.lips constant.numeric.decimal.ts
  }
//^ punctuation.section.property-list.end.bracket.curly.css
  @media (max-width: 600px) and (prefers-color-scheme: dark) {
//^^^^^^ keyword.control.at-rule.css
//        ^^^^^^^^^ support.type.property-name.media.css
//                   ^^^ constant.numeric.css
//                          ^^^ keyword.operator.logical.css
//                                                     ^^^^ support.constant.property-value.css
//                                                           ^ punctuation.section.property-list.begin.bracket.curly.css
    .title { font-size: 12px }
//  ^^^^^^ meta.property-list.css entity.other.attribute-name.class.css
  }
  @keyframes pulse {
//^^^^^^^^^^ keyword.control.at-rule.css
//           ^^^^^ variable.parameter.keyframe-list.css
    from { opacity: 0 }
//  ^^^^ entity.other.keyframe-offset.css
    50% { opacity: .5 }
//  ^^^ entity.other.keyframe-offset.percentage.css
  }
  --api: https://x.dev/v1;
//^^^^^ variable.css
//             ^^^ meta.property-value.css - comment
`
// <- string.template.ts punctuation.definition.string.template.end.ts
const after = { stylesheet: `.a { color: {state.c
//                           ^^ meta.embedded.block.css.lips entity.other.attribute-name.class.css
`, next: 1 }
// <- string.template.ts punctuation.definition.string.template.end.ts
// ^^^^ meta.object-literal.key.ts - meta.embedded.block.css.lips
