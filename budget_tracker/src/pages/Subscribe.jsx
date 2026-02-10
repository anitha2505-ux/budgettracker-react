import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { flashAtom } from "../store.js";

export default function Subscribe() {
  const setFlash = useSetAtom(flashAtom);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setFlash({ type: "warning", message: "Please enter a valid email address." });
      return;
    }
    setFlash({ type: "success", message: "Subscription successful. Thank you for subscribing!" });
    setEmail("");
    setName("");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <div className="soft-card p-4 p-md-5 bg-white">
          <h2 className="fw-bold mb-2">Subscribe</h2>
          <p className="text-muted mb-4">
            Get updates on new features, reconciliation enhancements, and productivity tips.
          </p>

          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="consent" defaultChecked />
                <label className="form-check-label" htmlFor="consent">
                  I agree to receive product updates.
                </label>
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setEmail("");
                  setName("");
                  setFlash({ type: "info", message: "Form cleared." });
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
