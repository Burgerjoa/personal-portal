"use client";

import { useState } from "react";

const burgers = [
  { name: "클래식 치즈", ingredients: "피클 · 치즈 · 패티", accent: "classic" },
  { name: "더블 야근", ingredients: "치즈 2 · 패티 2 · 양파", accent: "double" },
  { name: "초록 디버거", ingredients: "양상추 · 토마토 · 아보카도", accent: "green" },
  { name: "매콤한 배포", ingredients: "할라피뇨 · 핫소스 · 치즈", accent: "hot" },
  { name: "새벽 두 시", ingredients: "계란 · 해시브라운 · 패티", accent: "night" },
] as const;

export function BurgerSpecial() {
  const [index, setIndex] = useState(0);
  const burger = burgers[index];

  function pickBurger() {
    setIndex((current) => {
      const offset = Math.floor(Math.random() * (burgers.length - 1)) + 1;
      return (current + offset) % burgers.length;
    });
  }

  return (
    <button
      type="button"
      className={`burger-special burger-special--${burger.accent}`}
      onClick={pickBurger}
      aria-label="랜덤 버거 추천받기"
    >
      <span className="burger-special__copy">
        <span>TODAY&apos;S SPECIAL · TAP ME</span>
        <strong aria-live="polite">{burger.name}</strong>
        <small>{burger.ingredients}</small>
      </span>
      <span className="burger-stack burger-special__stack" aria-hidden="true">
        <span className="burger-mark__bun" />
        <span className="burger-mark__lettuce" />
        <span className="burger-mark__cheese" />
        <span className="burger-mark__patty" />
        {burger.accent === "double" && <span className="burger-mark__patty" />}
        <span className="burger-mark__bottom" />
      </span>
    </button>
  );
}
