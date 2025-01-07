import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
interface ContextProps {
  children: ReactNode;
}
interface ClientValueType {
  client: string;
  setClient: Dispatch<SetStateAction<string>>;
}
const defaultValue: ClientValueType = {
  client: "",
  setClient: () => {},
};
const clientContext = createContext<ClientValueType>(defaultValue);
const ClientContextProvider = ({ children }: ContextProps) => {
  const [client, setClient] = useState("");
  return (
    <clientContext.Provider value={{ client, setClient }}>
      {children}
    </clientContext.Provider>
  );
};

export { ClientContextProvider, clientContext };
