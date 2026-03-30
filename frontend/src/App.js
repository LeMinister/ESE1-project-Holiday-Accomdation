import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookProperty from "./pages/BookProperty";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header /> {/* stays ALWAYS visible */}

      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route
          path="/"
          element={

              <Home />

          }
        />

        <Route
          path="/book"
          element={

              <BookProperty />

          }
        />
      </Routes>
    </Router>
  );
}

export default App;