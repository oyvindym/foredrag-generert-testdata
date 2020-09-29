export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  /**
   * @TJS-format uuid
   */
  id: string;
  title: string;

  /**
   * @TJS-format paragraph
   */
  description?: string;

  /**
   * @TJS-format timestamp
   */
  dueDate: string;
  isCompleted: boolean;
  priority?: Priority;

  /**
   * @items {"type": "string", "faker": "company.bsBuzz"}
   */
  labels: string[];
}
