import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import supabase from '@/utils/supabase/client'
import {RegisterInputs} from '@/app/register/page'

export const createDadApi = createApi({
    reducerPath: 'createDadApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        createDad: builder.mutation({
            queryFn: async ({email, password}: RegisterInputs) => {
                const {data, error} = await supabase.auth.signUp(
                    {
                        email: email,
                        password: password,
                    }
                )

                if (error) return {error}

                return {data}
            },
        }),
    }),
})