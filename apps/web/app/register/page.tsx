"use client";

import supabase from '@/utils/supabase/client';
import {redirect} from 'next/navigation';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@ui/components/ui/form';
import {Input} from '@ui/components/ui/input';
import {Button} from '@ui/components/ui/button';
import * as React from "react";

const formSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required")
})

export default function Signin({searchParams}: {
    searchParams: { message: string };
}) {
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {email, password} = values

        const {error} = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            window.location.href = '/signin?message=Could not authenticate user';
            return;
        }

        window.location.href = '/signin?message=Check email to continue sign in process';
        return;
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <div className='flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md'>
            <Form {...form}>
                <form
                    className='animate-in flex w-full flex-1 flex-col justify-center gap-4 text-foreground'
                    onSubmit={form.handleSubmit(async (values) => await onSubmit(values))}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Email"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' placeholder={"Password"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button variant={'default'}>
                        Register
                    </Button>
                    {searchParams?.message && (
                        <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </Form>
        </div>
    );
}
