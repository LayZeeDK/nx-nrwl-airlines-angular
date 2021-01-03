import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import { GeneratorOptions } from '../schema';

interface FileTemplateReplacements {
  readonly enableIvy: boolean;
  readonly projectImportPath: string;
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
  const replacements: FileTemplateReplacements = {
    enableIvy,
    // projectImportPath: '@npmScope/domain/name',
    projectImportPath: '@nrwl-airlines/shared/ui-buttons',
    // projectRoot: 'libs/domain/name',
    // projectRoot: 'libs/shared/ui-buttons',
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
