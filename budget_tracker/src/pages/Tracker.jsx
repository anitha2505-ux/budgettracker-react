import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { expensesAtom, flashAtom } from "../store.js";
import ExpenseCard from "../components/ExpenseCard.jsx";
import ExpenseModal from "../components/ExpenseModal.jsx";
import DeleteConfirmModal from "../components/DeleteConfirmModal.jsx";

// This line defines a constant key name used to store and retrieve expense data from localStorage
const STORAGE_KEY = "infinix_expenses_v1";

/* This function generates a random 4-digit number and prefixes it with "EXP-" to create a unique-looking expense ID (for example, EXP-4821).
It is used to automatically assign an ID when a new expense is added and the user does not provide one. */

function makeId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `EXP-${n}`;
}

// safely converts a JSON string into a JavaScript object.
// If the JSON is valid, it returns the parsed object
// If the JSON is invalid or corrupted, it returns null instead of crashing the app
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Tracker() {
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const setFlash = useSetAtom(flashAtom);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Bootstrap delete confirmation modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Prefill once (localStorage -> else expense.json)
  // This useEffect initialises the expense data when the Tracker page loads.
  useEffect(() => {
    const cached = safeParse(localStorage.getItem(STORAGE_KEY) || "");
    if (Array.isArray(cached) && cached.length > 0) {
      setExpenses(cached);
      return;
    }

    setLoading(true);
    axios
      .get("/expense.json")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setExpenses(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      })
      .catch(() => {
        setFlash({ type: "danger", message: "Failed to load expense.json. Please check public/expense.json" });
        setExpenses([]);
      })
      .finally(() => setLoading(false));
  }, [setExpenses, setFlash]);

  // Persist changes
  // synchronises the expense state with localStorage, ensuring data persistence whenever the expenses array changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // It derives computed data from state, not stored data. Calculates total amount, reconciled expenses, count of expenses from [expenses]
  const totals = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const reconciled = expenses.filter((e) => e.reconciled).length;
    return { total, reconciled, count: expenses.length };
  }, [expenses]);

  // Cleans and normalises user input, Creates a valid expense object, Adds it to global state
// Shows a success message, Closes the modal
  function onAddSave(payload) {
    const next = {
      ...payload,
      id: payload.id?.trim() || makeId(),
      name: String(payload.name || "").trim(),
      category: String(payload.category || "").trim(),
      amount: Number(payload.amount || 0),
      notes: String(payload.notes || ""),
      date: String(payload.date || "").slice(0, 10),
      reconciled: !!payload.reconciled
    };
    // The spread operator (...) is used to copy and expand: arrays, objects
    setExpenses((prev) => [next, ...prev]);
    setFlash({ type: "success", message: "Expense added successfully." });
    setAddOpen(false);
  }

  function onEdit(expense) {
    setEditing(expense);
    setEditOpen(true);
  }

  function onEditSave(payload) {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === payload.id
          ? {
              ...payload,
              id: e.id,
              amount: Number(payload.amount || 0),
              reconciled: !!payload.reconciled
            }
          : e
      )
    );
    setFlash({ type: "success", message: "Expense updated successfully." });
    setEditOpen(false);
    setEditing(null);
  }

  // Open bootstrap delete confirmation modal
  function requestDelete(expense) {
    setDeleting(expense);
    setDeleteOpen(true);
  }

  // Confirm delete (after modal confirm button)
  function confirmDelete() {
    if (!deleting) return;

    setExpenses((prev) => prev.filter((e) => e.id !== deleting.id));
    setFlash({ type: "success", message: "Expense deleted successfully." });

    setDeleteOpen(false);
    setDeleting(null);
  }

  function onToggleReconciled(id, nextVal) {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, reconciled: nextVal } : e)));
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="soft-card bg-white p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h2 className="fw-bold mb-1">Tracker</h2>
            <div className="text-muted">Add, edit, delete, reconcile, and flip cards to view notes.</div>
          </div>

          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-md-end">
            <span className="badge text-bg-light border">
              Records: <span className="fw-semibold">{totals.count}</span>
            </span>
            <span className="badge text-bg-light border">
              Reconciled: <span className="fw-semibold">{totals.reconciled}</span>
            </span>
            <span className="badge text-bg-light border">
              Total: <span className="fw-semibold">${totals.total.toFixed(2)}</span>
            </span>

            <button className="btn btn-primary ms-md-2" onClick={() => setAddOpen(true)}>
              + Add New Expense
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="soft-card bg-white p-4 text-center">
          <div className="spinner-border" role="status" aria-label="Loading" />
          <div className="text-muted mt-2">Loading expenses…</div>
        </div>
      ) : expenses.length === 0 ? (
        <div className="soft-card bg-white p-4 text-center">
          <h5 className="fw-semibold mb-1">No expenses found</h5>
          <p className="text-muted mb-3">Add a new expense to begin tracking.</p>
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            Add Expense
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {expenses.map((e) => (
            <div className="col-12 col-md-6 col-xl-4" key={e.id}>
              <ExpenseCard
                expense={e}
                onEdit={() => onEdit(e)}
                onDelete={() => requestDelete(e)}   // use modal
                onToggleReconciled={onToggleReconciled}
              />
            </div>
          ))}
        </div>
      )}

      {/* ADD */}
      <ExpenseModal
        title="Add New Expense"
        mode="add"
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={onAddSave}
        initialValue={{
          id: "",
          name: "",
          category: "",
          amount: "",
          notes: "",
          date: new Date().toISOString().slice(0, 10),
          reconciled: false
        }}
        saveLabel="Add Expense"
      />

      {/* EDIT */}
      <ExpenseModal
        title="Edit Expense"
        mode="edit"
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setEditing(null);
        }}
        onSave={onEditSave}
        initialValue={editing || null}
        saveLabel="Save Changes"
      />

      {/* DELETE CONFIRM (Bootstrap Modal) */}
      <DeleteConfirmModal
        open={deleteOpen}
        expense={deleting}
        onClose={() => {
          setDeleteOpen(false);
          setDeleting(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
