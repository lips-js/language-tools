// Every example of docs/reference.md in @lipsjs/lips (branch audit/surface-audit, 26177ce), in order.
// Component objects are prefixed with `export const example =`; nothing else is changed.

// The Lips instance · runs
import Lips from '@lipsjs/lips'

const lips = new Lips({ lang: 'en-US' })

// `register( name, template )` · `unregister( name )` · `has( name )` · runs
lips.register('user-card', { default: '<b>{input.name}</b>' })
lips.has('user-card')       // true
lips.unregister('user-card')

// `render( name, template, input? )` · `root( template, selector )` · `dispose()` · runs
const card = lips.render('card', { state: { n: 1 }, default: '<p>{state.n}</p>' }, { title: 'Hi' })
card.appendTo('#app')
card.state.n = 2
card.destroy()

lips.root({ default: '<main>app</main>' }, '#app')
lips.dispose()

// A component · renders "3 of 3 left" after clicking "button"
export const example = {
  state: { left: 5 },
  static: { total: 3 },
  handler: { take(){ this.state.left-- } },
  default: `<p>{state.left - 1} of {static.total} left</p><button on-click(take)>take</button>`
}

// Lifecycle · register "life-log"
export const example = {
  state: { log: [] },
  handler: {
    onCreate(){ this.static.log = [ 'create' ] },
    onInput(){ this.static.log.push('input') },
    onMount(){ this.static.log.push('mount') },
    onRender(){ this.static.log.length < 4 && this.static.log.push('render') },
    onAttach(){ this.static.log.push('attach'); this.state.log = [ ...this.static.log ] }
  },
  default: `<p>{state.log.join(',')}</p>`
}

// Lifecycle · renders "create,input,mount,render,attach"
export const example = { default: `<life-log a=1/>` }

// Lifecycle · renders "after"
export const example = {
  state: {},
  handler: { onError( e ){ this.static.failed = e } },
  default: `<if( state.user.name )><b>never</b></if><p>after</p>`
}

// Text and attributes · renders "Ada (admin)"
export const example = {
  state: { user: { name: 'Ada', admin: true }, extra: { 'data-id': 7 } },
  default: `<p class="user {state.user.admin ? 'admin' : ''}" ...state.extra>{state.user.name}{state.user.admin ? ' (admin)' : ''}</p>`
}

// `@text`, `@html`, `@ref`, `@format` · renders "focused"
export const example = {
  state: { msg: '' },
  handler: { onAttach(){ this.refs.field.focus(); this.state.msg = document.activeElement === this.refs.field ? 'focused' : 'no' } },
  default: `<input @ref="field"><span @text=state.msg></span>`
}

// Events · renders "opened 0, removed 1" after clicking ".x"
export const example = {
  state: { opened: 0, removed: 0 },
  default: `<div on-click(() => state.opened++)><button class="x" on-click.stop(() => state.removed++)>×</button>opened {state.opened}, removed {state.removed}</div>`
}

// `<if>` · `<else-if>` · `<else>` · renders "Getting there"
export const example = {
  state: { level: 50 },
  default: `<if( state.level < 34 )>Needs work</if><else-if( state.level < 67 )>Getting there</else-if><else>Shipping shape</else>`
}

// `<for>` · renders "1:a 2:b 3:c · 5 4 3"
export const example = {
  state: { rows: [ { id: 'x', label: 'a' }, { id: 'y', label: 'b' }, { id: 'z', label: 'c' } ] },
  default: `<p><for [row, i] in=state.rows by="id">{i + 1}:{row.label} </for>·<for [n] from=5 to=3> {n}</for></p>`
}

// `<switch>` · `<case>` · `<default>` · renders "read only"
export const example = {
  state: { role: 'guest' },
  default: `<switch( state.role )><case is="admin">admin</case><case is=[ 'viewer', 'guest' ]>read only</case><default>sign in</default></switch>`
}

// `<async>` · `<loading>` · `<then>` · `<catch>` · renders "Hello Ada"
export const example = {
  state: { user: Promise.resolve({ name: 'Ada' }) },
  default: `<async await( state.user )><loading>…</loading><then [u]>Hello {u.name}</then><catch [e]>{e.message}</catch></async>`
}

// `<let>` · `<const>` · renders "total 22"
export const example = {
  state: { price: 10, qty: 2 },
  default: `<let subtotal={ state.price * state.qty } tax={ subtotal / 10 }/><p>total {subtotal + tax}</p>`
}

// Dynamic tags and fragments · renders "<mark>"
export const example = {
  state: { tag: 'mark' },
  default: `<p><{state.tag}>&lt;{state.tag}&gt;</></p>`
}

// Slots · register "item-list"
export const example = { default: `<ul><for [row] in=input.items><li><{input.renderer} item=row/></li></for></ul>` }

// Slots · renders "Ada! Grace!"
export const example = {
  state: { people: [ 'Ada', 'Grace' ], mark: '!' },
  default: `<item-list [item] items=state.people><span>{item}{state.mark} </span></item-list>`
}

// The component bus · register "pick-one"
export const example = { handler: { pick(){ this.emit('picked', 2) } }, default: `<button on-click(pick)>pick</button>` }

// The component bus · renders "picked 2" after clicking "button"
export const example = {
  state: { got: 0 },
  default: `<pick-one on-picked( n => state.got = n )/><p>picked {state.got}</p>`
}

// Macros · renders "Pen*"
export const example = {
  macros: `<macro [label, active, pick] name="tool"><b on-click(pick)>{label}{active ? '*' : ''}</b></macro>`,
  handler: { choose(){} },
  default: `<tool label="Pen" active pick=self.choose/>`
}

// Context · runs
lips.setContext('theme', 'light')
const stop = lips.watchContext([ 'theme' ], () => {})
lips.useContext([ 'theme' ], ctx => ctx.theme )
stop()

// Context · renders "outer: light, inner: dark"
export const example = {
  default: `<p>outer: {context.theme}, <context theme="dark">inner: {context.theme}</context></p>`
}

// i18n · runs
lips.i18n.setDictionary('fr', {
  hello: 'Bonjour',
  items: '.input {$n :integer}\n.match $n\none {{{$n} article}}\n* {{{$n} articles}}'
})
lips.setLanguage('fr')
lips.useTranslator('*', lang => document.documentElement.lang = lang )

// i18n · renders "Bonjour Ada · 2 articles"
export const example = { default: `<p><span i18n="hello">Hello</span> Ada · <span @format="items, { n: 2 }"></span></p>` }

// Stylesheets · renders "styled"
export const example = {
  state: { size: 14 },
  stylesheet: `
    padding: .5rem;
    &.card { border: 1px solid }
    .title { font-size: {state.size}px }`,
  default: `<div class="card"><h2 class="title">styled</h2></div>`
}

// The router · renders "user 42" after clicking "button"
export const example = {
  static: { routes: [
    { path: '/', template: { default: '<p>home</p>' }, default: true },
    { path: '/users/:id', template: { default: '<p>user {input.params.id}</p>' } }
  ] },
  default: `<router routes=static.routes/><button on-click(() => context.navigate('/users/42'))>go</button>`
}

// Hot-swap · runs
const app = lips.render('editor', { state: { n: 1 }, default: '<p>{state.n}</p>' }).appendTo('#app')
const { changes } = app.swap( compileTemplate('<p class="big">{state.n}</p>').ir )

// Precompile and CSP · runs
const { template, diagnostics } = precompile({ default: '<p>{state.n}</p>', state: { n: 1 } }, { name: 'counter' })
new Lips({ mode: 'interpreted' }).render('counter', template ).appendTo('#app')

// Untrusted templates · runs
const embed = new Lips({ untrusted: untrusted({ ...untrustedPolicy, report(){} }) })
embed.render('embed', { state: { n: 1 }, default: '<p>{state.n}</p>' }).appendTo('#app')

// Lynx · from demos/lynx/src/main-thread.ts
const page = ( globalThis as any ).__CreatePage( '0', 0 )
connectMain( page )

// Lynx · from demos/lynx/src/background.ts
const { ir, diagnostics } = compileLynxTemplate( TEMPLATE )
diagnostics.length && console.warn( '[lips] template diagnostics', diagnostics )

const bg = connectBackground()
renderIR( ir, { state, handlers, stylesheet: JSON.parse( sheet ) }, { host: bg.host, mode: 'interpreted' }).mount( bg.root )

// Reactivity · runs
const store = reactive({ items: [] }, true )
const seen = []
const { dispose } = effect( () => seen.push( store.items.length ) )
batch( () => { store.items.push( 1 ); store.items.push( 2 ) })
dispose()
