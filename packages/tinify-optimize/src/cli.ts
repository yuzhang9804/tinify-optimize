import cac from 'cac'
import { version } from '../package.json'
import type { CliOptions } from './type'
import { init } from './index'

const cli = cac('tinify-optimize')

cli
  .option('-p, --path <path>', '[string] use specified path')
  .option('-w, --watch', '[boolean] allow/disable watch', { default: false })

cli
  .command('[root]', 'start dev server')
  .action(async (root: string, options: CliOptions) => {
    console.log(root)
    console.log(options)
  })

cli.parse()
cli.version(version)
cli.help()
