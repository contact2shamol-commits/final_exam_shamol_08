import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const coverId = book.cover_i || book.cover_id;

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=300&h=400&fit=crop";

  const workId = book.key?.split("/").pop();

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
      }}
    >
      {/* Image with gradient overlay */}
      <div
        style={{
          height: "220px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <img
          src={coverUrl}
          alt={book.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {!coverId && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            📖
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Title with gradient text */}
        <h5
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "12px",
            background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            minHeight: "3.2rem",
            lineHeight: "1.4",
          }}
        >
          {book.title}
        </h5>

        {/* Author with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <span style={{ marginRight: "8px", color: "#7e8c9a" }}>✍️</span>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#4a5568",
              margin: "0",
              flex: "1",
              lineHeight: "1.4",
            }}
          >
            {book.author_name?.join(", ") ||
              book.authors?.map((a) => a.name).join(", ") ||
              "Unknown Author"}
          </p>
        </div>

        {/* Year with icon */}
        {book.first_publish_year && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ marginRight: "8px", color: "#7e8c9a" }}>📅</span>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#718096",
                margin: "0",
              }}
            >
              Published: <strong>{book.first_publish_year}</strong>
            </p>
          </div>
        )}

        {/* Button container - always at bottom */}
        <div style={{ marginTop: "auto" }}>
          <Link
            to={`/book/${workId}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <button
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600",
                letterSpacing: "0.3px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>🔍</span>
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;