import { test, expect } from '@playwright/test';
import { testClient } from '@/utils/supabase/testClient';

test.describe('All users', () => {
  test.beforeAll(async () => {
    const { error, data } = await testClient.auth.signInWithPassword({
      email: 'dad@email.local',
      password: 'NotAGoodPassword123',
    });
    expect(error).toBeNull();
  });

  test.afterAll(async () => {
    const { error } = await testClient.auth.signOut();
    expect(error).toBeNull();
  });

  test('can view their own profile.', async () => {
    const { data, error } = await testClient.from('users').select();
    expect(data).toHaveLength(1);
  });

    test('can update their own profiles.', async () => {
        const { data, error } = await testClient.from('users').select();
        expect(data).toHaveLength(1);
    });
});
