import ProtectedComponent from "@/components/ProtectedComponent";
import {createClient} from "@/utils/supabase/server";
import {ConditionalComponent} from "@/utils/types";
import {cookies} from "next/headers";

export default async function Index() {
    const cookieStore = cookies();

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient(cookieStore);
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    const components: ConditionalComponent = {
        DAD: <>Dad</>,
        ADMIN: <>Admin</>,
        INTAKE: <>Intake</>,
    };

    return (
        <>
            {isSupabaseConnected && <ProtectedComponent components={components}/>}
        </>
    );
}
