import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import TaskShort from './task-short';
import Label from '@/components/ui/labels/label';
import type { Task } from '@/schemas/task-schema';

const baseTask: Task = {
  id: 't1',
  title: 'Rédiger la maquette mobile',
  description: 'Adapter les écrans clés pour le viewport 375px.',
  status: 'TODO',
  priority: 'HIGH',
  dueDate: '2024-04-01T12:00:00.000Z',
  projectId: 'p1',
  creatorId: 'u1',
  comments: [],
};

function KanbanColumn({
  title,
  count,
  children,
}: {
  title: string;
  count: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-4 py-10 w-full max-w-104.75">
      <div className="flex items-center gap-2 h-6.75">
        <h5>{title}</h5>
        <Label color="grey" text={count} />
      </div>
      <div className="flex flex-col gap-4 mt-10.25">{children}</div>
    </div>
  );
}

const meta = {
  component: TaskShort,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TaskShort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AFaire: Story = {
  args: { task: baseTask, projectName: 'Refonte landing' },
  decorators: [
    (Story) => (
      <KanbanColumn title="À faire" count="1">
        <Story />
      </KanbanColumn>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'À faire', level: 5 })).toBeVisible();
    await expect(canvas.getByText("aujourd'hui")).toBeVisible();
  },
};

export const EnCours: Story = {
  args: {
    task: { ...baseTask, status: 'IN_PROGRESS' },
    projectName: 'Refonte landing',
  },
  decorators: [
    (Story) => (
      <KanbanColumn title="En cours" count="1">
        <Story />
      </KanbanColumn>
    ),
  ],
};

export const Terminee: Story = {
  args: {
    task: { ...baseTask, status: 'DONE', dueDate: '2024-03-20T09:00:00.000Z' },
    projectName: 'Refonte landing',
  },
  decorators: [
    (Story) => (
      <KanbanColumn title="Terminées" count="1">
        <Story />
      </KanbanColumn>
    ),
  ],
};
