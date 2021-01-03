import {
  formatFiles,
  generateFiles,
  offsetFromRoot,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import { TsconfigBaseJson } from '../configurations/tsconfig-base-json';
import { GeneratorOptions } from '../schema';

interface FileTemplateReplacements {
  readonly enableIvy: boolean;
  readonly importPath: string;
  readonly offsetFromRoot: string;
  readonly projectRoot: string;
  readonly tmpl: '';
}

function getImportPathOrThrow(
  host: Tree,
  {
    projectName,
    projectRoot,
  }: { readonly projectName: string; readonly projectRoot: string }
): string {
  const tsconfigBaseFilePath = 'tsconfig.base.json';

  if (!host.exists(tsconfigBaseFilePath)) {
    throw new Error(`${tsconfigBaseFilePath} is missing`);
  }

  const tsconfigBaseJson = readJson<TsconfigBaseJson>(
    host,
    tsconfigBaseFilePath
  );
  const pathMap = tsconfigBaseJson.compilerOptions.paths ?? {};
  const maybePathEntry = Object.entries(pathMap).find(([, publicApis]) =>
    publicApis.some((publicApi) => publicApi.startsWith(projectRoot))
  );

  if (!maybePathEntry) {
    throw new Error(`Import path is missing for project "${projectName}"`);
  }

  const [importPath] = maybePathEntry;

  return importPath;
}

export async function generatePackageConfigurations(
  host: Tree,
  { enableIvy, projectName, skipFormat }: GeneratorOptions
) {
  const project = readProjectConfiguration(host, projectName);
  const replacements: FileTemplateReplacements = {
    enableIvy,
    importPath: getImportPathOrThrow(host, {
      projectName,
      projectRoot: project.root,
    }),
    offsetFromRoot: offsetFromRoot(project.root),
    projectRoot: project.root,
    tmpl: '',
  };

  generateFiles(
    host,
    path.join(__dirname, '../files/package-configurations'),
    project.root,
    replacements
  );

  if (!skipFormat) {
    await formatFiles(host);
  }
}
