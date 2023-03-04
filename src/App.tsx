import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Router } from "./Router";
import ThemeContextProvider from "./context/ThemeContext";

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
