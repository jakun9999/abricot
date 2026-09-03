import type { Preview } from '@storybook/nextjs-vite'
import { Inter, Manrope } from 'next/font/google'
import MockDate from 'mockdate'
import { mswLoader } from 'msw-storybook-addon/csf3'
import { AuthProvider } from '../context/auth-context'
import { mswHandlers } from './msw-handlers'
import '../app/globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
    backgrounds: {
      default: 'abricot',
      values: [
        { name: 'abricot', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${manrope.variable} ${inter.variable} font-sans antialiased bg-abr-grey-50 text-abr-grey-800 min-h-full`}
        style={{ colorScheme: 'light' }}
      >
        <AuthProvider>
          <Story />
        </AuthProvider>
      </div>
    ),
  ],
  loaders: [mswLoader()],
  async beforeEach({ msw }) {
    msw.use(...mswHandlers)
    document.cookie = `user_data=${encodeURIComponent(
      JSON.stringify({
        id: 'u1',
        email: 'marie@abricot.test',
        name: 'Marie Dupont',
      }),
    )}`
    MockDate.set('2024-04-01T12:00:00Z')
  },
};

export default preview;