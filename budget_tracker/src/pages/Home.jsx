import React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="p-4 p-md-5 soft-card hero-grad">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="fw-bold display-6 mb-3">Track expenses with clarity — not clutter.</h1>
          <p className="text-muted mb-3">
            <span className="fw-semibold">Infinix Expense Tracker</span> helps you capture daily spending, reconcile
            entries, and maintain a clean audit trail. Designed to be fast, mobile-friendly, and professional.
          </p>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge text-bg-primary">Version 1.0</span>
            <span className="badge text-bg-light border">Expense Categories</span>
            <span className="badge text-bg-light border">Seamless Record Keeping</span>
            <span className="badge text-bg-light border">New Enhancements Weekly</span>
          </div>

          <ul className="text-muted mb-4">
            <li>Quick add and reconcile spending with a single toggle.</li>
            <li>User-friendly UI.</li>
            <li>Usable on the go.</li>
          </ul>

          <div className="d-flex gap-2">
            <Link className="btn btn-primary" href="/tracker">
              Open Tracker
            </Link>
            <Link className="btn btn-soft-primary" href="/subscribe">
              Subscribe for Updates
            </Link>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="soft-card p-4 bg-white">
            <div className="card-accent-bar rounded-3 mb-3" />
            <h5 className="fw-semibold mb-2">What you get</h5>
            <div className="d-grid gap-2">
              <div className="d-flex justify-content-between">
                <span className="text-muted">Expense records</span>
                <span className="fw-semibold">Organized</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Reconciliation</span>
                <span className="fw-semibold">One switch</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Notes</span>
                <span className="fw-semibold">Flip card</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">UI</span>
                <span className="fw-semibold">Responsive</span>
              </div>
            </div>

            <div className="mt-4">
              <small className="text-muted">
                Tip: Use <span className="fw-semibold">Tracker</span> to add, edit, delete, and reconcile expenses.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
