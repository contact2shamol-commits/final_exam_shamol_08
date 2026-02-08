import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error("Book not found");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
        }}
      >
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
        <h4 className="text-white fw-semibold mb-2">Loading Book Details</h4>
        <p className="text-light opacity-75 mb-0">Retrieving comprehensive information...</p>
        <div className="mt-4 d-flex">
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
    );
  }

  if (error || !book) {
    return (
      <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
        <div className="position-relative mb-4">
          <div className="rounded-circle bg-dark-blue p-4 shadow-lg">
            <div className="fs-1 text-white">📚</div>
          </div>
          <div className="position-absolute top-0 end-0 translate-middle">
            <div className="rounded-circle bg-danger p-2">
              <div className="fs-5 text-white">❌</div>
            </div>
          </div>
        </div>
        <h2 className="text-white fw-bold mb-3">Book Not Found</h2>
        <p className="text-light opacity-75 text-center mb-4" style={{ maxWidth: "500px" }}>
          The requested book could not be retrieved from our database.
        </p>
        <Button 
          variant="primary"
          onClick={() => navigate("/books")}
          className="px-4 py-2 fw-semibold rounded-pill"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            border: "none",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          ← Return to Library
        </Button>
      </Container>
    );
  }

  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  const getAuthors = () => {
    if (book.authors) {
      return book.authors.map(author => 
        author.author?.name || author.name || 'Unknown Author'
      );
    }
    return [];
  };

  const getDescription = () => {
    if (book.description) {
      if (typeof book.description === 'string') {
        return book.description;
      } else if (book.description.value) {
        return book.description.value;
      }
    }
    return "A comprehensive description is not available for this edition.";
  };

  return (
    <div 
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      }}
    >
      {/* Navigation Bar */}
      <div className="py-3 border-bottom border-dark">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline-light rounded-pill px-4 py-2 d-flex align-items-center gap-2"
              style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateX(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Back to Results
            </button>
            
            <div className="text-light opacity-75 fw-medium">
              Book ID: <span className="text-info">{id}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-4 py-lg-5">
        {/* Main Content */}
        <div className="row g-4">
          {/* Cover Column */}
          <div className="col-lg-5 col-xl-4">
            <Card 
              className="border-0 shadow-lg overflow-hidden h-100"
              style={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div className="position-relative p-4 p-lg-5">
                {coverUrl ? (
                  <div className="position-relative">
                    <img
                      src={coverUrl}
                      alt={book.title}
                      className="img-fluid rounded-3 shadow-lg w-100"
                      style={{
                        aspectRatio: "2/3",
                        objectFit: "cover"
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <div className="bg-primary rounded-circle p-2 shadow">
                        <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm11.666 1.89c.682 0 1.139.47 1.187 1.107H14v-.11c0-.944-.789-1.76-1.834-1.76-1.094 0-1.834.742-1.834 1.667 0 .824.835 1.358 1.43 1.358.486 0 .906-.276 1.025-.636h.046c.01.647-.504 1.168-1.203 1.168-.681 0-1.186-.397-1.186-1.058 0-.658.387-.882 1.186-.882zm-4.666-.662c.49 0 .855.373.989.745h.03c-.118-1.074-1.061-1.764-2.01-1.764C4.515 4.01 3.5 4.99 3.5 6.25c0 1.08.889 1.764 2.105 1.764.813 0 1.512-.438 1.964-1.178h.059c.171.828.997 1.178 1.518 1.178 1.11 0 1.954-.757 1.954-1.785 0-.81-.547-1.326-1.168-1.326-.572 0-1.025.367-1.188.865h-.032c-.148-.72-.705-1.086-1.312-1.086-.707 0-1.224.44-1.5 1.184h-.057c-.16-.832-.728-1.184-1.45-1.184-.9 0-1.602.748-1.602 1.599 0 .787.511 1.312 1.106 1.312.49 0 .889-.245 1.078-.64h.059c.149.574.692.898 1.306.898.655 0 1.131-.435 1.131-1.085 0-.725-.62-1.002-1.118-1.002z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center rounded-3 shadow-lg"
                    style={{
                      aspectRatio: "2/3",
                      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                    }}
                  >
                    <div className="fs-1 mb-3 text-white">📖</div>
                    <div className="text-white fw-medium text-center px-3">
                      Cover Art Unavailable
                    </div>
                  </div>
                )}
                
                {/* Edition Badge */}
                <div className="mt-4 text-center">
                  <Badge 
                    pill 
                    className="px-3 py-2 fw-medium"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                      border: "1px solid rgba(99, 102, 241, 0.3)",
                      color: "#c7d2fe",
                      fontSize: "0.85rem"
                    }}
                  >
                    <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z"/>
                      <path d="M8 11.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5zM8 6.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/>
                    </svg>
                    Open Library Edition
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Details Column */}
          <div className="col-lg-7 col-xl-8">
            <div className="d-flex flex-column h-100">
              {/* Title Section */}
              <div className="mb-4">
                <h1 className="text-white fw-bold mb-2 display-5">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <h3 className="text-light opacity-75 fw-normal fs-4 mb-0">
                    {book.subtitle}
                  </h3>
                )}
              </div>

              {/* Author Section */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="rounded-circle p-2"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
                    }}
                  >
                    <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                  </div>
                  <h5 className="text-light mb-0 fw-semibold">Author{getAuthors().length > 1 ? 's' : ''}</h5>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {getAuthors().map((author, index) => (
                    <Badge 
                      key={index}
                      pill
                      className="px-3 py-2 fw-medium"
                      style={{
                        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                        color: "#a5f3fc",
                        fontSize: "0.9rem"
                      }}
                    >
                      {author}
                    </Badge>
                  ))}
                  {getAuthors().length === 0 && (
                    <Badge 
                      pill
                      className="px-3 py-2 fw-medium"
                      style={{
                        background: "rgba(148, 163, 184, 0.2)",
                        border: "1px solid rgba(148, 163, 184, 0.3)",
                        color: "#cbd5e1"
                      }}
                    >
                      Author information unavailable
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <Card className="border-0 h-100"
                    style={{
                      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
                      backdropFilter: "blur(10px)",
                      borderLeft: "4px solid #3b82f6"
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle p-2" style={{ background: "rgba(59, 130, 246, 0.2)" }}>
                          <svg width="20" height="20" fill="#3b82f6" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-light opacity-75 small">First Published</div>
                          <div className="text-white fw-bold">
                            {book.first_publish_date || "Not Available"}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-4">
                  <Card className="border-0 h-100"
                    style={{
                      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
                      backdropFilter: "blur(10px)",
                      borderLeft: "4px solid #10b981"
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle p-2" style={{ background: "rgba(16, 185, 129, 0.2)" }}>
                          <svg width="20" height="20" fill="#10b981" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-light opacity-75 small">Total Pages</div>
                          <div className="text-white fw-bold">
                            {book.number_of_pages ? `${book.number_of_pages} pages` : "Not Specified"}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-4">
                  <Card className="border-0 h-100"
                    style={{
                      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
                      backdropFilter: "blur(10px)",
                      borderLeft: "4px solid #f59e0b"
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle p-2" style={{ background: "rgba(245, 158, 11, 0.2)" }}>
                          <svg width="20" height="20" fill="#f59e0b" viewBox="0 0 16 16">
                            <path d="M2.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-light opacity-75 small">Publishers</div>
                          <div className="text-white fw-bold">
                            {book.publishers?.slice(0, 2).join(', ') || "Information Unavailable"}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="rounded-circle p-2"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)"
                    }}
                  >
                    <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </div>
                  <h5 className="text-light mb-0 fw-semibold">Synopsis</h5>
                </div>
                <Card className="border-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="text-light opacity-90 line-clamp-4" style={{ lineHeight: "1.7" }}>
                      {getDescription()}
                    </div>
                  </Card.Body>
                </Card>
              </div>

              {/* Subjects */}
              {book.subjects && (
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle p-2"
                      style={{
                        background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
                      }}
                    >
                      <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                    </div>
                    <h5 className="text-light mb-0 fw-semibold">Subjects & Genres</h5>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {book.subjects.slice(0, 12).map((subject, index) => (
                      <Badge 
                        key={index}
                        pill
                        className="px-3 py-2 fw-medium"
                        style={{
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          color: "#a7f3d0",
                          fontSize: "0.85rem"
                        }}
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto pt-4">
                <div className="d-flex flex-wrap gap-3">
                  <Button 
                    variant="primary"
                    onClick={() => window.open(`https://openlibrary.org/works/${id}`, '_blank')}
                    className="px-4 py-3 fw-semibold rounded-pill d-flex align-items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      border: "none",
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
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                    View Full Details on Open Library
                  </Button>
                  
                  <Button 
                    variant="outline-light"
                    onClick={() => navigate("/books")}
                    className="px-4 py-3 fw-semibold rounded-pill d-flex align-items-center gap-2"
                    style={{
                      backdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    Explore More Books
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .display-5 {
            font-size: 2.5rem !important;
          }
          
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .text-blue { color: #3b82f6 !important; }
        .text-purple { color: #8b5cf6 !important; }
        .text-teal { color: #06b6d4 !important; }
        .bg-dark-blue { background-color: #1e293b !important; }
      `}</style>
    </div>
  );
};

export default BookDetails;