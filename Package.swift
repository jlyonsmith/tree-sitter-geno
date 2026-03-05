// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterGeno",
    products: [
        .library(name: "TreeSitterGeno", targets: ["TreeSitterGeno"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterGeno",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterGenoTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterGeno",
            ],
            path: "bindings/swift/TreeSitterGenoTests"
        )
    ],
    cLanguageStandard: .c11
)
