import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { LoginPage } from "../pages/Login";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { store } from "../redux/store";

test("displays a link to the signup page", async () => {
  const loginpage = render(
    <Provider store={store}>
      <StaticRouter location="/">
        <LoginPage />
      </StaticRouter>
    </Provider>
  );
  const link = await loginpage.findByTestId("signup-link");
  expect(link.textContent).toContain("Create an account");
  loginpage.unmount();
});

test("contains a form", async () => {
  const loginpage = render(
    <Provider store={store}>
      <StaticRouter location="/">
        <LoginPage />
      </StaticRouter>
    </Provider>
  );
  const form = await loginpage.findByTestId("login-form");
  expect(form).toBeTruthy();
  loginpage.unmount();
});

test("contains a username input and label", async () => {
  const loginpage = render(
    <Provider store={store}>
      <StaticRouter location="/">
        <LoginPage />
      </StaticRouter>
    </Provider>
  );
  const username = await loginpage.findByLabelText("Username");
  expect(username).toBeTruthy();
  loginpage.unmount();
});

test("contains a password input and label", async () => {
  const loginpage = render(
    <Provider store={store}>
      <StaticRouter location="/">
        <LoginPage />
      </StaticRouter>
    </Provider>
  );
  const password = await loginpage.findByLabelText("Password");
  expect(password).toBeTruthy();
  loginpage.unmount();
});

test("contains a login button", async () => {
  const loginpage = render(
    <Provider store={store}>
      <StaticRouter location="/">
        <LoginPage />
      </StaticRouter>
    </Provider>
  );
  const button = await loginpage.findByTestId("login-button");
  expect(button).toBeTruthy();
  loginpage.unmount();
});