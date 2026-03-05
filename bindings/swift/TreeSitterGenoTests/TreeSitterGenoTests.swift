import XCTest
import SwiftTreeSitter
import TreeSitterGeno

final class TreeSitterGenoTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_geno())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Geno grammar")
    }
}
