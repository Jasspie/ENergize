import React, { useContext, useState } from "react";

const RecipeContext = React.createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}

export function RecipeProvider({ children }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function reset() {
    setIngredientsList([]);
    setImage(null);
    setTitle("");
    setDetails("");
  }
  const value = {
    ingredientsList,
    image,
    title,
    details,
    reset,
    setIngredientsList,
    setDetails,
    setTitle,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}
