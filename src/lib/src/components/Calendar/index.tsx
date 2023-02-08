import React, { useEffect, useMemo, useState } from "react";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import Dropdown from "../Dropdown";
import Button from "../Button";
import {
  addDays,
  addMonths,
  daysOfTheWeek,
  getDateOrdinal,
  getMonth,
  setDate,
  subtractDays,
  subtractMonths,
  isSameOrBefore,
  isSameDate,
  calendarViews,
  subtractYears,
  addYears,
} from "./Calendar.utils";
import { getScreenSegment } from "../../hooks/useRefListener";
import {
  CalendarProps,
  CalendarState,
  CalendarViews,
  DateItem,
  hoveringKeyType,
  hoverMenuState,
  MonthItem,
} from "./Calendar";
import {
  iconStyle,
  calendarTopBarItemStyle,
  calendarBottomBarItemStyle,
  calendarItemContainerStyle,
  calendarItemStyle,
  calendarItemSelectedStyle,
  calendarItemHoveringStyle,
  calendarMonthItemStyle,
  calendarMonthItemSelectedStyle,
  calendarMonthItemHoveringStyle,
  calendarCardStyle,
  calendarCardInnerStyle,
  hoverMenuStyle,
} from "./Calendar.styles";
import styles from "./Calendar.module.css";
import fontStyles from "../../utils/fonts/fonts.module.css";

const initialState = (d: Date): CalendarState => ({
  currentDate: d,
  currentMonth: d.getMonth(),
  currentView: "month",
  dateFrom: setDate(d, 1),
  dateTo: addMonths(setDate(d, 1), 1), // upper limit (not inclusive)
});

function Calendar({
  onDateChange,
  card,
  onDateHover,
  onMonthHover,
}: CalendarProps) {
  const [hovering, setHovering] = useState<hoveringKeyType>();

  const [state, setState] = useState<CalendarState>(initialState(new Date()));

  const { currentDate, currentMonth, currentView, dateFrom, dateTo } = state;

  const isToday = useMemo(
    () => isSameDate(new Date(), currentDate),
    [currentDate.toISOString()]
  );

  const toggleToday = () => {
    if (currentView === "year") {
      return setState((s) => {
        s.currentDate = new Date();
        s.currentMonth = new Date().getMonth();
        s.dateFrom = new Date();
        s.dateFrom.setMonth(0, 1);
        s.dateTo = addYears(s.dateFrom, 1);
        return { ...s };
      });
    }
    setState(initialState(new Date()));
  };

  const setCurrentView = (currentView: CalendarViews) => {
    setState((s) => {
      if (currentView === "year") {
        s.currentMonth = s.currentDate.getMonth();
        s.dateFrom.setMonth(0, 1);
        s.dateTo = addYears(s.dateFrom, 1);
      } else if (currentView === "month") {
        s.dateFrom = setDate(s.currentDate, 1);
        s.dateTo = addMonths(s.dateFrom, 1);
      }
      return { ...s, currentView };
    });
  };

  const setCurrentDate = (currentDate: Date) => {
    setState((s) => ({
      ...s,
      currentDate,
    }));
  };

  const setCurrentMonth = (month: number) => {
    setState((s) => {
      s.currentDate.setMonth(month);
      return {
        ...s,
        currentMonth: month,
      };
    });
  };

  const onPrev = () => {
    switch (currentView) {
      case "month":
        setState((s) => ({
          ...s,
          currentDate: subtractMonths(s.currentDate, 1),
          dateFrom: subtractMonths(s.dateFrom, 1),
          dateTo: subtractMonths(s.dateTo, 1),
        }));
        break;
      case "year":
        setState((s) => ({
          ...s,
          currentDate: subtractYears(s.currentDate, 1),
          dateFrom: subtractYears(s.dateFrom, 1),
          dateTo: subtractYears(s.dateTo, 1),
        }));
      default:
        break;
    }
  };

  const onNext = () => {
    switch (currentView) {
      case "month":
        setState((s) => ({
          ...s,
          currentDate: addMonths(s.currentDate, 1),
          dateFrom: addMonths(s.dateFrom, 1),
          dateTo: addMonths(s.dateTo, 1),
        }));
        break;
      case "year":
        setState((s) => ({
          ...s,
          currentDate: addYears(s.currentDate, 1),
          dateFrom: addYears(s.dateFrom, 1),
          dateTo: addYears(s.dateTo, 1),
        }));
        break;
      default:
        break;
    }
  };

  const [hoverMenu, setHoverMenu] = useState<hoverMenuState>({});

  const onHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: hoveringKeyType,
    hovering: boolean
  ) => {
    setHovering(hovering ? key : undefined);

    if (!onMonthHover && !onDateHover) return;

    const screenSegment = getScreenSegment(
      e.currentTarget.getBoundingClientRect()
    );

    let style = { ...hoverMenuStyle };

    switch (screenSegment) {
      case "topRight":
        style.top = "100%";
        style.right = "0";
        break;
      case "bottomLeft":
        style.bottom = "100%";
        style.left = "0";
        break;
      case "bottomRight":
        style.bottom = "100%";
        style.right = "0";
        break;
      default:
        style.top = "100%";
        style.left = "0";
        break;
    }

    style.opacity = hovering ? 1 : 0;
    style.display = hovering ? "block" : "none";

    setHoverMenu((h) => ({
      ...h,
      [key]: { show: hovering, style },
    }));
  };

  const displayDate = useMemo<string>(() => {
    return `${
      currentView === "month"
        ? `${currentDate.getDate()}${getDateOrdinal(currentDate)} `
        : ""
    }${getMonth(currentDate)} ${currentDate.getFullYear()}`;
  }, [currentDate.toISOString(), currentView]);

  const dates = useMemo<DateItem[][]>(() => {
    // 7x6 list of dates
    const displayDateList: DateItem[][] = [];
    let curDate = new Date(dateFrom);

    for (let i = 0; i < 6; i++) {
      displayDateList.push([]);
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < curDate.getDay()) {
          displayDateList[i].push({
            unincludedDate: subtractDays(curDate, curDate.getDay() - j),
          });
          continue;
        }
        if (
          (i === 4 || i === 5) &&
          j &&
          j >= dateTo.getDay() &&
          isSameOrBefore(dateTo, curDate)
        ) {
          displayDateList[i].push({
            unincludedDate: addDays(dateTo, j - dateTo.getDay()),
          });
          continue;
        }
        if (i === 5 && isSameOrBefore(dateTo, curDate)) {
          displayDateList[i].push({});
          continue;
        }
        displayDateList[i].push({ date: curDate });
        curDate = addDays(curDate, 1);
      }
    }

    if (!displayDateList[5][0].date && !displayDateList[5][0].unincludedDate) {
      displayDateList.pop();
    }

    setHoverMenu(() => {
      const h: typeof hoverMenu = {};
      for (let i in displayDateList) {
        for (let j in displayDateList[i]) {
          const key = `${i}-${j}`;
          h[key] = {
            show: false,
            style: hoverMenuStyle,
          };
        }
      }
      return h;
    });

    return displayDateList;
  }, [dateFrom]);

  const months = useMemo<MonthItem[]>(() => {
    const displayMonths: MonthItem[] = [];
    for (let i = 0; i < 12; i++) {
      displayMonths.push({
        month: getMonth(i),
        monthShort: getMonth(i, "short"),
        key: i,
      });
    }
    return displayMonths;
  }, []);

  useEffect(() => {
    if (currentView === "month") {
      if (currentDate.getMonth() === subtractMonths(dateFrom, 1).getMonth()) {
        setState((s) => ({
          ...s,
          dateFrom: subtractMonths(s.dateFrom, 1),
          dateTo: subtractMonths(s.dateTo, 1),
        }));
      } else if (currentDate.getMonth() === addMonths(dateFrom, 1).getMonth()) {
        setState((s) => ({
          ...s,
          dateFrom: addMonths(s.dateFrom, 1),
          dateTo: addMonths(s.dateTo, 1),
        }));
      }
    }
    if (onDateChange) onDateChange(currentDate);
  }, [currentDate]);

  return (
    <div className={fontStyles.calendar} style={card ? calendarCardStyle : {}}>
      <div style={card ? calendarCardInnerStyle : {}}>
        <div className={styles[`calendar-grid`]}>
          <span
            style={calendarTopBarItemStyle}
            className={`${styles["calendar-top-bar-display"]} ${styles["calendar-item-container"]}`}
          >
            {displayDate}
          </span>
          <div
            className={styles["calendar-item-container"]}
            style={calendarTopBarItemStyle}
          >
            <div style={iconStyle}>
              {!isToday && (
                <Button type="text" onClick={toggleToday}>
                  today
                </Button>
              )}
            </div>
          </div>
          <div
            className={styles["calendar-item-container"]}
            style={calendarTopBarItemStyle}
          >
            <div style={iconStyle} onClick={onPrev}>
              <ChevronLeft />
            </div>
          </div>
          <div
            className={styles["calendar-item-container"]}
            style={calendarTopBarItemStyle}
          >
            <div style={iconStyle} onClick={onNext}>
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className={styles[`calendar-${currentView}-grid`]}>
          {currentView === "month" ? (
            <>
              {daysOfTheWeek.map((day) => (
                <div
                  key={day}
                  className={styles["calendar-item-container"]}
                  style={calendarItemContainerStyle}
                >
                  <span>{day}</span>
                </div>
              ))}
              {dates.map((dateRow, i) =>
                dateRow.map(({ date, unincludedDate }, j) => {
                  const d = date || unincludedDate;
                  if (!d) return null;
                  const key = `${i}-${j}`;
                  const selected = isSameDate(d, currentDate);
                  return (
                    <div
                      key={key}
                      className={styles["calendar-item-container"]}
                      style={calendarItemContainerStyle}
                      onClick={() => setCurrentDate(d)}
                      onMouseEnter={(e) => {
                        onHover(e, key, true);
                      }}
                      onMouseLeave={(e) => {
                        onHover(e, key, false);
                      }}
                    >
                      <button
                        style={{
                          ...calendarItemStyle,
                          ...(selected ? calendarItemSelectedStyle : {}),
                          ...(hovering === key && !selected
                            ? calendarItemHoveringStyle
                            : {}),
                        }}
                      >
                        <span>{d.getDate()}</span>
                      </button>
                      {hoverMenu[key] && onDateHover && (
                        <div style={hoverMenu[key].style}>{onDateHover(d)}</div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          ) : currentView === "year" ? (
            <>
              {months.map((month) => {
                return (
                  <div
                    key={month.key}
                    className={styles["calendar-item-container"]}
                    onClick={() => setCurrentMonth(month.key)}
                    onMouseEnter={(e) => {
                      onHover(e, month.key, true);
                    }}
                    onMouseLeave={(e) => {
                      onHover(e, month.key, false);
                    }}
                    style={{
                      ...calendarMonthItemStyle,
                      ...(currentMonth === month.key
                        ? calendarMonthItemSelectedStyle
                        : {}),
                      ...(hovering === month.key &&
                      !(currentMonth === month.key)
                        ? calendarMonthItemHoveringStyle
                        : {}),
                    }}
                  >
                    <span>{month.month}</span>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>

        <div className={styles[`calendar-grid`]}>
          <div className={styles["calendar-bottom-bar-left"]} />
          <div
            className={styles["calendar-item-container"]}
            style={calendarBottomBarItemStyle}
          >
            <Dropdown
              items={calendarViews}
              customAnchor={<Button type="text">{currentView}</Button>}
              onItemClick={(view) => setCurrentView(view)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
