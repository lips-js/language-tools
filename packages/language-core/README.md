# language-core

The editor-independent half of the Lips language tools (RFC-009 §7). Today
it holds the TextMate grammars in `syntaxes/`; phase 2 adds the generator
that turns a component into the TypeScript the checker reads, and this
folder becomes the `@lipsjs/language-core` package.

The VS Code extension copies `syntaxes/` at build time (`npm run build`), so
edit the grammars here, never in `extensions/vscode/syntaxes`.
