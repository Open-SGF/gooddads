import {AuthCookie} from "@/utils/types";
import { cookies } from "next/headers";

export default function getRole() {
    const cookieStore = cookies();
    const authCookieValue = cookieStore.get("sb-localhost-auth-token")?.value;
    if (!authCookieValue) {
        return undefined;
    }
    const authCookie = JSON.parse(authCookieValue) as AuthCookie;
    return authCookie.user?.app_metadata?.userrole;
}