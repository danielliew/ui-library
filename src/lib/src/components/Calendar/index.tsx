import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import Dropdown from "../Dropdown";
import Button from "../Button";
import {
  addDays,
  addMonths,
  daysOfTheWeek,
  getMonth,
  setDate,
  subtractDays,
  subtractMonths,
  isSameOrBefore,
  isSameDate,
  calendarViews,
  subtractYears,
  addYears,
  isWithin,
  stringifyDate,
  isSameMonth,
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
  StringifyDateOptionsInterface,
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
  hoverMenuContentStyle,
  hoverMenuDateOverlay,
  calendarItemDateRangeStyle,
  calendarItemDateRangeLowerBoundStyle,
  calendarItemDateRangeUpperBoundStyle,
} from "./Calendar.styles";
import styles from "./Calendar.module.css";
import fontStyles from "../../utils/fonts/fonts.module.css";
import { colors } from "../../utils/colors";

const initialState = (d: Date): CalendarState => ({
  currentDate: d,
  currentDateKey: "",
  currentDateKeys: {
    from: "",
    to: "",
  },
  currentDates: {
    from: d,
    to: d,
  },
  currentMonth: `${d.getMonth()}`,
  currentView: "month",
  dateFrom: setDate(d, 1),
  dateTo: addMonths(setDate(d, 1), 1), // upper limit (not inclusive)
});

function Calendar({
  selectType = "date",
  card,
  onDateChange,
  onDateHover,
  onMonthHover,
}: CalendarProps) {
  const [hovering, setHovering] = useState<hoveringKeyType>();

  const [state, setState] = useState<CalendarState>(initialState(new Date()));

  const {
    currentDate,
    currentDateKey,
    currentDates,
    currentDateKeys,
    currentMonth,
    currentView,
    dateFrom,
    dateTo,
  } = state;

  const isToday = useMemo(() => {
    const today = new Date();
    if (selectType === "range") return isSameMonth(dateFrom, today);
    return isSameDate(today, currentDate);
  }, [currentDateKey, dateFrom.toISOString()]);

  const toggleToday = () => {
    const today = new Date();
    if (selectType === "range") {
      return setState((s) => ({
        ...s,
        currentDate: today,
        currentMonth: `${today.getMonth()}`,
        dateFrom: setDate(today, 1),
        dateTo: addMonths(setDate(today, 1), 1), // upper limit (not inclusive)
      }));
    } else if (currentView === "year") {
      return setState((s) => {
        s.currentDate = today;
        s.currentMonth = `${today.getMonth()}`;
        s.dateFrom = today;
        s.dateFrom.setMonth(0, 1);
        s.dateTo = addYears(s.dateFrom, 1);
        return { ...s };
      });
    }
    setState(initialState(today));
  };

  const setCurrentView = (currentView: CalendarViews) => {
    setState((s) => {
      if (currentView === "year") {
        s.currentMonth = `${s.currentDate.getMonth()}`;
        s.dateFrom.setMonth(0, 1);
        s.dateTo = addYears(s.dateFrom, 1);
      } else if (currentView === "month") {
        s.dateFrom = setDate(s.currentDate, 1);
        s.dateTo = addMonths(s.dateFrom, 1);
      }
      return { ...s, currentView };
    });
  };

  const setCurrentDate = (currentDate: Date, currentDateKey: string) => {
    if (hovering === currentDateKey) {
      setHoverMenu((h) => ({
        ...h,
        hoverMenuContentContainer: {
          show: true,
          style: {
            borderColor: colors.primary,
          },
        },
      }));
    }
    if (selectType === "range") {
      const fromBeforeNewDate =
        currentDates.from.getTime() < currentDate.getTime();
      return setState((s) => ({
        ...s,
        currentDates:
          s.currentDates.from && s.currentDates.to
            ? {
                from: currentDate,
                to: undefined,
              }
            : {
                from: fromBeforeNewDate ? s.currentDates.from : currentDate,
                to: fromBeforeNewDate ? currentDate : s.currentDates.from,
              },
        currentDateKeys:
          s.currentDates.from && s.currentDates.to
            ? {
                from: currentDateKey,
                to: undefined,
              }
            : {
                from: fromBeforeNewDate
                  ? s.currentDateKeys.from
                  : currentDateKey,
                to: fromBeforeNewDate ? currentDateKey : s.currentDateKeys.from,
              },
      }));
    }
    setState((s) => ({
      ...s,
      currentDate,
      currentDateKey,
    }));
  };

  const setCurrentDatesFrom = (from: Date, key: string) =>
    setState((s) => ({
      ...s,
      currentDates: { from, to: currentDates.to },
      currentDateKeys: {
        from: key,
        to: currentDateKeys.to,
      },
    }));

  const setCurrentDatesTo = (to: Date, key: string) =>
    setState((s) => ({
      ...s,
      currentDates: { from: currentDates.from, to },
      currentDateKeys: {
        from: currentDateKeys.from,
        to: key,
      },
    }));

  const setCurrentMonth = (month: string) => {
    setState((s) => {
      s.currentDate.setMonth(parseInt(month));
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
          dateFrom: subtractMonths(s.dateFrom, 1),
          dateTo: subtractMonths(s.dateTo, 1),
        }));
        break;
      case "year":
        setState((s) => ({
          ...s,
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
          dateFrom: addMonths(s.dateFrom, 1),
          dateTo: addMonths(s.dateTo, 1),
        }));
        break;
      case "year":
        setState((s) => ({
          ...s,
          dateFrom: addYears(s.dateFrom, 1),
          dateTo: addYears(s.dateTo, 1),
        }));
        break;
      default:
        break;
    }
  };

  const hoverMenuContentRefs = useRef<{
    [string: string]: HTMLDivElement | HTMLButtonElement | null;
  }>({});

  const [hoverMenu, setHoverMenu] = useState<hoverMenuState>({
    hoverMenuContainer: {
      show: false,
      style: {
        display: "none",
        opacity: 0,
      },
    },
    hoverMenuArrow: {
      show: false,
      style: {},
    },
    hoverMenuContentContainer: {
      show: false,
      style: {},
    },
  });

  const [hidingMenuSetTimeoutId, setHidingMenuSetTimeoutId] = useState<
    number | null
  >();

  const onHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: hoveringKeyType,
    hovering: boolean
  ) => {
    setHovering(hovering ? key : undefined);

    if (currentView === "month" && !onDateHover) return;
    if (currentView === "year" && !onMonthHover) return;

    const screenSegment = getScreenSegment(
      e.currentTarget.getBoundingClientRect()
    );

    let style = { ...hoverMenu[key].style };

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

    const dispatchStyle = (
      style: CSSProperties,
      other?: { [key: string]: { show: boolean; style: CSSProperties } }
    ) =>
      setHoverMenu((h) => ({
        ...h,
        [key]: { show: hovering, style },
        ...(other ? other : {}),
      }));

    if (hovering) {
      if (hidingMenuSetTimeoutId) {
        clearTimeout(hidingMenuSetTimeoutId);
        setHidingMenuSetTimeoutId(null);
      }

      const dropdown = hoverMenuContentRefs.current[key];
      const dropdownParent = hoverMenuContentRefs.current[`parent`];
      const dropDownCenter = hoverMenuContentRefs.current[`center-${key}`];

      style.display = "block";
      style.padding = screenSegment.includes("bottom")
        ? `0px 8px 10px 8px`
        : `8px 8px 2px 8px`;

      dispatchStyle(style, {
        [`hoverMenuDateOverlay-${key}`]: {
          show: true,
          style: {
            display: "block",
          },
        },
      });

      setTimeout(() => {
        const dropdownMenuContainerParentRect: DOMRect =
          dropdownParent?.getBoundingClientRect() || ({} as DOMRect);
        const dropdownMenuContainerRect: DOMRect =
          dropdown?.getBoundingClientRect() || ({} as DOMRect);

        const dropDownCenterRect: DOMRect =
          dropDownCenter?.getBoundingClientRect() || ({} as DOMRect);

        if (
          (!dropdownMenuContainerParentRect.top ||
            !dropdownMenuContainerRect.top) &&
          (!dropdownMenuContainerParentRect.bottom ||
            !dropdownMenuContainerRect.bottom)
        )
          return;

        const hoverMenuContainerPos: CSSProperties = {};
        const hoverMenuArrowPos: CSSProperties = {};

        const arrowOffset = dropDownCenterRect.width / 2;

        if (screenSegment.includes("top")) {
          hoverMenuContainerPos.top = Math.abs(
            dropdownMenuContainerParentRect.top - dropdownMenuContainerRect.top
          );
          hoverMenuContainerPos.bottom = "auto";
          hoverMenuArrowPos.left =
            Math.abs(dropdownMenuContainerRect.left - dropDownCenterRect.left) +
            arrowOffset;
          hoverMenuArrowPos.right = "auto";
        } else {
          hoverMenuContainerPos.top = "auto";
          hoverMenuContainerPos.bottom = Math.abs(
            dropdownMenuContainerParentRect.bottom -
              dropdownMenuContainerRect.bottom
          );
          hoverMenuArrowPos.left =
            Math.abs(
              dropdownMenuContainerRect.right - dropDownCenterRect.right
            ) + arrowOffset;
          hoverMenuArrowPos.right = "auto";
        }

        if (screenSegment.includes("Left")) {
          hoverMenuContainerPos.left = Math.abs(
            dropdownMenuContainerParentRect.left -
              dropdownMenuContainerRect.left
          );
          hoverMenuContainerPos.right = "auto";
        } else {
          hoverMenuContainerPos.left = "auto";
          hoverMenuContainerPos.right = Math.abs(
            dropdownMenuContainerParentRect.right -
              dropdownMenuContainerRect.right
          );
        }

        dispatchStyle(
          {
            ...style,
            opacity: 1,
          },
          {
            hoverMenuContainer: {
              show: true,
              style: {
                ...hoverMenu.hoverMenuContainer.style,
                ...hoverMenuContainerPos,
                height: dropdownMenuContainerRect.height,
                width: dropdownMenuContainerRect.width,
                display: "flex",
                opacity: 1,
                transform: `rotate(${
                  screenSegment.includes("bottom") ? 180 : 0
                }deg)`,
              },
            },
            hoverMenuContentContainer: {
              show: true,
              style: {
                borderColor:
                  currentDateKey === key ? colors.primary : "transparent",
              },
            },
            hoverMenuArrow: {
              show: true,
              style: hoverMenuArrowPos,
            },
          }
        );
      }, 200);
    } else {
      style.opacity = 0;
      dispatchStyle(style, {
        [`hoverMenuDateOverlay-${key}`]: {
          show: false,
          style: {
            display: "none",
          },
        },
      });
      setTimeout(
        () =>
          dispatchStyle({
            ...style,
            display: "none",
          }),
        300
      );
    }
  };

  const hideMenuContainer = () => {
    setHidingMenuSetTimeoutId(
      setTimeout(() => {
        setHoverMenu((h) => ({
          ...h,
          hoverMenuContainer: {
            show: false,
            style: {
              ...h.hoverMenuContainer.style,
              opacity: 0,
            },
          },
        }));
        setTimeout(() => {
          setHoverMenu((h) => ({
            ...h,
            hoverMenuContainer: {
              show: false,
              style: {
                ...h.hoverMenuContainer.style,
                display: "none",
              },
            },
          }));
        }, 300);
      }, 200)
    );
  };

  const displayDate = useMemo<string>(() => {
    const options: StringifyDateOptionsInterface = {
      noDate: currentView === "year",
      shortMonth: selectType === "range",
    };
    if (selectType === "range") {
      return `${stringifyDate(currentDates.from, options)}${
        currentDates.to ? ` - ${stringifyDate(currentDates.to, options)}` : ""
      }`;
    }
    return stringifyDate(currentDate, options);
  }, [currentDateKey, currentDateKeys.from, , currentDateKeys.to, currentView]);

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

    if (onDateHover)
      setHoverMenu((oldH) => {
        const h: typeof hoverMenu = { ...oldH };
        for (let i in displayDateList) {
          for (let j in displayDateList[i]) {
            const key = `${i}-${j}`;
            const d =
              displayDateList[i][j].date ||
              displayDateList[i][j].unincludedDate;
            if (
              selectType === "date" &&
              d &&
              isSameDate(d, currentDate) &&
              isSameMonth(currentDate, dateFrom)
            ) {
              setCurrentDate(currentDate, key);
            } else if (
              selectType === "range" &&
              d &&
              isSameDate(d, currentDates.from)
            ) {
              setCurrentDatesFrom(currentDates.from, key);
            } else if (
              selectType === "range" &&
              d &&
              currentDates.to &&
              isSameDate(d, currentDates.to)
            ) {
              setCurrentDatesTo(currentDates.to, key);
            }
            h[key] = {
              show: false,
              style: hoverMenuContentStyle,
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
        key: `${i}`,
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
  }, [currentDateKey]);

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

        {/* header */}
        {currentView === "month" ? (
          <div className={styles[`calendar-${currentView}-grid`]}>
            {daysOfTheWeek.map((day) => (
              <div
                key={day}
                className={styles["calendar-item-container"]}
                style={calendarItemContainerStyle}
              >
                <span>{day}</span>
              </div>
            ))}
          </div>
        ) : currentView === "year" ? (
          <div />
        ) : null}

        {/* dates/months */}
        <div
          className={styles[`calendar-${currentView}-grid`]}
          ref={(e) => (hoverMenuContentRefs.current[`parent`] = e)}
          onMouseLeave={hideMenuContainer}
        >
          <div
            className={styles["calendar-menu-container"]}
            style={hoverMenu.hoverMenuContainer.style}
          >
            <div
              className={styles["calendar-menu-arrow"]}
              style={hoverMenu.hoverMenuArrow.style}
            />
            <div
              className={styles["calendar-menu-content-container"]}
              style={hoverMenu.hoverMenuContentContainer.style}
            />
          </div>
          {currentView === "month" ? (
            <>
              {dates.map((dateRow, i) =>
                dateRow.map(({ date, unincludedDate }, j) => {
                  const d = date || unincludedDate;
                  if (!d) return null;
                  const key = `${i}-${j}`;

                  const isDateRangeLowerBound =
                    selectType === "range" && isSameDate(currentDates.from, d);
                  const isDateRangeUpperBound =
                    selectType === "range" &&
                    currentDates.to &&
                    isSameDate(currentDates.to, d);

                  const withinDateRange =
                    selectType === "range" &&
                    currentDates.to &&
                    isWithin(currentDates.from, currentDates.to, d) &&
                    !(isDateRangeLowerBound || isDateRangeUpperBound);

                  let hoveringDateItem = hovering
                    ? dates[parseInt(hovering.split("-")[0])][
                        parseInt(hovering.split("-")[1])
                      ]
                    : null;
                  const hoveringDate =
                    hoveringDateItem?.date || hoveringDateItem?.unincludedDate;

                  const onRangeToSelectionHover =
                    selectType === "range" &&
                    !currentDates.to &&
                    hovering &&
                    hoveringDate &&
                    (currentDates.from.getTime() < hoveringDate.getTime()
                      ? isWithin(currentDates.from, hoveringDate, d)
                      : isWithin(hoveringDate, currentDates.from, d)) &&
                    !isDateRangeLowerBound;

                  const selected =
                    (selectType === "date" && isSameDate(currentDate, d)) ||
                    isDateRangeLowerBound ||
                    isDateRangeUpperBound;

                  return (
                    <div
                      key={key}
                      className={styles["calendar-item-container"]}
                      style={{
                        ...calendarItemContainerStyle,
                      }}
                      onClick={() => setCurrentDate(d, key)}
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

                          ...(withinDateRange || onRangeToSelectionHover
                            ? calendarItemDateRangeStyle
                            : {}),
                          ...(isDateRangeLowerBound
                            ? calendarItemDateRangeLowerBoundStyle
                            : {}),
                          ...(isDateRangeUpperBound
                            ? calendarItemDateRangeUpperBoundStyle
                            : {}),

                          ...(hovering === key && !selected
                            ? calendarItemHoveringStyle
                            : {}),
                        }}
                        ref={(e) =>
                          (hoverMenuContentRefs.current[`center-${key}`] = e)
                        }
                      >
                        <span>{d.getDate()}</span>
                      </button>
                      {hoverMenu[key] && onDateHover && (
                        <>
                          <div
                            className={`calendar-drop-down-${key}`}
                            style={hoverMenu[key].style}
                            ref={(e) => (hoverMenuContentRefs.current[key] = e)}
                          >
                            {onDateHover(d)}
                          </div>
                          <div
                            style={{
                              ...hoverMenuDateOverlay,
                              ...(hoverMenu[`hoverMenuDateOverlay-${key}`]
                                ? hoverMenu[`hoverMenuDateOverlay-${key}`].style
                                : {}),
                            }}
                          />
                        </>
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
