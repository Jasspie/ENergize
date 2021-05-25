import React, { useContext, useState } from "react";

const RecipeContext = React.createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}

export function RecipeProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [details, setDetails] = useState(null);

  function reset() {
    setIngredients([]);
    setImage(null);
    setTitle(null);
    setDetails(null);
  }
  const value = {
    ingredients,
    image,
    title,
    details,
    reset,
    setIngredients,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}
