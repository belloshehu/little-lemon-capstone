import { useContext, createContext, useState } from "react";

const MenuContext = createContext(null);

export const MenuContextProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);

  const value = {
    selectedCategories,
    setSelectedCategories,
    menuCategories,
    setMenuCategories,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
