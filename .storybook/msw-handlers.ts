import { http, HttpResponse } from 'msw';

const storyUser = {
  id: 'u1',
  email: 'marie@abricot.test',
  name: 'Marie Dupont',
};

export const mswHandlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (body.email === 'a@b.com' && body.password === 'secret') {
      return HttpResponse.json({ success: true, user: storyUser });
    }

    return HttpResponse.json(
      { success: false, message: 'Identifiants incorrects' },
      { status: 401 },
    );
  }),
];
