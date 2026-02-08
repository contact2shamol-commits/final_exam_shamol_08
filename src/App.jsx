import { Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Subjects from "./pages/Subjects";

function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
