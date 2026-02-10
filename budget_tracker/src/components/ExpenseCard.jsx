import React, { useMemo, useState } from "react";

export default function ExpenseCard({ expense, onEdit, onDelete, onToggleReconciled }) {
  const [flipped, setFlipped] = useState(false);

  const amountFmt = useMemo(() => {
    const n = Number(expense.amount || 0);
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [expense.amount]);

  const notesText = (expense.notes || "").trim();

  return (
    <div className="flip-wrap">
      <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="flip-face soft-card bg-white">
          <div className="card-accent-bar" />
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <div className="text-muted small">Expense</div>
                <h5 className="fw-semibold mb-1">{expense.name}</h5>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge text-bg-light border">{expense.category}</span>
                  <span className="badge text-bg-light border">ID: {expense.id}</span>
                </div>
              </div>

              <div className="text-end">
                <div className="text-muted small">Amount</div>
                <div className="fs-5 fw-bold">${amountFmt}</div>
              </div>
            </div>

            <hr className="my-3" />

            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`rec-${expense.id}`}
                  checked={!!expense.reconciled}
                  onChange={(e) => onToggleReconciled(expense.id, e.target.checked)}
                />
                <label className="form-check-label" htmlFor={`rec-${expense.id}`}>
                  Reconciled
                </label>
              </div>

              <button className="btn btn-sm btn-soft-primary" type="button" onClick={() => setFlipped(true)}>
                View Notes →
              </button>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-outline-primary btn-sm flex-grow-1" onClick={onEdit}>
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* BACK (FLIPPED) — Category + Reconciled REMOVED */}
        <div className="flip-face flip-back soft-card bg-white">
          <div className="card-accent-bar" />
          <div className="p-3 d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <div className="text-muted small">Notes</div>
                <h6 className="fw-semibold mb-1">{expense.name}</h6>
                <div className="text-muted small">Date: {expense.date || "—"}</div>
              </div>

              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setFlipped(false)}>
                ← Back
              </button>
            </div>

            <div className="mt-3 flex-grow-1">
              <div className="p-3 bg-light rounded-3 border">
                {notesText ? notesText : <span className="text-muted">No notes provided.</span>}
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <span className="badge text-bg-light border">ID: {expense.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
