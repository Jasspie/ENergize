import React, { useContext, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

// Context handles the recipe that the user is currently building when navigating between pages
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
  const { currentUser } = useAuth();

  function reset() {
    setIngredientsList([]);
    setImage(null);
    setTitle("");
    setDetails("");
    setScores({});
  }

  function submitRecipe(average, photo) {
    database.recipes.add({
      average,
      title,
      ingredientsList,
      details,
      photo,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimeStamp(),
    });
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
    submitRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}
