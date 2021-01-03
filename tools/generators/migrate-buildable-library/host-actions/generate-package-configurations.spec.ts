import {
  addProjectConfiguration,
  ProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as path from 'path';

import { NgPackageJson } from '../configurations/ng-package-json';
import { PackageJson } from '../configurations/package-json';
import {
  AngularCompilerOptions,
  TsconfigJson,
} from '../configurations/tsconfig-json';
import { GeneratorOptions } from '../schema';
import { generatePackageConfigurations } from './generate-package-configurations';

describe(generatePackageConfigurations.name, () => {
  function readJsonFile<TJson = unknown>(filePath: string): TJson {
    return JSON.parse(host.read(filePath)?.toString() ?? '{}');
  }

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
      const filePath = path.join(project.root, 'ng-package.json');
      const expectedNgPackageJson: NgPackageJson = {
        $schema: '../../../node_modules/ng-packagr/ng-package.schema.json',
        dest: `../../../dist/${project.root}`,
        lib: {
          entryFile: 'src/index.ts',
        },
      };

      await generatePackageConfigurations(host, options);

      expect(host.exists(filePath)).toBe(true);
      const actualNgPackageJson: NgPackageJson = readJsonFile(filePath);
      expect(actualNgPackageJson).toEqual(expectedNgPackageJson);
    });

    it('generates package.json', async () => {
      const filePath = path.join(project.root, 'package.json');
      const expectedPackageJson: PackageJson = {
        name: '@nrwl-airlines/shared/ui-buttons',
        private: true,
      };

      await generatePackageConfigurations(host, options);

      expect(host.exists(filePath)).toBe(true);
      const actualPackageJson: PackageJson = readJsonFile(filePath);
      expect(actualPackageJson).toEqual(expectedPackageJson);
    });

    it('generates tsconfig.lib.prod.json', async () => {
      const filePath = path.join(project.root, 'tsconfig.lib.prod.json');
      const expectedTsconfig: TsconfigJson = {
        extends: './tsconfig.lib.json',
        compilerOptions: {
          declarationMap: false,
        },
        angularCompilerOptions: {
          enableIvy: true,
        },
      };

      await generatePackageConfigurations(host, options);

      expect(host.exists(filePath)).toBe(true);
      const actualTsconfig: TsconfigJson = readJsonFile(filePath);
      expect(actualTsconfig).toEqual(expectedTsconfig);
    });
  });

  describe('enableIvy option', () => {
    beforeEach(() => {
      filePath = path.join(project.root, 'tsconfig.lib.prod.json');
    });

    let filePath: string;

    it('sets the enableIvy option to true when true is passed', async () => {
      options = {
        ...options,
        enableIvy: true,
      };
      const expectedAngularCompilerOptions: AngularCompilerOptions = {
        enableIvy: true,
      };

      await generatePackageConfigurations(host, options);

      const actualTsconfig: TsconfigJson = readJsonFile(filePath);
      expect(actualTsconfig.angularCompilerOptions).toEqual(
        expectedAngularCompilerOptions
      );
    });

    it('omits the enableIvy option when false is passed', async () => {
      options = {
        ...options,
        enableIvy: false,
      };
      const expectedAngularCompilerOptions: AngularCompilerOptions = {};

      await generatePackageConfigurations(host, options);

      const actualTsconfig: TsconfigJson = readJsonFile(filePath);
      expect(actualTsconfig.angularCompilerOptions).toEqual(
        expectedAngularCompilerOptions
      );
    });
  });
});
