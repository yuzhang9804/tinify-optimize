import { cwd } from 'node:process'
import chokidar from 'chokidar'
import type { WatchOptions } from 'chokidar'
import type { CliOptions } from './type'

const extensions = ['webp', 'jpeg', 'png']

export const init = (options: CliOptions) => {
  console.log(options)

  // const payload: WatchOptions = {
  //   persistent: false,
  // }

  // chokidar.watch(cwd(), payload)
  //   .on('all', (event, path) => {
  //     console.log(event, path)
  //   })
}
