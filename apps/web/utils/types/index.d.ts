import { Roles } from "../enums";

export type ProtectedRoutes = {
  [Roles.ROLE_ADMIN]: string[];
  [Roles.ROLE_DAD]: string[];
  [Roles.ROLE_INTAKE]: string[];
};
