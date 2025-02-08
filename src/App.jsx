import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPageLayout from "./auth/AuthPageLayout";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import Master from "./router/Master";
import { ThemeProvider } from "./context/Theme-Provider";


function App() {


  return (
    <ThemeProvider defaultTheme="light">
    <Router hashType="noslash">
          <Routes>
          <Route path="/" element={<AuthPageLayout form={<LoginForm />} />} />
            <Route path="/signup" element={<AuthPageLayout form={<SignUpForm />} />} />
            <Route path="/*" element={<Master />} />
          </Routes>
        </Router>
        </ThemeProvider>
  )
}

export default App
