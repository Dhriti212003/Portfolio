import { useState } from "react";
import { COLLECTION_STATES, START_ITEMS } from "../data.js";

export default function CollectionDemo() {
  const [items, setItems] = useState(START_ITEMS);
  const [filter, setFilter] = useState("all");

  const countOf = (state) => items.filter((i) => i.state === state).length;
  const move = (id, state) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, state } : i)));

  const shown = filter === "all" ? items : items.filter((i) => i.state === filter);
  const filterLabel = COLLECTION_STATES.find((s) => s.id === filter)?.label;

  const pills = [
    { id: "all", label: "All", n: items.length },
    ...COLLECTION_STATES.map((s) => ({ id: s.id, label: s.label, n: countOf(s.id) })),
  ];

  const reset = () => {
    setItems(START_ITEMS);
    setFilter("all");
  };

  return (
    <div className="demo">
      <h4 className="demo-title">Try the collection states</h4>
      <p className="demo-hint">
        A small version of the idea behind My Collection. Each item sits in exactly one state, and
        the counts update as you move it.
      </p>

      <div className="pills" role="group" aria-label="Filter items">
        {pills.map((p) => (
          <button
            key={p.id}
            type="button"
            className="pill"
            aria-pressed={filter === p.id}
            onClick={() => setFilter(p.id)}
          >
            {p.id !== "all" && <span className={`dot dot-${p.id}`} aria-hidden="true" />}
            {`${p.label} ${p.n}`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="empty">
          Nothing in {filterLabel} yet. Use the buttons on another item to move it here.
        </p>
      ) : (
        <ul className="items" aria-live="polite">
          {shown.map((item) => (
            <li className="item" key={item.id}>
              <span className="item-name">{item.name}</span>
              <div className="seg" role="group" aria-label={`Set state for ${item.name}`}>
                {COLLECTION_STATES.map((s) => {
                  const on = item.state === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`seg-btn seg-${s.id}${on ? " is-on" : ""}`}
                      aria-pressed={on}
                      onClick={() => move(item.id, s.id)}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}

      <button type="button" className="reset" onClick={reset}>
        Reset items
      </button>
    </div>
  );
}
