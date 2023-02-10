import { CSSProperties, ReactElement } from "react";

type CalendarViews = "month" | "year";

type hoveringKeyType = string | number;

interface hoverMenuState {
  [hoveringKeyType: hoveringKeyType]: { show: boolean; style: CSSProperties };
}

interface CalendarState {
  currentDate: Date;
  currentDateKey: string;
  currentMonth: number;
  currentView: CalendarViews;
  dateFrom: Date;
  dateTo: Date;
}

interface DateItem {
  date?: Date;
  unincludedDate?: Date;
}

interface MonthItem {
  month: string;
  monthShort: string;
  key: number;
}

interface CalendarProps {
  onDateHover?: (date: Date) => ReactElement | string | null;
  onMonthHover?: (month: MonthItem) => ReactElement | string | null;
  onDateChange?: (date: Date) => any;
  card?: boolean;
}
