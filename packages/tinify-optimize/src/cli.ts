import { cwd } from 'node:process'
import cac from 'cac'
import { version } from '../package.json'
import type { CliOptions } from './type'
import { init } from './index'

const cli = cac('tinify-optimize')

cli
  .option('-w, --watch', '[boolean] allow/disable watch', { default: false })

cli
  .command('[path]', 'start compress (default: /)')
  .action(async (path = cwd(), options: CliOptions) => {
    init({
      path,
      watch: options.watch,
    })
  })

cli.parse()
cli.version(version)
cli.help()
