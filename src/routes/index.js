import React, {Component} from "react"
import {Switch} from "react-router-dom"
import {PublicRoute} from './PublicRoute'
import {PrivateRoute} from './PrivateRoute'
import {ExceptionRoute} from './ExceptionRoute'
import * as Auth from '@features/Auth'
import * as Home from '@features/Home'
import * as Recipe from '@features/Recipe'
import {ErrorPage} from "@features/Exceptions";

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <PublicRoute path="/login" layout='Auth'><Auth.Login/></PublicRoute>
                <PublicRoute path="/register" layout='Auth'>
                    <Auth.Register/>
                </PublicRoute>

                <PrivateRoute path="/" layout='App' exact={true}>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/homepage" layout='App'>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/recipe/:id" layout='App' exact={true}>
                    <Recipe.Detail/>
                </PrivateRoute>
                <ExceptionRoute path="*"><ErrorPage code={404}/></ExceptionRoute>
            </Switch>
        );
    }
}

export default AllRoutes
