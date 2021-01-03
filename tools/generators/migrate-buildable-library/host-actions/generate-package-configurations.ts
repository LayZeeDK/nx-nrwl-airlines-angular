import {
  formatFiles,
  generateFiles,
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
  readonly projectRoot: string;
  readonly tmpl: '';
  readonly workspaceRootRelativePath: string;
}

export async function generatePackageConfigurations(
  host: Tree,
  { enableIvy, projectName, skipFormat }: GeneratorOptions
) {
  const project = readProjectConfiguration(host, projectName);
  const projectRootLevelsDeepCount = project.root.match(/[/\\]/g).length + 1;
  const workspaceRootRelativePath = new Array(projectRootLevelsDeepCount)
    .fill('..')
    .join('/');
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
    publicApis.some((publicApi) => publicApi.startsWith(project.root))
  );

  if (!maybePathEntry) {
    throw new Error(`Import path is missing for project "${projectName}"`);
  }

  const [importPath] = maybePathEntry;
  const replacements: FileTemplateReplacements = {
    enableIvy,
    importPath,
    projectRoot: project.root,
    tmpl: '',
    workspaceRootRelativePath,
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
