import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import FormInput from './form-input';

const meta = {
  component: FormInput,
  parameters: { layout: 'centered' },
  args: {
    className: 'w-70.5 max-w-full',
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    inputId: 'email',
    label: 'Email',
    inputType: 'email',
    autoComplete: 'email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toHaveAttribute('type', 'email');
  },
};

export const MotDePasse: Story = {
  args: {
    inputId: 'password',
    label: 'Mot de passe',
    inputType: 'password',
    autoComplete: 'current-password',
  },
};

export const NomObligatoire: Story = {
  args: {
    inputId: 'name',
    label: 'Nom',
    inputType: 'text',
    mandatory: true,
  },
};
