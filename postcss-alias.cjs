const path = require("node:path")

// Resolve registry CSS imports before Tailwind's independent CSS resolver runs.
module.exports = function postcssAlias({ aliases = {} } = {}) {
  return {
    postcssPlugin: "postcss-alias",
    Once(root) {
      root.walkAtRules(/^(import|reference)$/, (rule) => {
        rule.params = rule.params.replace(
          /^(["'])([^"']+)\1/,
          (match, quote, id) => {
            for (const [alias, directory] of Object.entries(aliases)) {
              if (id.startsWith(`${alias}/`)) {
                const resolved = path.resolve(directory, id.slice(alias.length + 1))
                return `${quote}${resolved.split(path.sep).join("/")}${quote}`
              }
            }
            return match
          },
        )
      })
    },
  }
}

module.exports.postcss = true
