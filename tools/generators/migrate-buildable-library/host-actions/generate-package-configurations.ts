import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  offsetFromRoot,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import { GeneratorOptions } from '../schema';
import { FileTemplateReplacements, TsconfigBaseJson } from '../types';
import { installNgPackagr } from './install-ng-packagr';

function getImportPathOrThrow(
  host: Tree,
  {
    project,
    projectRoot,
  }: { readonly project: string; readonly projectRoot: string }
): string {
  const tsconfigBaseJson = readJson<TsconfigBaseJson>(
    host,
    'tsconfig.base.json'
  );
  const pathMap = tsconfigBaseJson.compilerOptions.paths ?? {};
  const maybePathEntry = Object.entries(pathMap).find(([, publicApis]) =>
    publicApis.some((publicApi) => publicApi.startsWith(projectRoot))
  );

  if (!maybePathEntry) {
    throw new Error(`Import path is missing for project "${project}"`);
  }

  const [importPath] = maybePathEntry;

  return importPath;
}

export async function generatePackageConfigurations(
  host: Tree,
  options: GeneratorOptions
) {
  const projectConfiguration = readProjectConfiguration(host, options.project);
  const replacements: FileTemplateReplacements = {
    enableIvy: options.enableIvy,
    importPath: getImportPathOrThrow(host, {
      project: options.project,
      projectRoot: projectConfiguration.root,
    }),
    offsetFromRoot: offsetFromRoot(projectConfiguration.root),
    projectRoot: projectConfiguration.root,
    tmpl: '',
  };

  generateFiles(
    host,
    path.join(__dirname, '../files/package-configurations'),
    projectConfiguration.root,
    replacements
  );
  installNgPackagr(host);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return () => {
    installPackagesTask(host);
  };
}
