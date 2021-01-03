import { addProjectConfiguration, ProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as path from 'path';

import { GeneratorOptions } from '../schema';
import { generatePackageConfigurations } from './generate-package-configurations';

describe(generatePackageConfigurations.name, () => {
  beforeEach(() => {
    host = createTreeWithEmptyWorkspace();
    projectName = 'shared-ui-buttons';
    project = {
      projectType: 'library',
      root: 'libs/shared/ui-buttons',
      sourceRoot: 'libs/shared/ui-buttons/src',
      targets: {
        lint: {
          executor: '@nrwl/linter:eslint',
          options: {
            lintFilePatterns: [
              'libs/shared/ui-buttons/src/**/*.ts',
              'libs/shared/ui-buttons/src/**/*.html',
            ],
          },
        },
        test: {
          executor: '@nrwl/jest:jest',
          outputs: ['coverage/libs/shared/ui-buttons'],
          options: {
            jestConfig: 'libs/shared/ui-buttons/jest.config.js',
            passWithNoTests: true,
          },
        },
      },
    };
    options = {
      enableIvy: true,
      projectName,
      skipFormat: false,
    };

    addProjectConfiguration(host, projectName, project);
  });
  let host: Tree;
  let options: GeneratorOptions;
  let project: ProjectConfiguration;
  let projectName: string;

  describe('Package configurations', () => {
    it('generates ng-package.json', async () => {
      await generatePackageConfigurations(host, options);

      expect(host.exists(path.join(project.root, 'ng-package.json'))).toBe(
        true
      );
    });

    it('generates package.json', async () => {
      await generatePackageConfigurations(host, options);

      expect(host.exists(path.join(project.root, 'package.json'))).toBe(true);
    });

    it('generates tsconfig.lib.prod.json', async () => {
      await generatePackageConfigurations(host, options);

      expect(
        host.exists(path.join(project.root, 'tsconfig.lib.prod.json'))
      ).toBe(true);
    });
  });
});
