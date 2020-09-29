import mockUtils from '../test/mock-utils';
import { search } from './chat';
import { Priority } from './types';

describe('search', () => {
  test('should return task by query', () => {
    // Generate data to search through
    const generatedTasks = Array(250)
      .fill(null)
      .map(() => mockUtils.generateTask());

    // Add items we are actually searching for
    const tasks = [
      ...generatedTasks,
      mockUtils.generateTask({
        title: 'Finn ut hva man kan prate om på 10 minutter',
      }),
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
        priority: Priority.HIGH,
      }),
    ];

    // Shuffle the list
    const shuffledTasks = mockUtils.shuffle(tasks);

    // Save snapshot for demo purposes
    expect(shuffledTasks).toMatchSnapshot();

    // Execute search
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
