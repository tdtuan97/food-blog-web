import React, {Component} from "react"
import {Switch} from "react-router-dom"
import {PublicRoute} from './PublicRoute'
import {PrivateRoute} from './PrivateRoute'
import {ExceptionRoute} from './ExceptionRoute'
import * as Auth from '@features/Auth'
import * as Home from '@features/Home'
import {ErrorPage} from "@features/Exceptions";

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <PublicRoute path="/login" layout='Auth'><Auth.Login/></PublicRoute>
                <PublicRoute path="/register" layout='Auth'>
                    <Auth.Register/>
                </PublicRoute>

                <PrivateRoute path="/" layout='App'>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/homepage" layout='App'>
                    <Home.HomePage/>
                </PrivateRoute>
                <ExceptionRoute path="*"><ErrorPage code={404}/></ExceptionRoute>
            </Switch>
        );
    }
}

export default AllRoutes
