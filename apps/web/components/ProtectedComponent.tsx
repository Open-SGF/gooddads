import { Roles } from "@/utils/enums";
import { AuthCookie, ConditionalComponent } from "@/utils/types";
import { cookies } from "next/headers";

export default function ProtectedComponent({
  components,
}: {
  components: ConditionalComponent;
}) {
  const cookieStore = cookies();
  const authCookieValue = cookieStore.get("sb-localhost-auth-token")?.value;
  let userRole: Roles | undefined = undefined;
  if (authCookieValue) {
    const authCookie = JSON.parse(authCookieValue) as AuthCookie;
    userRole = authCookie.user?.app_metadata?.userrole;
  }

  return (
    <>
      {!userRole && <>Something went wrong</>}
      {userRole && components[userRole]}
    </>
  );
}
