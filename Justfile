list:
  just --list

build:
  # Generate the parser with ABI 14 (for Zed) and build the WASM module
  tree-sitter generate --abi 14
  tree-sitter build --wasm

parse:
  # Parse the example file without ranges for use in testing
  tree-sitter parse --no-ranges test/example.geno

test:
  # Run the test suite in the corpus directory
  tree-sitter test

play:
  # Open the playground in the browser
  tree-sitter playground
