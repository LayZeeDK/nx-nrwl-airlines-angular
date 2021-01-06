import { addProjectConfiguration, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as path from 'path';

import { GeneratorOptions } from '../schema';
import {
  AngularCompilerOptions,
  BuildableLibraryPackageJson,
  NgPackageJson,
  TsconfigBaseJson,
  TsconfigJson,
} from '../types';
import { generatePackageConfigurations } from './generate-package-configurations';

describe(generatePackageConfigurations.name, () => {
  beforeEach(() => {
    host = createTreeWithEmptyWorkspace();
    project = 'shared-ui-buttons';
    importPath = `@nrwl-airlines/shared/ui-buttons`;
    projectConfiguration = {
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
    const tsconfigBase: TsconfigBaseJson = {
      compilerOptions: {
        paths: {
          [importPath]: [`${projectConfiguration.root}/src/index.ts`],
        },
      },
    };
    options = {
      enableIvy: true,
      project,
      skipFormat: false,
    };

    host.write('tsconfig.base.json', JSON.stringify(tsconfigBase));
    addProjectConfiguration(host, project, projectConfiguration);
  });

  let host: Tree;
  let importPath: string;
  let options: GeneratorOptions;
  let projectConfiguration: ProjectConfiguration;
  let project: string;

  describe('Package configurations', () => {
    it('generates ng-package.json', async () => {
      const filePath = path.join(projectConfiguration.root, 'ng-package.json');
      const expectedNgPackageJson: NgPackageJson = {
        $schema: '../../../node_modules/ng-packagr/ng-package.schema.json',
        dest: `../../../dist/${projectConfiguration.root}`,
        lib: {
          entryFile: 'src/index.ts',
        },
      };

      await generatePackageConfigurations(host, options);

      expect(host.exists(filePath)).toBe(true);
      const actualNgPackageJson: NgPackageJson = readJson(host, filePath);
      expect(actualNgPackageJson).toEqual(expectedNgPackageJson);
    });

    it('generates package.json', async () => {
      const filePath = path.join(projectConfiguration.root, 'package.json');
      const expectedPackageJson: BuildableLibraryPackageJson = {
        name: importPath,
        private: true,
      };

      await generatePackageConfigurations(host, options);

      expect(host.exists(filePath)).toBe(true);
      const actualPackageJson: BuildableLibraryPackageJson = readJson(
        host,
        filePath
      );
      expect(actualPackageJson).toEqual(expectedPackageJson);
    });

    it('generates tsconfig.lib.prod.json', async () => {
      const filePath = path.join(
        projectConfiguration.root,
        'tsconfig.lib.prod.json'
      );
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
      const actualTsconfig: TsconfigJson = readJson(host, filePath);
      expect(actualTsconfig).toEqual(expectedTsconfig);
    });

    it('keeps package configurations when they all exist', async () => {
      const testConfiguration = { test: true };
      const ngPackageJsonPath = path.join(
        projectConfiguration.root,
        'ng-package.json'
      );
      const packageJsonPath = path.join(
        projectConfiguration.root,
        'package.json'
      );
      const productionTsconfigPath = path.join(
        projectConfiguration.root,
        'tsconfig.lib.prod.json'
      );
      host.write(ngPackageJsonPath, JSON.stringify(testConfiguration));
      host.write(packageJsonPath, JSON.stringify(testConfiguration));
      host.write(productionTsconfigPath, JSON.stringify(testConfiguration));

      await generatePackageConfigurations(host, options);

      const ngPackageJson = readJson(host, ngPackageJsonPath);
      const packageJson = readJson(host, packageJsonPath);
      const productionTsconfig = readJson(host, productionTsconfigPath);
      expect(ngPackageJson).toEqual(testConfiguration);
      expect(packageJson).toEqual(testConfiguration);
      expect(productionTsconfig).toEqual(testConfiguration);
    });

    it('overwrites package configurations when only some of them exist', async () => {
      const testConfiguration = { test: true };
      const ngPackageJsonPath = path.join(
        projectConfiguration.root,
        'ng-package.json'
      );
      const packageJsonPath = path.join(
        projectConfiguration.root,
        'package.json'
      );
      host.write(ngPackageJsonPath, JSON.stringify(testConfiguration));
      host.write(packageJsonPath, JSON.stringify(testConfiguration));

      await generatePackageConfigurations(host, options);

      const ngPackageJson = readJson(host, ngPackageJsonPath);
      const packageJson = readJson(host, packageJsonPath);
      expect(ngPackageJson).not.toEqual(testConfiguration);
      expect(packageJson).not.toEqual(testConfiguration);
    });
  });

  describe('enableIvy option', () => {
    beforeEach(() => {
      filePath = path.join(projectConfiguration.root, 'tsconfig.lib.prod.json');
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

      const actualTsconfig: TsconfigJson = readJson(host, filePath);
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

      const actualTsconfig: TsconfigJson = readJson(host, filePath);
      expect(actualTsconfig.angularCompilerOptions).toEqual(
        expectedAngularCompilerOptions
      );
    });
  });

  describe('Errors', () => {
    const tsconfigBaseFilePath = 'tsconfig.base.json';

    it('throws an error if tsconfig.base.json is missing', async () => {
      host.delete(tsconfigBaseFilePath);

      const act = () => generatePackageConfigurations(host, options);

      await expect(act).rejects.toThrowError(
        `Cannot find ${tsconfigBaseFilePath}`
      );
    });

    it('throws an error if import path is missing', async () => {
      const noPathMap: TsconfigBaseJson = {
        compilerOptions: {},
      };
      host.write(tsconfigBaseFilePath, JSON.stringify(noPathMap));

      const act = () => generatePackageConfigurations(host, options);

      await expect(act).rejects.toThrowError(
        `Import path is missing for project "${project}"`
      );
    });
  });
});
