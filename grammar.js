/**
 * @file Geno universal structure language
 * @author John Lyon-Smith <john@escapegallery.net>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "geno",

  extras: ($) => [
    $.comment,
    /\s/, // whitespace
  ],

  word: ($) => $.identifier,

  rules: {
    schema: ($) => seq($.schema_attr_decl, repeat($._element)),

    _element: ($) => choice($.struct_decl, $.enum_decl, $.include),

    schema_attr_decl: ($) => seq("#![", $.attr_data_list, "]"),
    attr_decl: ($) => seq("#[", $.attr_data_list, "]"),
    attr_data_list: ($) =>
      seq(
        $.attr_data_entry,
        repeat(seq(",", $.attr_data_entry)),
        optional(","),
      ),
    attr_data_entry: ($) =>
      seq(
        $.identifier,
        optional(seq("=", choice($.string_literal, $.integer_literal))),
      ),

    include: ($) => seq(optional($.attr_decl), "include", $.string_literal),

    enum_decl: ($) =>
      seq(
        optional($.attr_decl),
        "enum",
        $.identifier,
        optional(seq(":", $.integer_type)),
        "{",
        $.enum_variant_list,
        "}",
      ),
    enum_variant_list: ($) =>
      seq($.enum_variant, repeat(seq(",", $.enum_variant)), optional(",")),
    enum_variant: ($) =>
      seq(optional($.attr_decl), $.identifier, "=", $.integer_literal),

    struct_decl: ($) =>
      seq("struct", $.identifier, "{", $.struct_field_list, "}"),
    struct_field_list: ($) =>
      seq($.struct_field, repeat(seq(",", $.struct_field)), optional(",")),
    struct_field: ($) =>
      seq(optional($.attr_decl), $.identifier, ":", $.field_type),

    field_type: ($) =>
      seq(
        choice($.array_type, $.map_type, $.builtin_type, $.identifier),
        optional("?"),
      ),
    array_type: ($) =>
      seq("[", $.field_type, optional(seq(";", $.integer_literal)), "]"),
    map_type: ($) => seq("{", $.builtin_type, ":", $.field_type, "}"),

    builtin_type: ($) =>
      choice($.integer_type, $.float_type, $.string_type, $.bool_type),
    string_type: (_) => "string",
    bool_type: (_) => "bool",
    integer_type: (_) =>
      choice("i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64"),
    float_type: (_) => choice("f32", "f64"),

    string_literal: (_) => /"([^"\\]|\\.)*"/,
    integer_literal: (_) => /-?\d+/,

    identifier: (_) => /[a-zA-Z][a-zA-Z0-9]*/,

    comment: (_) => /\/\/[^\r\n]*/,
  },
});
