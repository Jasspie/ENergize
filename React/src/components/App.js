import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { RecipeProvider } from "../contexts/RecipeContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Recipes from "./main/Recipes";
import SignIn from "./SignIn";
import CreateRecipe from "./ingredients/CreateRecipe";
import RecipeDetails from "./details/RecipeDetails";
import RecipeInfo from "./main/RecipeInfo";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Recipes} />
            <PrivateRoute exact path="/recipes/:id" component={RecipeInfo} />
            <PrivateRoute exact path="/ingredients" component={CreateRecipe} />
            <PrivateRoute exact path="/overview" component={RecipeDetails} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
