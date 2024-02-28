---
runme:
  id: 01HKZFPQ79WRRDQ1AF0CRPJ106
  version: v2.2
---

# Advent of code

This is my first ever AOC

## [Nix](https://nixos.org)

Nix has made my life so much easier, I just don't have to worry about my environment I love it ❤️

Just a bit weird from time to time

Right now I'm also using [`direnv`](https://direnv.net) with [`flakes`](https://nixos.wiki/wiki/Flakes) which is still "experimental" 🙄

I still don't know why I don't use devenv. `¯\_(ツ)_/¯`

- https://zero-to-nix.com/concepts/dev-env

## [TypeScript](https://www.typescriptlang.org)

I know how to move my way around TypeScript

I am hoping I can use [`Effect`](https://www.effect.website)... or at least refactor my current code

### [Node](https://nodejs.org/en)

My current setup is [`corepack`](https://github.com/nodejs/corepack) with [`pnpm`](https://pnpm.io) as a package manager and [`tsx`](https://github.com/privatenumber/tsx) to execute scripts without generating JavaScript files

```bash {"id":"01HKZG35EKWQ568CYG5RF5TRBF"}
pnpm tsx hello.ts < data.txt
```

### [Bun](https://bun.sh)

I like Bun ❤️

```bash {"id":"01HKZFPQ79WRRDQ1AF00JCQTBA"}
bun run hello.ts < data.txt
```

## OCaml

I am also trying out OCaml.
Obviously with Nix.

Example

```ocaml {"id":"01HKZFPQ79WRRDQ1AF03MJXDKY"}
print_string "Hello, World!\n";;
```

```bash {"id":"01HKZFPQ79WRRDQ1AF04QRT2AP"}
ocaml < hello.ml
```

This was useful for my vscode setup

- https://github.com/ocamllabs/vscode-ocaml-platform/issues/984
- https://ryan.freumh.org/blog/ocaml-nix/

## Python

I also want to try Python but with nix

do i need poetry? https://www.youtube.com/watch?v=oqXWrkvZ59g

```bash {"id":"01HKZFPQ79WRRDQ1AF077DZCSZ"}
python hello.py < data.txt
```

## Go

I tried Go but removed it

```bash {"id":"01HKZFPQ79WRRDQ1AF0AS7P07E"}
go run Hello.go
```

## [Roc](https://www.roc-lang.org)

Roc rocks, but still can't get it through my thick skull

```bash {"id":"01HKZGB2JV71846MCFXF16WTET"}
roc run Hello.roc
```