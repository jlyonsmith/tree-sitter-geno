list:
  just --list

build:
  tree-sitter generate --abi 14
  tree-sitter build --wasm

parse:
  tree-sitter parse --no-ranges test/example.geno

test:
  tree-sitter test

play:
  tree-sitter playground
