import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { flashAtom } from "../store.js";

export default function FlashBar() {
  const [flash, setFlash] = useAtom(flashAtom);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2600);
    return () => clearTimeout(t);
  }, [flash, setFlash]);

  if (!flash) return null;

  return (
    <div className="flash-wrap bg-transparent">
      <div className="container py-2">
        <div className={`alert alert-${flash.type} mb-0 soft-card`} role="alert">
          {flash.message}
        </div>
      </div>
    </div>
  );
}
