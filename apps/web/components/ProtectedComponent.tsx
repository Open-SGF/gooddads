import { ConditionalComponent } from "@/utils/types";
import getRole from "@/utils/supabase/role";

export default function ProtectedComponent({
  components,
}: {
  components: ConditionalComponent;
}) {
  const userRole = getRole()

  return (
    <>
      {!userRole && <>You don't have a user role</>}
      {userRole && components[userRole]}
    </>
  );
}
