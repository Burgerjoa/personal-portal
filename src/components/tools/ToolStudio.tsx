"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CaseSensitive,
  Check,
  Copy,
  Dice5,
  Eraser,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  Shuffle,
} from "lucide-react";

type ToolKey = "counter" | "dday" | "base64" | "password" | "lotto";

const toolTabs: Array<{
  key: ToolKey;
  title: string;
  desc: string;
  status: string;
}> = [
  {
    key: "counter",
    title: "글자수 세기",
    desc: "자소서, 블로그, 폼 입력 제한 확인",
    status: "live",
  },
  {
    key: "dday",
    title: "D-Day 계산",
    desc: "목표일, 기념일, 지원 마감일 계산",
    status: "live",
  },
  {
    key: "base64",
    title: "Base64 변환",
    desc: "UTF-8 텍스트 인코딩과 디코딩",
    status: "live",
  },
  {
    key: "password",
    title: "비밀번호 생성",
    desc: "브라우저 crypto 기반 랜덤 생성",
    status: "live",
  },
  {
    key: "lotto",
    title: "로또 번호 생성",
    desc: "중복 없는 6개 숫자 조합",
    status: "live",
  },
];

const backlogTools = [
  "JSON 포맷터",
  "단위 변환기",
  "QR코드 생성기",
  "색상 변환기",
  "만 나이 계산기",
];

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

function toDateInputValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function addDays(dateValue: string, amount: number, includeFirstDay: boolean) {
  const base = new Date(`${dateValue}T00:00:00`);
  const adjusted =
    includeFirstDay && amount > 0
      ? amount - 1
      : includeFirstDay && amount < 0
        ? amount + 1
        : amount;
  base.setDate(base.getDate() + adjusted);
  return base;
}

function diffDays(startValue: string, endValue: string, includeFirstDay: boolean) {
  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T00:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / 86400000);

  if (includeFirstDay) {
    return diff >= 0 ? diff + 1 : diff - 1;
  }

  return diff;
}

function secureRandom(max: number) {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] % max;
}

function utf8ToBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function base64ToUtf8(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

async function copyText(value: string) {
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();

    if (!copied) throw new Error("Copy failed");
  }
}

export function ToolStudio() {
  const [activeTool, setActiveTool] = useState<ToolKey>("counter");

  return (
    <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
      <aside className="space-y-3">
        {toolTabs.map((tool) => (
          <button
            key={tool.key}
            type="button"
            onClick={() => setActiveTool(tool.key)}
            className={`w-full border p-4 text-left transition-colors ${
              activeTool === tool.key
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background hover:border-foreground"
            }`}
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">
              {tool.status}
            </span>
            <strong className="mt-2 block text-lg">{tool.title}</strong>
            <span className="mt-1 block text-sm opacity-70">{tool.desc}</span>
          </button>
        ))}

        <div className="border border-dashed border-border p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            next migration
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {backlogTools.map((tool) => (
              <span
                key={tool}
                className="border border-border px-2 py-1 text-xs text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <section className="min-h-[640px] border border-border bg-card p-4 sm:p-6">
        {activeTool === "counter" && <CharacterCounter />}
        {activeTool === "dday" && <DdayCalculator />}
        {activeTool === "base64" && <Base64Converter />}
        {activeTool === "password" && <PasswordGenerator />}
        {activeTool === "lotto" && <LottoGenerator />}
      </section>
    </div>
  );
}

function CharacterCounter() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);

  const stats = useMemo(() => {
    const chars = excludeSpaces ? text.replace(/\s/g, "").length : text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const bytes = new TextEncoder().encode(text).length;
    const lines = text ? text.split("\n").length : 0;

    return [
      ["글자", chars.toLocaleString()],
      ["단어", words.toLocaleString()],
      ["UTF-8 bytes", bytes.toLocaleString()],
      ["줄", lines.toLocaleString()],
    ];
  }, [excludeSpaces, text]);

  return (
    <ToolShell
      icon={<CaseSensitive className="h-5 w-5" />}
      kicker="text utility"
      title="글자수 세기"
      summary="공백 포함/제외, 단어 수, 줄 수, UTF-8 바이트를 실시간으로 계산합니다."
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="min-h-64 w-full resize-y border border-border bg-background p-4 leading-7 outline-none focus:border-foreground"
        placeholder="자기소개서, 블로그 초안, 폼 입력 문구를 붙여넣으세요."
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={excludeSpaces}
            onChange={(event) => setExcludeSpaces(event.target.checked)}
            className="size-4 accent-foreground"
          />
          공백 제외
        </label>
        <button
          type="button"
          onClick={() => copyText(text)}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm hover:border-foreground"
        >
          <Copy className="h-4 w-4" />
          복사
        </button>
        <button
          type="button"
          onClick={() => setText("")}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm hover:border-foreground"
        >
          <Eraser className="h-4 w-4" />
          지우기
        </button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="border border-border bg-background p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <strong className="mt-2 block text-3xl font-black">{value}</strong>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function DdayCalculator() {
  const today = toDateInputValue(new Date());
  const [mode, setMode] = useState<"find" | "diff">("find");
  const [baseDate, setBaseDate] = useState(today);
  const [days, setDays] = useState(100);
  const [includeFirstDay, setIncludeFirstDay] = useState(true);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(() => {
    const value = new Date();
    value.setDate(value.getDate() + 30);
    return toDateInputValue(value);
  });

  const resultDate = addDays(baseDate, days, includeFirstDay);
  const diff = diffDays(startDate, endDate, includeFirstDay);

  return (
    <ToolShell
      icon={<CalendarDays className="h-5 w-5" />}
      kicker="date utility"
      title="D-Day 계산"
      summary="기준일로부터 특정 날짜를 찾거나, 두 날짜 사이의 D-Day를 계산합니다."
    >
      <div className="mb-5 grid grid-cols-2 gap-2 border border-border p-1">
        <button
          type="button"
          onClick={() => setMode("find")}
          className={`px-3 py-2 text-sm font-semibold ${
            mode === "find" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          날짜 찾기
        </button>
        <button
          type="button"
          onClick={() => setMode("diff")}
          className={`px-3 py-2 text-sm font-semibold ${
            mode === "diff" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          D-Day
        </button>
      </div>

      {mode === "find" ? (
        <div className="grid gap-4">
          <Field label="기준일">
            <input
              type="date"
              value={baseDate}
              onChange={(event) => setBaseDate(event.target.value)}
              className="tool-input"
            />
          </Field>
          <Field label="더하거나 뺄 일수">
            <input
              type="number"
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              className="tool-input"
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            {[100, 200, 365, 500, 1000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDays(value)}
                className="border border-border px-3 py-2 text-sm hover:border-foreground"
              >
                +{value}일
              </button>
            ))}
          </div>
          <IncludeFirstDay checked={includeFirstDay} onChange={setIncludeFirstDay} />
          <ResultBlock
            label="계산 결과"
            value={dateFormatter.format(resultDate)}
            sub={`기준일로부터 ${Math.abs(days).toLocaleString()}일 ${
              days >= 0 ? "후" : "전"
            }`}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          <Field label="시작일">
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="tool-input"
            />
          </Field>
          <Field label="목표일">
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="tool-input"
            />
          </Field>
          <IncludeFirstDay checked={includeFirstDay} onChange={setIncludeFirstDay} />
          <ResultBlock
            label="계산 결과"
            value={
              includeFirstDay
                ? `${Math.abs(diff).toLocaleString()}일${diff >= 0 ? "째" : " 전"}`
                : diff > 0
                  ? `D-${diff.toLocaleString()}`
                  : diff < 0
                    ? `D+${Math.abs(diff).toLocaleString()}`
                    : "D-Day"
            }
            sub={
              includeFirstDay
                ? "시작일을 1일로 포함한 계산입니다."
                : diff > 0
                  ? `${diff.toLocaleString()}일 남았습니다.`
                  : diff < 0
                    ? `${Math.abs(diff).toLocaleString()}일 지났습니다.`
                    : "바로 오늘입니다."
            }
          />
        </div>
      )}
    </ToolShell>
  );
}

function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function encode() {
    setError("");
    setOutput(utf8ToBase64(input));
  }

  function decode() {
    setError("");

    try {
      setOutput(base64ToUtf8(input.trim()));
    } catch {
      setOutput("");
      setError("유효한 Base64 문자열이 아닙니다.");
    }
  }

  return (
    <ToolShell
      icon={<LockKeyhole className="h-5 w-5" />}
      kicker="developer utility"
      title="Base64 변환"
      summary="한글을 포함한 UTF-8 텍스트를 Base64로 변환하고 다시 복원합니다."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="입력">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-64 w-full resize-y border border-border bg-background p-4 leading-7 outline-none focus:border-foreground"
            placeholder="텍스트 또는 Base64 문자열"
          />
        </Field>
        <Field label="결과">
          <textarea
            value={output}
            readOnly
            className="min-h-64 w-full resize-y border border-border bg-background p-4 leading-7 outline-none"
            placeholder="변환 결과"
          />
        </Field>
      </div>
      {error && (
        <p className="mt-3 border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          {error}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={encode} className="tool-action">
          인코딩
        </button>
        <button type="button" onClick={decode} className="tool-action">
          디코딩
        </button>
        <button
          type="button"
          onClick={() => {
            setInput(output);
            setOutput(input);
          }}
          className="tool-action"
        >
          <Shuffle className="h-4 w-4" />
          교체
        </button>
        <button type="button" onClick={() => copyText(output)} className="tool-action">
          <Copy className="h-4 w-4" />
          결과 복사
        </button>
      </div>
    </ToolShell>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [bulk, setBulk] = useState<string[]>([]);
  const [copyNotice, setCopyNotice] = useState("");

  useEffect(() => {
    if (!copyNotice) return;

    const timer = window.setTimeout(() => setCopyNotice(""), 1800);
    return () => window.clearTimeout(timer);
  }, [copyNotice]);

  function createPassword() {
    const sets = [
      upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      lower ? "abcdefghijklmnopqrstuvwxyz" : "",
      numbers ? "0123456789" : "",
      symbols ? "!@#$%^&*()_+-=[]{};:,.?/" : "",
    ].filter(Boolean);
    const pool = sets.join("");

    if (!pool) return "";

    const required = sets.map((set) => set[secureRandom(set.length)]);
    const remaining = Math.max(length - required.length, 0);
    const chars = [...required];

    for (let index = 0; index < remaining; index += 1) {
      chars.push(pool[secureRandom(pool.length)]);
    }

    for (let index = chars.length - 1; index > 0; index -= 1) {
      const target = secureRandom(index + 1);
      [chars[index], chars[target]] = [chars[target], chars[index]];
    }

    return chars.join("");
  }

  function generateOne() {
    setPassword(createPassword());
    setBulk([]);
  }

  function generateBulk() {
    const values = Array.from({ length: 5 }, createPassword);
    setBulk(values);
    setPassword(values[0] ?? "");
  }

  async function copyPassword(value: string) {
    if (!value) return;

    try {
      await copyText(value);
      setCopyNotice("비밀번호를 복사했습니다.");
    } catch {
      setCopyNotice("복사하지 못했습니다.");
    }
  }

  return (
    <ToolShell
      icon={<KeyRound className="h-5 w-5" />}
      kicker="security utility"
      title="비밀번호 생성"
      summary="선택한 문자 조합을 보장하면서 브라우저 crypto API로 랜덤 비밀번호를 만듭니다."
    >
      <div className="border border-border bg-background p-5">
        <p className="break-all font-mono text-2xl font-bold">
          {password || "Generate_a_password"}
        </p>
      </div>

      <Field label={`길이: ${length}`}>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(event) => setLength(Number(event.target.value))}
          className="w-full accent-foreground"
        />
      </Field>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Toggle label="대문자" checked={upper} onChange={setUpper} />
        <Toggle label="소문자" checked={lower} onChange={setLower} />
        <Toggle label="숫자" checked={numbers} onChange={setNumbers} />
        <Toggle label="특수문자" checked={symbols} onChange={setSymbols} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={generateOne} className="tool-action">
          <RefreshCw className="h-4 w-4" />
          생성
        </button>
        <button type="button" onClick={generateBulk} className="tool-action">
          5개 생성
        </button>
        <button type="button" onClick={() => copyPassword(password)} className="tool-action">
          <Copy className="h-4 w-4" />
          복사
        </button>
      </div>

      {bulk.length > 0 && (
        <div className="mt-5 grid gap-2">
          {bulk.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => copyPassword(value)}
              className="group flex items-center justify-between gap-4 border border-border bg-background p-3 text-left font-mono text-sm hover:border-foreground"
            >
              <span className="break-all">{value}</span>
              <Copy className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
            </button>
          ))}
        </div>
      )}

      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 border border-foreground bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-lg transition-all duration-200 ${
          copyNotice
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <Check className="h-4 w-4" />
        {copyNotice}
      </div>
    </ToolShell>
  );
}

function LottoGenerator() {
  const [count, setCount] = useState(5);
  const [games, setGames] = useState<number[][]>(() =>
    Array.from({ length: 5 }, generateLottoGame),
  );

  function draw() {
    setGames(Array.from({ length: count }, generateLottoGame));
  }

  return (
    <ToolShell
      icon={<Dice5 className="h-5 w-5" />}
      kicker="random utility"
      title="로또 번호 생성"
      summary="중복 없는 1부터 45까지의 숫자 6개를 브라우저에서 랜덤으로 뽑습니다."
    >
      <div className="flex flex-wrap items-end gap-3">
        <Field label="게임 수">
          <select
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="tool-input"
          >
            {[1, 2, 3, 4, 5, 10].map((value) => (
              <option key={value} value={value}>
                {value}게임
              </option>
            ))}
          </select>
        </Field>
        <button type="button" onClick={draw} className="tool-action h-11">
          <RefreshCw className="h-4 w-4" />
          번호 뽑기
        </button>
      </div>
      <div className="mt-6 grid gap-3">
        {games.map((game, index) => (
          <div
            key={`${index}-${game.join("-")}`}
            className="flex flex-wrap items-center gap-2 border border-border bg-background p-4"
          >
            <span className="mr-2 font-mono text-xs text-muted-foreground">
              #{index + 1}
            </span>
            {game.map((number) => (
              <span
                key={number}
                className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-black text-background"
              >
                {number}
              </span>
            ))}
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function generateLottoGame() {
  const numbers = new Set<number>();

  while (numbers.size < 6) {
    numbers.add(secureRandom(45) + 1);
  }

  return [...numbers].sort((a, b) => a - b);
}

function ToolShell({
  icon,
  kicker,
  title,
  summary,
  children,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {icon}
            {kicker}
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-normal">{title}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{summary}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between border border-border bg-background p-3 text-sm">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-foreground"
      />
    </label>
  );
}

function IncludeFirstDay({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-foreground"
      />
      기준일을 1일로 포함
    </label>
  );
}

function ResultBlock({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="border border-foreground bg-foreground p-6 text-background">
      <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-70">
        {label}
      </p>
      <strong className="mt-3 block text-4xl font-black tracking-normal">
        {value}
      </strong>
      <p className="mt-3 opacity-75">{sub}</p>
    </div>
  );
}
