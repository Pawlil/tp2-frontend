import { createContext, useState, type ReactNode } from "react";

import type { Usuario } from "../services/api";

interface UserContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}