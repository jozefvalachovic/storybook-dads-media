// HTML pattern attributes require escaped characters
export const emailPatternString = "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}";
export const passwordPatternString = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{16,}$";

// Keep regex for JS validation
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{16,}$/;

// Format functions

export function capitalize(value: string) {
  const words = value.split(" ");

  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
