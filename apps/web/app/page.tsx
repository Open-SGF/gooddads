import ProtectedComponent from "@/components/ProtectedComponent";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { ConditionalComponent } from "@/utils/types";
import { cookies } from "next/headers";

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
    DAD: <>DAD</>,
    ADMIN: <>ADMIN</>,
    INTAKE: <>INTAKE</>,
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      {isSupabaseConnected && <ProtectedComponent components={components} />}
    </div>
  );
}
