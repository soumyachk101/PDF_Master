import { createContext, useContext } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => { }, mode: 'dark' });

export function useColorMode() {
  return useContext(ColorModeContext);
}
