import React, { useContext, useState } from "react";

const RecipeContext = React.createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}

export function RecipeProvider({ children }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [scores, setScores] = useState({});
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);

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
    scores,
    reset,
    setIngredientsList,
    setDetails,
    setTitle,
    setScores,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}
