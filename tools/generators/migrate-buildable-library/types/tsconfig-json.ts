export function createTsconfig(
  {
    angularCompilerOptions,
  }: { angularCompilerOptions: AngularCompilerOptions } = {
    angularCompilerOptions: { enableIvy: true },
  }
): TsconfigJson {
  return {
    extends: './tsconfig.lib.json',
    compilerOptions: {
      declarationMap: false,
    },
    angularCompilerOptions,
  };
}

export interface AngularCompilerOptions {
  readonly enableIvy?: boolean;
}

export interface TsconfigJson {
  readonly extends: string;
  readonly compilerOptions: {
    readonly declarationMap: boolean;
  };
  readonly angularCompilerOptions: AngularCompilerOptions;
}
