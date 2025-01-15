import React, { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from './AuthContext';
import Login from "./Login";
import Home from "../../pages/Home";
import SystemLogs from "../../pages/SystemLogs";
import Test from "../../pages/SystemInfo";
import FreeCode from "../../pages/FreeCode";
import UserRoles from "../../pages/UserRoles";
import Languages from "../../pages/Languages";
import MyProfile from "../../pages/MyProfile";
import MenuCmp from "../menu/MenuCmp";

type Props = {}


const Routes = (props: Props) => {
    return (
        <Router>
            <Route path='/login' element={<Login />}/>
        </Router>
    )
}

export default Routes