export interface CliOptions {
  /**
   * {default: false}
   */
  watch: boolean
}

export interface TinifyOption extends CliOptions {
  path: string
}
