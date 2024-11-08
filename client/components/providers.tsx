import { UserProvider } from "@auth0/nextjs-auth0/client";
import React, { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>;
}
