import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import IconButton from './icon-button';

const meta = {
  component: IconButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Retour: Story = {
  args: { label: 'back', 'aria-label': 'Retour à la liste des projets' },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Retour à la liste des projets' }),
    ).toHaveAttribute('aria-label', 'Retour à la liste des projets');
  },
};

export const PlusDActions: Story = {
  args: { label: 'points' },
};
