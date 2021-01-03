import { Tree } from '@nrwl/devkit';

import { generatePackageConfigurations } from './host-actions/generate-package-configurations';
import { GeneratorOptions } from './schema';

export default async function (host: Tree, options: GeneratorOptions) {
  await generatePackageConfigurations(host, options);
}
