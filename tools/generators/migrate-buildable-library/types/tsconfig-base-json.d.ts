export interface TsconfigBaseJson {
  readonly compilerOptions: {
    readonly paths?: { readonly [importPath: string]: readonly string[] };
  };
}
