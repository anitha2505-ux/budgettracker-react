import React from "react";
import { Route, Switch, Link, useLocation } from "wouter";
import Home from "./pages/Home.jsx";
import Tracker from "./pages/Tracker.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import FlashBar from "./components/FlashBar.jsx";

function NavItem({ href, children }) {
  const [location] = useLocation();
  const isActive = location === href;
  return (
    <li className="nav-item">
      <Link className={`nav-link ${isActive ? "active fw-semibold" : ""}`} href={href}>
        {children}
      </Link>
    </li>
  );
}

export default function App() {
  return (
    <div className="min-vh-100 app-bg">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
            <span className="brand-dot" aria-hidden="true" />
            <span className="fw-bold">Infinix Expense Tracker</span>
            <span className="badge text-bg-light border ms-1">v1.0</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/tracker">Tracker</NavItem>
              <NavItem href="/subscribe">Subscribe</NavItem>
            </ul>
          </div>
        </div>
      </nav>

      <FlashBar />

      <main className="container py-4">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tracker" component={Tracker} />
          <Route path="/subscribe" component={Subscribe} />
          <Route>
            <div className="py-5 text-center">
              <h2 className="fw-bold">404</h2>
              <p className="text-muted mb-4">Page not found.</p>
              <Link className="btn btn-outline-primary" href="/">
                Go Home
              </Link>
            </div>
          </Route>
        </Switch>
      </main>

      <footer className="border-top bg-white">
        <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <small className="text-muted">
            © {new Date().getFullYear()} Infinix Expense Tracker.
          </small>
          <small className="text-muted">Professional, lightweight, and mobile-friendly.</small>
        </div>
      </footer>
    </div>
  );
}
