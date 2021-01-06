import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';

import { generatePackageConfigurations } from './host-actions/generate-package-configurations';
import { installNgPackagr } from './host-actions/install-ng-packagr';
import { GeneratorOptions } from './schema';

export default async function (host: Tree, options: GeneratorOptions) {
  await generatePackageConfigurations(host, options);
  installNgPackagr(host);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return () => {
    installPackagesTask(host);
  };
}
