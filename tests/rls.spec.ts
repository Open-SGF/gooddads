import { test, expect } from '@playwright/test';
import { testClient as supabase } from '@/utils/supabase/testClient';

test.describe('All users', () => {
  test.beforeAll(async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: 'dad@email.local',
      password: 'NotAGoodPassword123',
    });
    expect(error).toBeNull();
  });

  test.afterAll(async () => {
    const { error } = await supabase.auth.signOut();
    expect(error).toBeNull();
  });

  test('can view their own profile.', async () => {
    const { data, error } = await supabase.from('users').select();
    expect(data).toHaveLength(1);
  });

  test('can update their own profiles.', async () => {
    const { error } = await supabase.from('users')
      .update({ username: 'Dad' })
      .match({ id: 'f3a51eed-f45a-413f-89f2-d3de7659fba2' });
    expect(error).toBeNull();
  });
});

test.describe('Admin users', () => {
  test.beforeAll(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@email.local',
      password: 'NotAGoodPassword123',
    });
    expect(error).toBeNull();
  });

  test.afterAll(async () => {
    const { error } = await supabase.auth.signOut();
    expect(error).toBeNull();
  });

  test('can view all profiles.', async () => {
    const { data } = await supabase.from('users').select();
    expect(data?.length).toBeGreaterThan(1);
  });

  test('can update all profiles.', async () => {
    const { error } = await supabase.from('users')
      .update({ username: 'Daddy' })
      .match({ id: 'f3a51eed-f45a-413f-89f2-d3de7659fba2' });
    expect(error).toBeNull();
  });
});

test.describe('Intake users', () => {
  test.beforeAll(async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: 'intake@email.local',
      password: 'NotAGoodPassword123',
    });
    expect(error).toBeNull();
  });

  test.afterAll(async () => {
    const { error } = await supabase.auth.signOut();
    expect(error).toBeNull();
  });

  test('can create new profiles.', async () => {
    const { error } = await supabase.auth.signUp({
      email: 'newUser@email.local',
      password: 'NotAGoodPassword123',
    });
  });
});
