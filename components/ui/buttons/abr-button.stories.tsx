import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import AbrButton from './abr-button';

const meta = {
  component: AbrButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AbrButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreerUnProjet: Story = {
  args: {
    type: 'button',
    color: 'black',
    label: '+ Créer un projet',
    className: 'w-45.25 h-12.5 shrink-0',
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('button', { name: args.label })).toHaveTextContent(
      args.label,
    );
  },
};

export const Annuler: Story = {
  args: {
    type: 'button',
    color: 'outline',
    label: 'Annuler',
    className: 'min-w-27.5',
  },
};

export const Desactive: Story = {
  args: {
    type: 'button',
    color: 'disabled',
    label: '+ Créer un projet',
    className: 'w-45.25 h-12.5 shrink-0',
    disabled: true,
  },
};
