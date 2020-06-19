import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import ProductForm from "./components/ProductForm/ProductForm";
import AuthForm from "./components/AuthForm/AuthForm";

const Routes = () => (
    <Switch>
        {/* Se puede así, pero NO LLEGAN LOS PROPS DE ESTA FORMA */}
        {/* <Route exact path="/" component={() => <Products />} /> */}
        <Route exact path="/" component={Products} />
        {/* Y también así, ASÍ SÍ LLEGAN LOS PROPS */}
        <Route exact path="/new" component= {ProductForm} />
        {/* De la siguiente forma se mandan los props en automático */}
        <Route exact path="/login" component={AuthForm} />
        <Route exact path="/signup" component={AuthForm} />
        <Route exact path="/:id" component={() => <h1>detalle id</h1>} />
    </Switch>
)

export default Routes