import fs from 'fs';
import chalk from 'chalk';
import glob from 'fast-glob';

/** Updates references in all package/../tsconfig.json files */
async function updateTsReferences() {
  const packages = await glob('./packages/*', { absolute: true, onlyDirectories: true });

  packages.forEach((packagePath) => {
    try {
      console.log(chalk.green(`Updating refs for ${packagePath}`));
      const packageJsonFile = fs.readFileSync(`${packagePath}/package.json`, 'utf-8');
      const packageJson = JSON.parse(packageJsonFile);
      const { dependencies = {} } = packageJson;
      const visXDependencies = Object.keys(dependencies).filter((key) => key.startsWith('@visx/'));

      const visXReferences = visXDependencies.map((dep) => ({
        path: `../visx-${dep.replace('@visx/', '')}`,
      }));

      const tsConfigFile = fs.readFileSync(`${packagePath}/tsconfig.json`, 'utf-8');
      const tsConfig = JSON.parse(tsConfigFile);

      tsConfig.references = visXReferences;

      fs.writeFileSync(`${packagePath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2));
    } catch (error) {
      console.error(chalk.red(String(error)));
      throw error;
    }
  });

  return Promise.resolve();
}

updateTsReferences().catch((error) => {
  console.error(chalk.red(String(error)));
  process.exitCode = 1;
});
