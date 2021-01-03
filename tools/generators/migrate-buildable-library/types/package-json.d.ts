export interface BuildableLibraryPackageJson {
  readonly name: string;
  readonly private: boolean;
}

export interface RootPackageJson {
  readonly devDependencies?: {
    readonly [packageName: string]: string;
  };
}
