import React, { useEffect, useMemo, useState } from "react";

function isNonEmpty(s) {
  return String(s ?? "").trim().length > 0;
}

export default function ExpenseModal({
  title,
  open,
  onClose,
  onSave,
  initialValue,
  saveLabel,
  mode = "add" // "add" | "edit"
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!open) return;
    // Clone to avoid mutating parent objects
    setForm(initialValue ? { ...initialValue } : null);
  }, [open, initialValue]);

  // IMPORTANT:
  // - In "add" mode, ID can be empty (we auto-generate in Tracker if missing)
  // - In "edit" mode, ID must exist and is read-only
  const canSave = useMemo(() => {
    if (!form) return false;

    const baseOk =
      isNonEmpty(form.name) &&
      isNonEmpty(form.category) &&
      String(form.amount).trim() !== "" &&
      !Number.isNaN(Number(form.amount)) &&
      isNonEmpty(form.date);

    if (mode === "edit") return baseOk && isNonEmpty(form.id);
    return baseOk;
  }, [form, mode]);

  if (!open) return null;

  function update(k, v) {
    setForm((prev) => ({ ...(prev || {}), [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form) return;

    onSave({
      ...form,
      id: String(form.id || "").trim(), // optional for add; required for edit
      name: String(form.name || "").trim(),
      category: String(form.category || "").trim(),
      amount: Number(form.amount || 0),
      notes: String(form.notes || ""),
      date: String(form.date || "").slice(0, 10),
      reconciled: !!form.reconciled
    });
  }

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content soft-card border-0">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>

            <form onSubmit={submit}>
              <div className="modal-body">
                {!form ? (
                  <div className="text-muted">Preparing form…</div>
                ) : (
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">ID {mode === "add" ? "(auto if empty)" : ""}</label>
                      <input
                        className="form-control"
                        value={form.id ?? ""}
                        onChange={(e) => update("id", e.target.value)}
                        placeholder={mode === "add" ? "Leave blank to auto-generate" : ""}
                        disabled={mode === "edit"} // read-only on edit
                      />
                      {mode === "edit" ? (
                        <div className="form-text">ID cannot be changed.</div>
                      ) : (
                        <div className="form-text">Optional for new expenses.</div>
                      )}
                    </div>

                    <div className="col-md-8">
                      <label className="form-label">Expense Name</label>
                      <input
                        className="form-control"
                        value={form.name ?? ""}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="e.g., Lunch meeting"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <input
                        className="form-control"
                        value={form.category ?? ""}
                        onChange={(e) => update("category", e.target.value)}
                        placeholder="e.g., Food / Transport / Utilities"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Amount</label>
                      <input
                        className="form-control"
                        type="number"
                        step="0.01"
                        value={form.amount ?? ""}
                        onChange={(e) => update("amount", e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Date</label>
                      <input
                        className="form-control"
                        type="date"
                        value={String(form.date || "").slice(0, 10)}
                        onChange={(e) => update("date", e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Notes (optional)</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={form.notes ?? ""}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Add extra details (optional)"
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="reconciledSwitch"
                          checked={!!form.reconciled}
                          onChange={(e) => update("reconciled", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="reconciledSwitch">
                          Reconciled?
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!canSave}>
                  {saveLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop WITHOUT click handler (prevents accidental blocking/capture issues) */}
      <div className="modal-backdrop fade show" />
    </>
  );
}
