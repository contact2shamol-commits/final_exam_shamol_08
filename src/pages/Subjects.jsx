import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import BookCard from "../components/BookCard";

const Subjects = () => {
  const subjects = [
    "fiction",
    "science",
    "history",
    "biography",
    "fantasy",
    "mystery",
  ];

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState("");

  const loadSubject = async (subject) => {
    setActiveSubject(subject);
    setLoading(true);

    const res = await fetch(
      `https://openlibrary.org/subjects/${subject}.json?limit=12`
    );
    const data = await res.json();
    setBooks(data.works || []);

    setLoading(false);
  };

  return (
    <div className="p-3">
      <h2 className="mb-3">Browse by Subject</h2>

      {/* Subject buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => loadSubject(sub)}
            style={{
              padding: "6px 14px",
              borderRadius: "4px",
              border: "1px solid #0d6efd",
              backgroundColor: activeSubject === sub ? "#0d6efd" : "#fff",
              color: activeSubject === sub ? "#fff" : "#0d6efd",
              cursor: "pointer",
            }}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p>Loading books...</p>
        </div>
      )}

      {/* Cards with 1 inch side gap */}
      <div
        style={{
          paddingLeft: "96px",   // 1 inch
          paddingRight: "96px",  // 1 inch
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
