import faker from 'faker';
import { format, extend, generate, option, Schema } from 'json-schema-faker';
import { resolve } from 'path';
import seedrandom from 'seedrandom';
import * as TJS from 'typescript-json-schema';
import { Task } from '../src/types';

faker.locale = 'nb_NO';
faker.seed(123);

extend('faker', () => faker);
option({ random: seedrandom('123') });

format('uuid', () => faker.random.uuid());
format('timestamp', () => faker.date.between('2020', '2030').toISOString());
format('paragraph', () => faker.lorem.paragraph(1));

const program = TJS.getProgramFromFiles([resolve('src/types/index.ts')]);
const generator = TJS.buildGenerator(program, {
  // Set non-optinoal types as required in schema
  required: true,
  defaultNumberType: 'integer',
});

const taskSchema = generator.getSchemaForSymbol('Task');

const generateFromSchema = <T>(schema: Schema, override?: Partial<T>): T => {
  const result = (generate(schema) as unknown) as T;

  return {
    ...result,
    ...override,
  };
};

const generateTask = (override?: Partial<Task>): Task =>
  generateFromSchema<Task>(taskSchema as Schema, override);

const shuffle = <T>(items: T[]): T[] => faker.helpers.shuffle(items);

export default {
  generateTask,
  shuffle,
};
