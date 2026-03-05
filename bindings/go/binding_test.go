package tree_sitter_geno_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_geno "github.com/tree-sitter/tree-sitter-geno/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_geno.Language())
	if language == nil {
		t.Errorf("Error loading Geno grammar")
	}
}
