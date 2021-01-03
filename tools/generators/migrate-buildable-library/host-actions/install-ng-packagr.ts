import { readJson, Tree } from '@nrwl/devkit';

import { RootPackageJson } from '../types';

export function installNgPackagr(host: Tree) {
  const packageJsonPath = 'package.json';
  const currentPackageJson: RootPackageJson = readJson(host, packageJsonPath);
  const isNgPackagrInstalled =
    currentPackageJson?.devDependencies['ng-packagr'] !== undefined;

  if (isNgPackagrInstalled) {
    return;
  }

  const modifiedPackageJson: RootPackageJson = {
    ...currentPackageJson,
    devDependencies: {
      ...currentPackageJson.devDependencies,
      'ng-packagr': '*',
    },
  };

  host.write(packageJsonPath, JSON.stringify(modifiedPackageJson, null, 2));
}
