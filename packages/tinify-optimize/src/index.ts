import { cwd } from 'node:process'
import { stat } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import chokidar from 'chokidar'
import consola from 'consola'
import { cyan, green } from 'colorette'
import tinify from 'tinify'
import type { TinifyOption } from './type'

type Tinify = typeof tinify

const getTinifyKey = (): string => {
  const key = process.env.TINIFY_KEY
  if (key)
    return key
  else throw 111
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

const compressImg = async (tinify: Tinify, path: string, size: number) => {
  await tinify.fromFile(path).toFile(path)
  const count = tinify.compressionCount
  const afterSize = await getFileSize(path)

  consola.info(cyan(path))
  consola.info(cyan(`${byteToM(size)}M ------> ${afterSize}M     Remaining count:${count}`))
}

export const init = (options: TinifyOption) => {
  const { path, watch } = options

  consola.start(green('tinify-optimize start'))

  const key = getTinifyKey()
  tinify.key = key

  chokidar.watch(resolve(cwd(), path), {
    persistent: watch,
  })
    .on('add', (path, stats) => {
      if (isImg(path) && stats)
        compressImg(tinify, path, stats.size)
    })
}
