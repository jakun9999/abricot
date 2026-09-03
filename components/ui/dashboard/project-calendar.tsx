import Link from "next/link";
import { Task } from "@/schemas/task-schema";
import TaskCalendar from "@/components/ui/cards/task-calendar";
import CalendarNav from "@/components/ui/dashboard/calendar-nav";
import {
  CalendarView,
  formatDateKey,
  getMonthGrid,
  getWeekDays,
  isSameDay,
  isSameMonth,
  parseCalendarView,
  parseDateKey,
  taskDateKey,
  WEEK_DAY_LABELS,
} from "@/components/ui/dashboard/calendar-utils";

interface ProjectCalendarProps {
  projectId: string;
  tasks: Task[];
  view?: string;
  date?: string;
  search?: string;
  status?: string;
}

const groupTasksByDate = (tasks: Task[]) => {
  const grouped = new Map<string, Task[]>();

  tasks.forEach((task) => {
    const key = taskDateKey(task.dueDate);
    if (!key) return;
    const current = grouped.get(key) ?? [];
    grouped.set(key, [...current, task]);
  });

  return grouped;
};

const buildDayHref = (
  dateKey: string,
  search?: string,
  status?: string,
) => {
  const params = new URLSearchParams();
  params.set("view", "day");
  params.set("date", dateKey);
  if (search) params.set("search", search);
  if (status && status !== "ALL") params.set("status", status);
  return `?${params.toString()}`;
};

function DayColumn({
  day,
  tasks,
  projectId,
  compact,
  muted,
  search,
  status,
}: {
  day: Date;
  tasks: Task[];
  projectId: string;
  compact?: boolean;
  muted?: boolean;
  search?: string;
  status?: string;
}) {
  const today = new Date();
  const dateKey = formatDateKey(day);
  const isToday = isSameDay(day, today);
  const visibleTasks = compact ? tasks.slice(0, 2) : tasks;
  const hiddenCount = compact ? Math.max(tasks.length - visibleTasks.length, 0) : 0;

  return (
    <div
      className={`flex min-h-24 min-w-0 flex-col gap-1.5 overflow-hidden rounded-[10px] border p-1.5 md:min-h-36 md:p-2 ${
        isToday
          ? "border-abr-dark-orange bg-abr-light-orange/40"
          : "border-abr-grey-200 bg-white"
      } ${muted ? "opacity-50" : ""}`}
    >
      <Link
        href={buildDayHref(dateKey, search, status)}
        className={`flex h-6.75 w-6.75 items-center justify-center rounded-full text-body-s ${
          isToday
            ? "bg-abr-dark-orange text-white"
            : "text-abr-grey-800 hover:bg-abr-light-orange"
        }`}
      >
        {day.getDate()}
      </Link>
      <div className="flex flex-col gap-1.5 min-w-0">
        {compact ? (
          <>
            <div className="flex flex-wrap gap-0.5 md:hidden">
              {tasks.slice(0, 5).map((task) => (
                <span
                  key={task.id}
                  className={`h-1.5 w-1.5 rounded-full ${
                    task.status === "TODO"
                      ? "bg-abr-error-red"
                      : task.status === "IN_PROGRESS"
                        ? "bg-abr-warning-orange"
                        : task.status === "DONE"
                          ? "bg-abr-success-green"
                          : "bg-abr-grey-400"
                  }`}
                />
              ))}
            </div>
            <div className="hidden md:flex flex-col gap-1.5">
              {visibleTasks.map((task) => (
                <TaskCalendar
                  key={task.id}
                  task={task}
                  projectId={projectId}
                  compact
                />
              ))}
              {hiddenCount > 0 ? (
                <Link
                  href={buildDayHref(dateKey, search, status)}
                  className="text-body-xs text-abr-dark-orange underline"
                >
                  +{hiddenCount}
                </Link>
              ) : null}
            </div>
          </>
        ) : (
          visibleTasks.map((task) => (
            <TaskCalendar
              key={task.id}
              task={task}
              projectId={projectId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function ProjectCalendar({
  projectId,
  tasks,
  view: viewParam,
  date: dateParam,
  search,
  status,
}: ProjectCalendarProps) {
  const view: CalendarView = parseCalendarView(viewParam);
  const currentDate = parseDateKey(dateParam);
  const groupedTasks = groupTasksByDate(tasks);

  const tasksForDay = (day: Date) => groupedTasks.get(formatDateKey(day)) ?? [];

  return (
    <div className="mt-10.25 flex flex-col gap-6">
      <CalendarNav view={view} date={formatDateKey(currentDate)} />

      {view === "day" ? (
        <div className="flex flex-col gap-3">
          {tasksForDay(currentDate).length === 0 ? (
            <p className="text-abr-grey-600">
              Aucune tâche prévue pour cette journée.
            </p>
          ) : (
            tasksForDay(currentDate).map((task) => (
              <TaskCalendar
                key={task.id}
                task={task}
                projectId={projectId}
              />
            ))
          )}
        </div>
      ) : null}

      {view === "week" ? (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-7 gap-2 text-center text-body-xs text-abr-grey-600">
            {WEEK_DAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {getWeekDays(currentDate).map((day) => (
              <div key={formatDateKey(day)} className="flex flex-col gap-1">
                <p className="md:hidden text-body-s text-abr-grey-600 capitalize">
                  {new Intl.DateTimeFormat("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(day)}
                </p>
                <DayColumn
                  day={day}
                  tasks={tasksForDay(day)}
                  projectId={projectId}
                  search={search}
                  status={status}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {view === "month" ? (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-body-xs text-abr-grey-600">
            {WEEK_DAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {getMonthGrid(currentDate).map((day) => (
              <DayColumn
                key={formatDateKey(day)}
                day={day}
                tasks={tasksForDay(day)}
                projectId={projectId}
                compact
                muted={!isSameMonth(day, currentDate)}
                search={search}
                status={status}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
