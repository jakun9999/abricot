import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Footer from './footer';

const meta = {
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-360 mx-auto bg-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Abricot 2025')).toBeVisible();
  },
};
