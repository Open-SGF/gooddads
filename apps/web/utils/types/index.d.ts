import { ReactNode } from "react";
import { Roles } from "../enums";

export type ProtectedRoutes = {
  [Roles.ROLE_ADMIN]: string[];
  [Roles.ROLE_DAD]: string[];
  [Roles.ROLE_INTAKE]: string[];
};

export type ConditionalComponent = {
  [Roles.ROLE_ADMIN]: ReactNode;
  [Roles.ROLE_DAD]: ReactNode;
  [Roles.ROLE_INTAKE]: ReactNode;
};

export type AuthCookie = {
  access_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
    app_metadata: {
      userrole: Roles;
    };
  };
};
