import { copyFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const indexFile = path.join(distDir, 'index.html')

const routes = ['features', 'use-cases', 'pricing', 'contact']

if (!existsSync(indexFile)) {
  throw new Error(`Missing build output: ${indexFile}`)
}

await copyFile(indexFile, path.join(distDir, '404.html'))

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route)
    await mkdir(routeDir, { recursive: true })
    await copyFile(indexFile, path.join(routeDir, 'index.html'))
  }),
)

console.log(`Created static route fallbacks for: ${routes.map((route) => `/${route}`).join(', ')}`)
