import { cwd } from 'node:process'
import { stat } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { cyan, green } from 'colorette'
import tinify from 'tinify'
import chokidar from 'chokidar'
import consola from 'consola'
import type { TinifyOption } from './type'

const getTinifyKey = (): string => {
  const key = process.env.TINIFY_KEY
  if (key)
    return key
  else throw new Error('TINIFY_KEY is not found')
}

const isImg = (path: string) => {
  const extensions = ['webp', 'jpeg', 'png']
  return extensions.includes(extname(path).slice(1))
}

const byteToM = (size: number) => (size / 1024 / 1024).toFixed(2)

const getFileSize = async (path: string) => {
  const { size } = await stat(path)
  return byteToM(size)
}

const compressImg = async (path: string, size: number) => {
  const key = getTinifyKey()
  tinify.key = key

  consola.info(cyan(path))

  await tinify.fromFile(path).toFile(path)
  const count = tinify.compressionCount
  const afterSize = await getFileSize(path)

  consola.info(cyan(`${byteToM(size)}M ------> ${afterSize}M     Remaining count:${count}`))
}

export const init = (options: TinifyOption) => {
  const { path, watch } = options

  consola.start(green('tinify-optimize start'))

  chokidar.watch(resolve(cwd(), path), {
    persistent: watch,
  })
    .on('add', (path, stats) => {
      if (isImg(path) && stats) {
        try {
          compressImg(path, stats.size)
        }
        catch (e) {
          consola.error(e)
        }
      }
    })
}
