import {
  ReactNode,
  createContext,
  memo,
  useContext,
} from "react";
import { Container } from "inversify";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";

interface ContextProps {
  container: Container | null;
}

interface ProviderProps {
  container: Container;
  children: ReactNode;
}

const InversifyContext = createContext<ContextProps>({ container: null });

export const InjectionProvider = ({ container, children }: ProviderProps) => {
  return (
    <InversifyContext.Provider value={{ container }}>
      {children}
    </InversifyContext.Provider>
  );
};

export const withInjection =
  <P extends {}>(identifiers: { [key: string]: symbol }) =>
  (Component: IReactComponent) => {
    return memo((props: P) => {
      const { container } = useContext(InversifyContext);
      if (!container) {
        throw new Error("Container not found");
      }

      let finalProps: P & Record<string, any> = { ...props };

      for (const [key, value] of Object.entries(identifiers)) {
        (finalProps as Record<string, any>)[key] = container.get(value);
      }

      return <Component {...finalProps} />;
    });
  };
