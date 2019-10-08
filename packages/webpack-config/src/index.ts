import { Configuration } from 'webpack';

import { Arguments, DevConfiguration, Environment, InputEnvironment } from './types';
import * as Diagnosis from './utils/Diagnosis';
import { validateEnvironment } from './utils/validate';
import webpackConfig from './webpack.config';

export default async function(
  env: InputEnvironment,
  argv: Arguments = {}
): Promise<Configuration | DevConfiguration> {
  const environment: Environment = validateEnvironment(env);

  const config: Configuration | DevConfiguration = await webpackConfig(environment, argv);

  if (environment.info) {
    Diagnosis.reportAsync(config, environment);
  }

  return config;
}
