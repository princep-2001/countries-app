"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { logout } from "../store/authSlice";
import {
  fetchCountries,
  loadMoreCountries,
  setSelectedRegion,
} from "../store/countriesSlice";
import type { RootState } from "../store/store";
import "./CountriesPage.scss";

export default function CountriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    countries,
    filteredCountries,
    displayedCountries,
    selectedRegion,
    loading,
  } = useSelector((state: RootState) => state.countries);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const regions = [
    { key: "All", label: "All" },
    { key: "Africa", label: "Africa" },
    { key: "Americas", label: "Americas" },
    { key: "Asia", label: "Asia" },
    { key: "Europe", label: "Europe" },
    { key: "Oceania", label: "Oceania" },
  ];

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries() as any);
    }
  }, [dispatch, countries.length]);

  const handleRegionChange = (region: string) => {
    dispatch(setSelectedRegion(region));
    setShowMobileMenu(false);
  };

  const handleLoadMore = () => {
    dispatch(loadMoreCountries());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slides = [
    { icon: "🌍", text: "Explore Countries" },
    { icon: "🗺️", text: "Discover Regions" },
    { icon: "🌎", text: "Learn About Cultures" },
  ];

  return (
    <Container fluid className="app-container">
      <Navbar bg="white" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand className="brand-title">Countries</Navbar.Brand>

          <div className="nav-links-desktop">
            <Nav className="custom-nav">
              {regions.map((region) => (
                <Nav.Link
                  key={region.key}
                  className={`nav-link-custom ${
                    selectedRegion === region.key ? "active" : ""
                  }`}
                  onClick={() => handleRegionChange(region.key)}
                >
                  {region.label}
                </Nav.Link>
              ))}
            </Nav>
          </div>

          <Button
            variant="outline-secondary"
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FaBars />
          </Button>
        </Container>
      </Navbar>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Container>
            <div className="mobile-button-group">
              {regions.map((region) => (
                <Button
                  key={region.key}
                  variant={
                    selectedRegion === region.key ? "dark" : "outline-secondary"
                  }
                  size="sm"
                  className="mobile-region-btn"
                  onClick={() => handleRegionChange(region.key)}
                >
                  {region.label}
                </Button>
              ))}
            </div>
          </Container>
        </div>
      )}

      <Container>
        <div className="content-wrapper">
          <div className="welcome-header">
            <hr className="divider" />
            <h1 className="welcome-title">WELCOME</h1>
            <hr className="divider" />
          </div>

          <Row className="justify-content-center intro-card-row">
            <Col lg={8} md={10}>
              <Card className="intro-card">
                <Card.Body className="intro-card-body">
                  <div className="intro-slide">
                    <div className="text-center">
                      <div className="intro-icon">
                        {slides[currentSlide].icon}
                      </div>
                      <p className="intro-text">{slides[currentSlide].text}</p>
                    </div>
                  </div>

                  <div className="carousel-controls">
                    <div className="carousel-nav">
                      <FaArrowLeft size={12} onClick={prevSlide} />
                      <div className="carousel-dots">
                        {[0, 1, 2].map((index) => (
                          <Button
                            key={index}
                            variant={
                              currentSlide === index ? "dark" : "secondary"
                            }
                            size="sm"
                            className="dot"
                            onClick={() => goToSlide(index)}
                          />
                        ))}
                      </div>
                      <FaArrowRight size={12} onClick={nextSlide} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="countries-row">
            {displayedCountries.map((country, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="country-card">
                  <Card.Body className="country-card-body">
                    <div className="country-info">
                      <div className="flag-wrapper">
                        <img
                          src={country.flag || "/placeholder.svg"}
                          alt={`${country.name} flag`}
                          className="flag-img"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.svg?height=36&width=48";
                          }}
                        />
                      </div>
                      <div className="country-details">
                        <Card.Title className="country-name">
                          {country.name}
                        </Card.Title>
                        <Card.Text className="country-region">
                          {country.region}
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {displayedCountries.length < filteredCountries.length && (
            <div className="load-more-wrapper">
              <Button
                variant="dark"
                size="lg"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}

          <div className="logout-wrapper">
            <Button variant="outline-danger" size="lg" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Footer copyRight={true} />
        </div>
      </Container>
    </Container>
  );
}
