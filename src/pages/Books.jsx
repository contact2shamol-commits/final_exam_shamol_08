import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import BookCard from "../components/BookCard";

const Books = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!title && !author && !subject) return;
    
    setLoading(true);
    setBooks([]);

    let url = "https://openlibrary.org/search.json?";

    if (title) url += `title=${encodeURIComponent(title)}&`;
    if (author) url += `author=${encodeURIComponent(author)}&`;
    if (subject) url += `subject=${encodeURIComponent(subject)}&`;

    url += `limit=${limit}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setTitle("");
    setAuthor("");
    setSubject("");
    setBooks([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  return (
    <div 
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        paddingBottom: "3rem"
      }}
    >
      {/* Hero Section */}
      <div 
        className="position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(99, 102, 241, 0.8) 100%)",
          padding: "6rem 0 8rem 0",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          marginBottom: "-4rem"
        }}
      >
        {/* Background Pattern */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Container className="position-relative z-1">
          <div className="text-center">
            <div className="d-inline-block rounded-circle p-3 mb-4"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              <svg width="60" height="60" fill="white" viewBox="0 0 16 16">
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
              </svg>
            </div>
            <h1 
              className="display-3 fw-bold text-white mb-3"
              style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
            >
              Digital Library
            </h1>
            <p 
              className="fs-4 text-white opacity-75 mb-0 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Explore millions of books from the world's largest digital library
            </p>
          </div>
        </Container>
      </div>

      <Container className="position-relative z-2">
        {/* Search Card */}
        <Card 
          className="border-0 shadow-lg mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            marginTop: "-6rem"
          }}
        >
          <Card.Body className="p-4 p-lg-5">
            <div className="d-flex align-items-center mb-4">
              <div className="rounded-circle p-3 me-3"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)"
                }}
              >
                <svg width="28" height="28" fill="white" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white fw-bold mb-1">Advanced Search</h3>
                <p className="text-light opacity-75 mb-0">Refine your search with multiple criteria</p>
              </div>
            </div>

            <Form onKeyPress={handleKeyPress}>
              <Row className="g-3 g-lg-4">
                <Col lg={3} md={6}>
                  <Form.Group>
                    <Form.Label className="text-light fw-semibold mb-2 d-flex align-items-center">
                      <svg width="20" height="20" fill="#3b82f6" className="me-2" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      Book Title
                    </Form.Label>
                    <Form.Control
                      placeholder="Search by title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-0 py-3 px-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                      onBlur={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={6}>
                  <Form.Group>
                    <Form.Label className="text-light fw-semibold mb-2 d-flex align-items-center">
                      <svg width="20" height="20" fill="#10b981" className="me-2" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </svg>
                      Author
                    </Form.Label>
                    <Form.Control
                      placeholder="Search by author..."
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="border-0 py-3 px-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important"
                      }}
                      onFocus={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                      onBlur={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={6}>
                  <Form.Group>
                    <Form.Label className="text-light fw-semibold mb-2 d-flex align-items-center">
                      <svg width="20" height="20" fill="#8b5cf6" className="me-2" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                      Category
                    </Form.Label>
                    <Form.Select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border-0 py-3 px-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important",
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%238b5cf6' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center"
                      }}
                    >
                      <option value="" className="text-dark">All Categories</option>
                      <option value="fiction" className="text-dark">📖 Fiction</option>
                      <option value="science" className="text-dark">🔬 Science</option>
                      <option value="history" className="text-dark">🏛️ History</option>
                      <option value="biography" className="text-dark">👤 Biography</option>
                      <option value="fantasy" className="text-dark">🧙 Fantasy</option>
                      <option value="mystery" className="text-dark">🔍 Mystery</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={3} md={6}>
                  <Form.Group>
                    <Form.Label className="text-light fw-semibold mb-2 d-flex align-items-center">
                      <svg width="20" height="20" fill="#f59e0b" className="me-2" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                      </svg>
                      Results
                    </Form.Label>
                    <Form.Select
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      className="border-0 py-3 px-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important",
                        cursor: "pointer"
                      }}
                    >
                      <option value={10} className="text-dark">10 per page</option>
                      <option value={20} className="text-dark">20 per page</option>
                      <option value={30} className="text-dark">30 per page</option>
                      <option value={50} className="text-dark">50 per page</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                <Button 
                  onClick={searchBooks} 
                  disabled={loading || (!title && !author && !subject)}
                  className="px-4 py-3 fw-semibold border-0 rounded-pill d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                      Search Library
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline-light"
                  onClick={clearSearch}
                  className="px-4 py-3 fw-semibold rounded-pill d-flex align-items-center gap-2"
                  style={{
                    backdropFilter: "blur(10px)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                  Clear Filters
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-5 my-5">
            <div className="position-relative mb-4">
              <div className="spinner-border text-primary" 
                style={{ 
                  width: "80px", 
                  height: "80px",
                  borderWidth: "4px"
                }} 
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-purple" 
                  style={{ 
                    width: "60px", 
                    height: "60px",
                    borderWidth: "3px"
                  }} 
                />
              </div>
            </div>
            <h4 className="text-white fw-semibold mb-2">Searching Digital Library</h4>
            <p className="text-light opacity-75 mb-0">Querying millions of records...</p>
            <div className="mt-4 d-flex justify-content-center">
              <div className="me-2">
                <div className="spinner-grow spinner-grow-sm text-blue" />
              </div>
              <div className="me-2">
                <div className="spinner-grow spinner-grow-sm text-purple" />
              </div>
              <div>
                <div className="spinner-grow spinner-grow-sm text-teal" />
              </div>
            </div>
          </div>
        ) : books.length > 0 ? (
          <>
            {/* Results Header */}
            <div 
              className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4 p-4 rounded-3"
              style={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div>
                <h3 className="text-white fw-bold mb-2 d-flex align-items-center">
                  <div className="rounded-circle p-2 me-3"
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
                    }}
                  >
                    <svg width="24" height="24" fill="white" viewBox="0 0 16 16">
                      <path d="M8 16a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-1 0v15a.5.5 0 0 0 .5.5z"/>
                      <path d="M8 1a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                  </div>
                  Search Results: {books.length} {books.length === 1 ? "Book" : "Books"} Found
                </h3>
                <p className="text-light opacity-75 mb-0 ps-5">
                  Displaying {Math.min(books.length, limit)} of {books.length} matching records
                </p>
              </div>
              <div 
                className="mt-3 mt-lg-0 px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <span className="text-white fw-semibold">{Math.min(books.length, limit)}</span>
                <span className="text-light opacity-75 ms-1">results per page</span>
              </div>
            </div>

            {/* Books Grid */}
            <div className="row g-4">
              {books.map((book, index) => (
                <div key={`${book.key}-${index}`} className="col-xl-3 col-lg-4 col-md-6">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </>
        ) : title || author || subject ? (
          <div 
            className="text-center py-5 my-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className="position-relative mb-4">
              <div className="rounded-circle p-4 mx-auto"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  width: "120px",
                  height: "120px"
                }}
              >
                <svg width="60" height="60" fill="#ef4444" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-3">No Books Found</h3>
            <p className="text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: "500px" }}>
              Your search criteria didn't match any books in our database. Try adjusting your filters or browse by category.
            </p>
            <Button 
              onClick={clearSearch}
              className="px-4 py-3 fw-semibold rounded-pill d-flex align-items-center gap-2 mx-auto"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                border: "none",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
              Reset Search
            </Button>
          </div>
        ) : (
          <div 
            className="text-center py-5 my-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className="position-relative mb-4">
              <div className="rounded-circle p-4 mx-auto"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  width: "120px",
                  height: "120px"
                }}
              >
                <svg width="60" height="60" fill="#3b82f6" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-3">Start Your Exploration</h3>
            <p className="text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: "500px" }}>
              Use the search tools above to discover books by title, author, or category. Our database contains millions of records from Open Library.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button 
                onClick={() => setSubject("fiction")}
                className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#93c5fd"
                }}
              >
                📖 Fiction
              </Button>
              <Button 
                onClick={() => setSubject("science")}
                className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#a7f3d0"
                }}
              >
                🔬 Science
              </Button>
              <Button 
                onClick={() => setSubject("history")}
                className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                  background: "rgba(245, 158, 11, 0.2)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fcd34d"
                }}
              >
                🏛️ History
              </Button>
            </div>
          </div>
        )}
      </Container>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem !important;
          }
          
          .container > .card {
            margin-top: -4rem !important;
          }
        }
        
        .text-blue { color: #3b82f6 !important; }
        .text-purple { color: #8b5cf6 !important; }
        .text-teal { color: #06b6d4 !important; }
        
        input::placeholder, select option {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        select {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        select option {
          background-color: #1e293b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Books;