import { CheckBox } from "..";
// Types
import type { SelectProps } from ".";
type SelectListProps = {
  list: SelectProps["list"];
  selected: SelectProps["selected"];
  setSelected: SelectProps["setSelected"];
  setInput: (input: string) => void;
  setShow: (show: boolean) => void;
  multiselect: boolean;
};

export const SelectList = ({
  list,
  selected,
  setSelected,
  setInput,
  setShow,
  multiselect,
}: SelectListProps) => {
  const updateSelected = (value: string) => {
    if (multiselect) {
      if (selected.includes(value)) {
        setSelected(selected.filter((item) => item !== value));
      } else {
        setSelected([...selected, value]);
      }
    } else {
      setSelected([value]);
      setInput("");
      setShow(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <ul
        className="max-h-[432px] overflow-auto py-2 [&::-webkit-scrollbar]:block [&scrollbar-width]:auto"
        style={{ scrollbarWidth: "auto" }}
      >
        {list.length === 0 ? (
          <li>
            <p className="px-4 py-2">No results found</p>
          </li>
        ) : (
          list.map(({ value, color }) => {
            const isNotMultiselectAndSelected = !multiselect && selected.includes(value);
            return (
              <li
                key={value}
                onClick={() => updateSelected(value)}
                className="flex items-center gap-2 transition-colors duration-300 px-4 py-2 hover:bg-[#ffe0ae2e] cursor-pointer"
                style={{
                  color: color || (isNotMultiselectAndSelected ? "#b26a00" : "#272833"),
                  fontWeight: isNotMultiselectAndSelected ? 600 : 400,
                  ...(isNotMultiselectAndSelected && { backgroundColor: "#ffe0ae2e" }),
                }}
              >
                {multiselect && <CheckBox checked={selected.includes(value)} />}
                <p className="leading-6 font-inherit text-inherit">{value}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
