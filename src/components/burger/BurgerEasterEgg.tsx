"use client";

import { useEffect, useState } from "react";

const drops = [
  [6, 0.1, 1.1, -18],
  [14, 0.55, 0.8, 14],
  [23, 0.25, 1.25, -8],
  [33, 0.8, 0.95, 20],
  [43, 0.05, 0.75, -14],
  [53, 0.65, 1.15, 10],
  [64, 0.35, 0.85, -24],
  [74, 0.9, 1.2, 18],
  [84, 0.45, 0.9, -10],
  [94, 0.15, 1.05, 22],
] as const;

const orderMessages = [
  "오늘도 버거로운 하루",
  "치즈 한 장 추가했습니다",
  "피클은 취향껏 넣었습니다",
  "단골 손님으로 등록했습니다",
] as const;

export function BurgerEasterEgg() {
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timer = window.setTimeout(() => setActive(false), 3200);
    return () => window.clearTimeout(timer);
  }, [active, round]);

  function orderBurger() {
    setRound((value) => value + 1);
    setActive(true);
  }

  const message = orderMessages[Math.max(0, (round - 1) % orderMessages.length)];

  return (
    <>
      <button
        type="button"
        onClick={orderBurger}
        className="burger-mark group"
        aria-label="버거 주문하기"
        title="버거 주문하기"
      >
        <span className="burger-mark__bun" />
        <span className="burger-mark__lettuce" />
        <span className="burger-mark__cheese" />
        <span className="burger-mark__patty" />
        <span className="burger-mark__bottom" />
      </button>

      {active && (
        <div key={round} className="burger-rain" aria-hidden="true">
          {drops.map(([left, delay, scale, rotate], index) => (
            <span
              key={`${round}-${index}`}
              className="burger-rain__item"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                "--burger-scale": scale,
                "--burger-rotate": `${rotate}deg`,
              } as React.CSSProperties}
            >
              🍔
            </span>
          ))}
        </div>
      )}

      <div
        aria-live="polite"
        className={`burger-toast ${active ? "burger-toast--visible" : ""}`}
      >
        <span>{message}</span>
        {active && <small>ORDER #{String(round).padStart(2, "0")}</small>}
      </div>
    </>
  );
}
