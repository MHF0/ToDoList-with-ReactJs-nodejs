import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider, facebookAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../nav/Header";
import { Button } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

const Register = ({ history }) => {
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

    useEffect(() => {
        if (user && user.token) history.push("/home");
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: "https://todolist-farhan.herokuapp.com/register/complete",
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `تم ارسال بريد الكتروني الى ${email} انقر على الرابط لاتمام عملية التسجيل`
        );
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            history.push('/home');
        }
    };

    const googleLogin = async () => {
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
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
                        roleBasedRedirect(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const facebookLogin = async () => {
        auth
            .signInWithPopup(facebookAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
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
                        roleBasedRedirect(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control pt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
            />

            <br />
            <button type="submit" className="btn btn-raised">
                Register
      </button>
            <br />
            <br />
            <br />
            <Button
                onClick={googleLogin}
                type="danger"
                className="mb-2"
                block
                shape="round"
                icon={<GoogleOutlined />}
                size="large"
            >
                Register with Google
          </Button>
            <br />
            <br />
            <Button
                onClick={facebookLogin}
                className="mb-2"
                style={{ backgroundColor: "#3b5998", color: 'white' }}
                block
                shape="round"
                icon={<FacebookOutlined />}
                size="large"
            >
                Register with Facebook
          </Button>
        </form>
    );

    return (
        <>
            <Header />
            <div className="container p-5">

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Register</h4>
                        <br />
                        {registerForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
