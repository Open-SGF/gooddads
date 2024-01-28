import {test, expect} from '@playwright/test';
import {createClient} from '@/utils/supabase/client';

test.describe('Users', () => {
    const supabase = createClient();

    test.beforeEach(async () => {
        const {error, data} = await supabase.auth.signInWithPassword({
            email: 'dad@email.local',
            password: 'NotAGoodPassword123',
        });
        expect(error).toBeNull();
    });

    test('can view their own profile.', async () => {
        const {data} = await supabase.from('users').select();
        expect(data).toHaveLength(1);
    })
})