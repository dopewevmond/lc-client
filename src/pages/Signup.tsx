import React from "react";
import { Formik, Form } from "formik";
import { InputWrapper } from "../utils/InputWrapper";
import { Spinner, Toast } from "flowbite-react";
import { signupSchema } from "../validators";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";

export const SignupPage = () => {
  useRedirect();
  const {
    initialSignupFormValues: initialFormValues,
    signup,
    error,
  } = useAuth();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {error && (
        <Toast className="fixed top-4 right-4" duration={1000}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            ✕
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle />
        </Toast>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Chatty
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <Formik
              initialValues={initialFormValues}
              validationSchema={signupSchema}
              onSubmit={(values, { setSubmitting }) => {
                signup(values, setSubmitting);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-2 md:space-y-3">
                  <div>
                    <InputWrapper
                      label="Username"
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="smoothtalker"
                    />
                  </div>
                  <div>
                    <InputWrapper
                      label="Display name"
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="smoothtalker"
                    />
                  </div>
                  <div>
                    <InputWrapper
                      label="Password"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      isSubmitting
                        ? "cursor-not-allowed text-gray-400 bg-gray-300 dark:text-gray-600 dark:bg-gray-500"
                        : "text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    } `}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Spinner
                        size="sm"
                        color="gray"
                        aria-label="loading spinner"
                        className="mr-3"
                      />
                    )}
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Log in
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};
