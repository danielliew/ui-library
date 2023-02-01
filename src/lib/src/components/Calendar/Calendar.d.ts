type CalendarViews = "week" | "month" | "year";

export interface CalendarState {
  currentDate: Date;
  currentView: CalendarViews;
  dateFrom: Date;
  dateTo: Date;
}

export interface DateItem {
  date?: Date;
  unincludedDate?: Date;
}
