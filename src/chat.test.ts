import mockUtils from '../test/mock-utils';
import { search } from './chat';

describe('search', () => {
  test('should return task by query', () => {
    const tasks = [
      ...Array(300)
        .fill(null)
        .map(() => mockUtils.generateTask()),
      mockUtils.generateTask({
        title: 'Lag foredrag til kick-off',
        isCompleted: true,
      }),
      mockUtils.generateTask({
        title: 'Husk å ta med mac til kick off',
        isCompleted: true,
      }),
      mockUtils.generateTask({
        title: 'Husk å hold deg til å prate i 10 minutter under kick-offen.',
        isCompleted: false,
      }),
      mockUtils.generateTask({
        title: 'Få deg noe kaldt å drikke etter kick-off-foredraget',
        isCompleted: false,
      }),
    ];

    const shuffledTasks = mockUtils.shuffle(tasks);

    // expect(shuffledTasks).toMatchSnapshot();

    const searchIncompleteTasksResult = search({
      tasks: shuffledTasks,
      query: 'kick-off',
      filter: {
        includeCompletedTasks: false,
      },
    });

    expect(searchIncompleteTasksResult.length).toBe(2);
    expect(searchIncompleteTasksResult).toMatchSnapshot();
  });
});
