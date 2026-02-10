import React from "react";

export default function DeleteConfirmModal({ open, onClose, onConfirm, expense }) {
  if (!open) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content soft-card border-0">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold">Confirm Delete</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <p className="mb-2">
                Are you sure you want to delete this expense?
              </p>

              <div className="p-3 bg-light border rounded-3">
                <div className="fw-semibold">{expense?.name || "—"}</div>
                <div className="text-muted small">ID: {expense?.id || "—"}</div>
                <div className="text-muted small">
                  Amount: ${Number(expense?.amount || 0).toFixed(2)}
                </div>
              </div>

              <div className="text-muted small mt-2">
                This action cannot be undone.
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={!expense}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
}
