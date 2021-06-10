import React, { useEffect, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Suspense } from "react";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Registar"));


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
                                role: res.data.role,
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
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />

            </Switch>
        </Suspense>
    )
}

export default App;
