import type { HeaderData } from "@workleap-nav/react";
import { createContext, useContext } from "react";

const HeaderDataContext = createContext<HeaderData | undefined>(undefined);

export const HeaderDataContextProvider = HeaderDataContext.Provider;

export function useHeaderData() {
    return useContext(HeaderDataContext);
}
