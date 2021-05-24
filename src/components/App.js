import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Recipes from "./main/Recipes";
import SignIn from "./SignIn";
import CreateRecipe from "./ingredients/CreateRecipe";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Recipes} />
          <PrivateRoute exact path="/ingredients" component={CreateRecipe} />
          <Route path="/login" component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
