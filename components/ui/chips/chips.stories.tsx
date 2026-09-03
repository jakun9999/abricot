import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Chips from './chips';

const meta = {
  component: Chips,
  parameters: { layout: 'centered' },
  args: {
    icon: 'task',
    color: 'light',
    text: 'Liste',
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VuesDashboard: Story = {
  render: () => (
    <nav className="flex gap-2.5" aria-label="Vues du tableau de bord">
      <Chips
        href="/dashboard"
        icon="task"
        text="Liste"
        color="light"
        current
      />
      <Chips
        href="/dashboard/kanban"
        icon="calendar"
        text="Kanban"
        color="white"
      />
    </nav>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /liste/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
  },
};

export const Liste: Story = {
  args: { icon: 'task', text: 'Liste', color: 'light' },
};

export const Kanban: Story = {
  args: { icon: 'calendar', text: 'Kanban', color: 'white' },
};

export const Calendrier: Story = {
  args: { icon: 'calendar', text: 'Calendrier', color: 'white' },
};

export const CssCheck: Story = {
  args: { icon: 'task', text: 'Liste', color: 'light' },
  play: async ({ canvas }) => {
    const chip = canvas.getByRole('button', { name: /liste/i });
    // Chips light uses bg-abr-light-orange (#ffe8d9) — fails if globals.css did not load.
    await expect(getComputedStyle(chip).backgroundColor).toBe('rgb(255, 232, 217)');
  },
};
