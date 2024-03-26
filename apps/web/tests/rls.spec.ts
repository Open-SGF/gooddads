import { test, expect } from '@playwright/test';
import { testClient as supabase } from '../utils/supabase/testClient';

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

  test('cannot create new profiles.', async () => {
    const { error } = await supabase.from('users').insert({ username: 'John Doe' });
    expect(error.message).toEqual("new row violates row-level security policy for table \"users\"");
  });

  test('User can view their class assignment.', async () => {
    const { data } = await supabase.from('class_assignments').select();
    expect(data).toHaveLength(1);
  });

  test('User can view their class.', async () => {
    const { data } = await supabase.from('classes').select();
    expect(data).toHaveLength(1);
  });

  test('User can view their class region.', async () => {
    const { data } = await supabase.from('regions').select();
    expect(data).toHaveLength(1);
  });

  test('User can view their program assignments.', async () => {
    const { data } = await supabase.from('program_assignments').select();
    expect(data).toHaveLength(2);
  });

  test('User can view their associated programs.', async () => {
    const { data } = await supabase.from('programs').select();
    expect(data).toHaveLength(1);
  });

  test('User can view their associated modules.', async () => {
    const { data } = await supabase.from('modules').select();
    expect(data).toHaveLength(8);
  });

  test('User can view their module assignments.', async () => {
    const { data } = await supabase.from('module_assignments').select();
    expect(data).toHaveLength(8);
  });

  test('User can view their quiz assignments.', async () => {
    const { data } = await supabase.from('quiz_assignments').select();
    expect(data).toHaveLength(8);
  });

  test('User can view their quizzes.', async () => {
    const { data } = await supabase.from('quizzes').select();
    expect(data).toHaveLength(8);
  });

  test('User can view their quiz questions.', async () => {
    const { data } = await supabase.from('quiz_questions').select();
    expect(data).toHaveLength(6);
  });

  test('User can view their quiz question options.', async () => {
    const { data } = await supabase.from('quiz_question_options').select();
    expect(data).toHaveLength(16);
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
    const { error } = await supabase.from('users').insert({ id: '2df8118d-0942-4e8c-a2e9-77582429c25e', username: 'John Doe' });
    expect(error).toBeNull();
  });
});
