import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import ProjectCard from './project-card';
import type { Project } from '@/schemas/project-schema';

const owner = {
  id: 'u1',
  email: 'marie@abricot.test',
  name: 'Marie Dupont',
};

const project: Project = {
  id: 'p1',
  name: 'Refonte landing',
  description: 'Mise à jour de la page d’accueil et des parcours d’inscription.',
  ownerId: 'u1',
  owner,
  members: [
    {
      role: 'OWNER',
      user: owner,
      joinedAt: '2024-01-15T10:00:00.000Z',
    },
    {
      role: 'CONTRIBUTOR',
      user: { id: 'u2', email: 'jean@abricot.test', name: 'Jean Martin' },
      joinedAt: '2024-02-01T10:00:00.000Z',
    },
  ],
};

const meta = {
  component: ProjectCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-95">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnCours: Story = {
  args: { project, totalTasks: 10, finishedTasks: 3 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30');
  },
};

export const Vide: Story = {
  args: { project, totalTasks: 0, finishedTasks: 0 },
};

export const Termine: Story = {
  args: { project, totalTasks: 8, finishedTasks: 8 },
};
