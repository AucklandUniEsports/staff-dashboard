"use client";

import StandardButton from "./StandardButton";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="popup" onClick={onCancel}>
      <div
        style={{
          background: "#272727",
          borderRadius: "5px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "360px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ color: "white", margin: 0 }}>{message}</p>
        <div style={{ display: "flex", gap: "8px" }}>
          <StandardButton title="Delete." color="red" onClick={onConfirm} />
          <StandardButton title="Cancel." color="grey" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}
