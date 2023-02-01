import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { colors } from "../../utils/colors";
import { fontSize } from "../../utils/fontSize";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import Settings from "../icons/Settings";
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
} from "./Calendar.utils";
import styles from "./Calendar.module.css";
import fontStyles from "../../utils/fonts/fonts.module.css";
import { DateItem } from "./Calendar";
import { borders } from "../../utils/borders";
import { borderRadius } from "../../utils/borderRadius";
import { padding } from "../../utils/padding";
import { transition } from "../../utils/transition";

function Calendar({}) {
  const iconStyle: CSSProperties = {
    height: fontSize.xl + 4,
    width: fontSize.xl + 4,
    color: colors.icon,
    cursor: "pointer",
  };

  const calendarTopBarItemStyle: CSSProperties = {
    padding: padding.sm,
  };

  const calendarBottomBarItemStyle: CSSProperties = {
    padding: padding.sm,
  };

  const calendarItemContainerStyle: CSSProperties = {
    padding: padding.sm,
  };

  const calendarItemStyle: CSSProperties = {
    color: colors.primary,
    backgroundColor: colors.primaryBackground,
    border: borders.calendarItem,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    height: fontSize.xl + 8,
    width: fontSize.xl + 8,
    transition: transition.transition,
    transitionTimingFunction: transition.transitionTimingFunction,
  };

  const calendarItemSelectedStyle: CSSProperties = {
    backgroundColor: colors.primary,
    color: colors.primaryBackground,
  };

  const calendarItemHoveringStyle: CSSProperties = {
    backgroundColor: colors.hoverBackgroundGrey,
  };

  const [hovering, setHovering] = useState<string | undefined>(undefined);

  const [state, setState] = useState({
    currentDate: new Date(),
    currentView: "month",
    dateFrom: setDate(new Date(), 1),
    dateTo: addMonths(setDate(new Date(), 1), 1), // upper limit (not inclusive)
  });

  const setCurrentDate = (currentDate: Date) => {
    setState((s) => ({
      ...s,
      currentDate,
    }));
  };

  const { currentDate, currentView, dateFrom, dateTo } = state;

  const onPrev = () => {
    switch (currentView) {
      case "month":
        setState((s) => ({
          ...s,
          currentDate: subtractMonths(s.currentDate, 1),
          dateFrom: subtractMonths(s.dateFrom, 1),
          dateTo: subtractMonths(s.dateTo, 1),
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
      default:
        break;
    }
  };

  const displayDate = useMemo<string>(() => {
    return `${
      currentView === "month"
        ? `${currentDate.getDate()}${getDateOrdinal(currentDate)}`
        : ""
    } ${getMonth(currentDate)} ${currentDate.getFullYear()}`;
  }, [currentDate, currentView]);

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

    return displayDateList;
  }, [dateFrom]);

  useEffect(() => {
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
  }, [currentDate]);

  return (
    <div className={fontStyles.table}>
      <div className={styles["calendar-grid"]}>
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

      {currentView === "month" ? (
        <div className={styles["calendar-grid"]}>
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
              const key = `${i}-${j}`;
              if (!d) return null;
              const selected = isSameDate(d, currentDate);
              return (
                <div
                  key={key}
                  className={styles["calendar-item-container"]}
                  style={calendarItemContainerStyle}
                  onClick={() => setCurrentDate(d)}
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(undefined)}
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
                </div>
              );
            })
          )}
        </div>
      ) : null}

      <div className="calendar-grid">
        <div className={styles["calendar-bottom-bar-left"]}></div>
        <div style={calendarBottomBarItemStyle}>
          <div style={iconStyle}>
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
