import React, { useEffect, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

// file import
const CompleteRegisterion = lazy(() => import("./pages/auth/RegistarComplete"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const ToDoListUpdate = lazy(() => import("./ToDoList/ToDoListUpdate"));
const Complete = lazy(() => import("./pages/auth/Complete"));
const Register = lazy(() => import("./pages/auth/Registar"));
const Login = lazy(() => import("./pages/auth/Login"));
const Footer = lazy(() => import("./nav/Footer"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Suspense
            fallback={
                <div className='col text-center p-5'>
                    __To D
          <LoadingOutlined />
            List__
            </div>
            }
        >
            <ToastContainer />
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/home/complete' component={Complete} />
                <Route exact path='/forgetPassword' component={ForgetPassword} />
                <Route exact path='/toDoList/:slug' component={ToDoListUpdate} />
                <Route exact path='/register/complete' component={CompleteRegisterion} />
            </Switch>
            <Footer/>
        </Suspense>
    );
};

export default App;