import { useTheme } from '@material-ui/core';
import React, {createContext, useContext} from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({children, value}) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
 
export default ThemeProvider;

export function useTheme(){
  return useContext(ThemeContext);
}