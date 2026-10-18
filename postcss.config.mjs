import path from "node:path"

const config = {
  plugins: {
    [path.resolve(process.cwd(), "postcss-alias.cjs")]: {
      aliases: { "@": process.cwd() },
    },
    "@tailwindcss/postcss": {},
  },
}

export default config
