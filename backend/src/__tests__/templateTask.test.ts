import { buildExampleTask } from '../lib/templateTask';

describe('buildExampleTask', () => {
  it('returns a generic task example for new projects', () => {
    const task = buildExampleTask();

    expect(task.id).toBe('template-task');
    expect(task.status).toBe('todo');
    expect(task.notes).toHaveLength(3);
  });
});
