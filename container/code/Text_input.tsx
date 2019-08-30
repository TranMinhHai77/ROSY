import * as React from "react"
import { Frame, useCycle } from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

import * as React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
//import '../styles/TextInput.css';
//import AUtextInput from '../node_modules/@gov.au/text-inputs';

class TextInput extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("First Name is required"),

                    email: Yup.string()
                        .email("Email is invalid")
                        .required("Email is required"),
                    password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                    confirmPassword: Yup.string()
                        .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                        )
                        .required("Confirm Password is required"),
                })}
                onSubmit={fields => {
                    alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4))
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">Full Name</label>
                            <Field
                                name="firstName"
                                type="text"
                                className={
                                    "form-control" +
                                    (errors.firstName && touched.firstName
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                type="text"
                                className={
                                    "form-control" +
                                    (errors.email && touched.email
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className={
                                    "form-control" +
                                    (errors.password && touched.password
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                className={
                                    "form-control" +
                                    (errors.confirmPassword &&
                                    touched.confirmPassword
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Register
                            </button>
                            <button type="reset" className="btn btn-secondary">
                                Reset
                            </button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}

export default TextInput
