import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Header from './header';

const meta = {
  component: Header,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('MD')).toBeVisible();
    await expect(canvas.getByLabelText('Mon compte')).toBeVisible();
  },
};
