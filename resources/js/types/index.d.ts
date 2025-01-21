import { Config } from 'ziggy-js';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string, query: Record<string, string> };
};
