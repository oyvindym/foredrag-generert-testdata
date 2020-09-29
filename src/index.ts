import mockUtils from '../test/mock-utils';
import { Task } from './types';

const main = () => {
  const override: Partial<Task> = {};

  console.log(mockUtils.generateTask(override));
};

main();
