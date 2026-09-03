import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
import LoginForm from './login-form';
import { AbricotIcon } from '@/components/ui/icons';
import Link from 'next/link';

const meta = {
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen w-full bg-white">
        <div className="flex w-full flex-col gap-10 md:gap-0 md:justify-between max-h-256 items-center py-[111.92] px-4">
          <AbricotIcon
            className="w-[252.57px] max-w-full h-[32.17px] text-abr-dark-orange"
            aria-label="Logo Abricot"
            role="img"
          />
          <Story />
          <p className="flex flex-wrap items-center justify-center text-center text-body-s px-2">
            Pas encore de compte ?
            <Link href="/signin" className="ml-2.5 text-abr-dark-orange underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FormulaireRempli: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'a@b.com');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'secret');
    await userEvent.click(canvas.getByRole('button', { name: /se connecter/i }));
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: /^se connecter$/i })).toBeVisible(),
    );
  },
};

export const IdentifiantsInvalides: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'wrong@abricot.test');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'nope');
    await userEvent.click(canvas.getByRole('button', { name: /se connecter/i }));
    await expect(await canvas.findByText(/identifiants incorrects/i)).toBeVisible();
  },
};
