export interface GeneratorOptions {
  /**
   * Enable incremental Angular Ivy compilation?
   */
  readonly enableIvy: boolean;
  /**
   * Angular library project name
   */
  readonly projectName: string;
  /**
   * Skip formatting files?
   */
  readonly skipFormat: boolean;
}
