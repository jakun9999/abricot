import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Label from './label';

const meta = {
  component: Label,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatutsKanban: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Label color="red" text="À faire" />
      <Label color="warningOrangeLight" text="En cours" />
      <Label color="green" text="Terminé" />
      <Label color="grey" text="Annulé" />
    </div>
  ),
};

export const AFaire: Story = {
  args: { color: 'red', text: 'À faire' },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.text!)).toBeVisible();
  },
};

export const EnCours: Story = {
  args: { color: 'warningOrangeLight', text: 'En cours' },
};

export const Termine: Story = {
  args: { color: 'green', text: 'Terminé' },
};

export const Compteur: Story = {
  args: { color: 'grey', text: '3' },
};
