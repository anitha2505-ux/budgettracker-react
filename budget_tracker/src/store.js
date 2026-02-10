import { atom } from "jotai";

export const expensesAtom = atom([]);

/**
 * { type: "success"|"danger"|"info"|"warning", message: string } | null
 */
export const flashAtom = atom(null);
