"use client";

import { type MouseEvent, type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
// Components
import { SelectInput } from "./SelectInput";
import { SelectList } from "./SelectList";
// Types
export type SelectProps = {
  name: string;
  label?: string;
  list: {
    value: string;
    color?: string;
    selected?: boolean;
  }[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  multiselect?: boolean;
  required?: boolean;
  disabled?: boolean;
  spanFullWidth?: boolean;
  offsetRight?: number;
  offsetTop?: number;
  className?: string;
  inputStyle?: CSSProperties;
};

export const Select = ({
  name,
  label,
  list,
  selected,
  setSelected,
  multiselect = false,
  required,
  disabled,
  spanFullWidth = true,
  offsetTop = 0,
  offsetRight = 0,
  className,
  inputStyle,
}: SelectProps) => {
  // Search input
  const [input, setInput] = useState("");
  // Filter the list based on the input value
  const listFiltered = useMemo(
    () =>
      list
        .filter(({ value }) => value.toLowerCase().includes(input.toLowerCase()))
        .map((item) => ({
          ...item,
          selected: selected.includes(item.value),
        })), // Filter the list based on the input value)
    [list, input, selected]
  );
  // Calculate the width of the longest word in the list
  const listLongestWordPx = useMemo(() => {
    // Find longest word in the list
    const longestWord = list.reduce((acc, item) => {
      return item.value.length > acc.length ? item.value : acc;
    }, "");
    // Calculate the width of the longest word
    const longestWordPx = longestWord.length * 8;
    return longestWordPx + 16;
  }, [list]);
  // Menu position
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const parentHeight = menuContainerRef.current?.parentElement?.offsetHeight ?? 0;
  const top = offsetTop + parentHeight + 2;
  const right = offsetRight;

  // Toggle menu
  const [show, setShow] = useState(false);
  const toggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!show) setShow(true);
  };
  // Handle click outside
  useEffect(() => {
    const listener = (e: Event) => {
      // If clicked outside the menu container, close the select.
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("click", listener, true);
    return () => document.removeEventListener("click", listener, true);
  }, []);

  return (
    <div
      onClick={toggle}
      className={`${className} relative flex`}
      style={{ minWidth: spanFullWidth ? listLongestWordPx : "unset" }}
    >
      <SelectInput
        input={input}
        setInput={setInput}
        name={name}
        label={label}
        selected={multiselect ? null : selected[0]}
        required={required}
        disabled={disabled}
        style={inputStyle}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 absolute top-[14px] right-3 text-[#15803d] transition-transform duration-200"
        style={{
          transform: show ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
      <div
        ref={menuContainerRef}
        className="w-full absolute overflow-hidden z-[999] grid transition-[grid-template-rows] duration-200 bg-white shadow-[4px_8px_20px_0px_#00000040] rounded-[8px]"
        style={{
          top,
          right,
          gridTemplateRows: show ? "1fr" : "0fr",
        }}
      >
        <SelectList
          list={listFiltered}
          selected={selected}
          setSelected={setSelected}
          setInput={setInput}
          setShow={setShow}
          multiselect={multiselect}
        />
      </div>
    </div>
  );
};
