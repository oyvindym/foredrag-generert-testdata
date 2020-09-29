import { Task } from './types';

const purge = (value: string): string => value.replace(/[-\.,]/g, ' ');

export const search = ({
  tasks,
  query,
  filter = {},
}: {
  tasks: Task[];
  query: string;
  filter?: {
    includeCompletedTasks?: boolean;
  };
}): Task[] => {
  const purgedQuery = purge(query);

  return tasks
    .filter((it) => {
      if (filter.includeCompletedTasks) {
        return true;
      }

      return !it.isCompleted;
    })
    .filter((it) => purge(it.title).indexOf(purgedQuery) !== -1);
};
