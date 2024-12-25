/**
 * @fileoverview Construct URL params with URLSearchParams not template literals
 * @author S Anand <root.node@gmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Construct URL params with URLSearchParams not template literals",
      recommended: false,
      url: "https://github.com/sanand0/eslint-plugin-no-url-params-template/blob/HEAD/docs/rules/no-url-params-template.md",
    },
    fixable: null,
    schema: [],
    messages: {
      "no-url-params-template": "URL constructed with template literal",
    },
  },

  create(context) {
    // Example matches:
    //    ?param1=${value1}
    //    ?param1=${value1}&param2=${value2}
    //    ?a=${abc}&b=${def}&c=${ghi}
    // Breakdown
    //   (?<!\s): Negative lookbehind: no whitespace character before the ?.
    //      URLs usually don't have a space before ? and lit templates use <option ?selected=...>
    //   \?: Matches the literal question mark ?.
    //   \w*=\$\{[^}]+\}: Matches the first `key=${value}`.
    //   (&\w*=\$\{[^}]+\})*: Matches zero or more `&key=${value}`
    const regex = /(?<!\s)\?\w*=\$\{[^}]+\}(&\w*=\$\{[^}]+\})*/;
    return {
      TemplateLiteral(node) {
        const text = context.sourceCode.getText(node);
        if (regex.test(text)) context.report({ node, messageId: "no-url-params-template" });
      },
    };
  },
};
