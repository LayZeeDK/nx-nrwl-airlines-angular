export interface NgPackageJson {
  readonly $schema: string;
  readonly dest: string;
  readonly lib: {
    readonly entryFile: string;
  };
}
