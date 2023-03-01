import { CSSProperties, ReactElement } from "react";

type CalendarSelectType = "date" | "range";

type CalendarViews = "month" | "year";

type hoveringKeyType = string;

interface hoverMenuState {
  [hoveringKeyType: hoveringKeyType]: { show: boolean; style: CSSProperties };
}

interface CalendarState {
  currentDate: Date;
  currentDateKey: string;
  currentDates: {
    from: Date;
    to: Date | undefined;
  };
  currentDateKeys: {
    from: string;
    to: string | undefined;
  };
  currentMonth: string;
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
  key: string;
}

interface CalendarProps {
  card?: boolean;
  selectType?: CalendarSelectType;
  primaryColor?: string;
  backgroundColor?: string;
  onDateHover?: (date: Date) => ReactElement | string | null;
  onMonthHover?: (month: MonthItem) => ReactElement | string | null;
  onDateChange?: (date: Date) => any;
}

interface StringifyDateOptionsInterface {
    noDate?: boolean;
    shortMonth?: boolean;
}