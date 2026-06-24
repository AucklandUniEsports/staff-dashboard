"use client";

import { useState } from "react";
import StandardButton from "./StandardButton";

type CategoryTagProps =
  | {
      name: string;
      htmlFor: string;
      onDelete?: never;
      onEdit?: never;
    }
  | {
      name: string;
      htmlFor?: undefined;
      onDelete?: () => void;
      onEdit?: (newName: string) => void;
    };

export default function CategoryTag({ name, htmlFor, onDelete, onEdit }: CategoryTagProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  if (htmlFor) {
    return <label className="category-tag" htmlFor={htmlFor}>{name}</label>;
  }

  if (isEditing) {
    return (
      <li className="category-tag" style={{ width: "100%", gap: "8px", alignItems: "center" }}>
        <input
          className="input-field"
          style={{ margin: 0, flex: 1 }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
        />
        <div className="button-small" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <StandardButton
            title="Save."
            color="grey"
            onClick={() => { onEdit?.(editValue); setIsEditing(false); }}
          />
          <StandardButton
            title="Cancel."
            color="grey"
            onClick={() => { setEditValue(name); setIsEditing(false); }}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="category-tag" style={{ width: "100%", gap: "8px", justifyContent: "space-between" }}>
      <p>{name}</p>
      {(onEdit || onDelete) && (
        <div className="button-small" style={{ display: "flex", gap: "8px" }}>
          {onEdit && (
            <StandardButton title="Edit." color="grey" onClick={() => setIsEditing(true)} />
          )}
          {onDelete && (
            <StandardButton title="Delete." color="red" onClick={onDelete} />
          )}
        </div>
      )}
    </li>
  );
}
