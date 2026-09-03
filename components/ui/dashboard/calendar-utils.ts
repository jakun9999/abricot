/** Vue calendrier (query `?view=`). */
export type CalendarView = "day" | "week" | "month";

/**
 * Parse `?view=`. Toute valeur inconnue retombe sur `month` (vue Figma par défaut).
 */
export const parseCalendarView = (value?: string): CalendarView => {
  if (value === "day" || value === "week" || value === "month") {
    return value;
  }
  return "month";
};

/**
 * Sérialise une date locale en `YYYY-MM-DD` (pas `toISOString()`, qui est UTC
 * et décale le jour en France).
 */
export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Parse `YYYY-MM-DD` en date locale. Construit avec `new Date(y, m-1, d)`
 * (pas `new Date("YYYY-MM-DD")`, interprété UTC).
 */
export const parseDateKey = (value?: string, fallback = new Date()) => {
  if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);
    if (Number.isFinite(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date(
    fallback.getFullYear(),
    fallback.getMonth(),
    fallback.getDate(),
  );
};

export const taskDateKey = (dueDate: string) => {
  const parsed = new Date(dueDate);
  if (!Number.isFinite(parsed.getTime())) return "";
  return formatDateKey(parsed);
};

export const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const isSameMonth = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth();

export const addDays = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

export const addMonths = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
};

/** Lundi de la semaine (JS : dimanche = 0). */
export const startOfWeek = (date: Date) => {
  const firstWeekDay = (date.getDay() + 6) % 7;
  return addDays(date, -firstWeekDay);
};

export const getWeekDays = (date: Date) => {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
};

/** Grille 6×7 (42 jours) pour afficher un mois type calendrier mural. */
export const getMonthGrid = (monthDate: Date) => {
  const firstDayOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1,
  );
  const start = startOfWeek(firstDayOfMonth);

  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
};

export const shiftCalendarDate = (date: Date, view: CalendarView, direction: 1 | -1) => {
  if (view === "month") return addMonths(date, direction);
  if (view === "week") return addDays(date, direction * 7);
  return addDays(date, direction);
};

export const formatPeriodLabel = (date: Date, view: CalendarView) => {
  if (view === "day") {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  if (view === "week") {
    const days = getWeekDays(date);
    const start = days[0];
    const end = days[6];
    const startLabel = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
    }).format(start);
    const endLabel = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(end);
    return `${startLabel} – ${endLabel}`;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const WEEK_DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
