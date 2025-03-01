export const kebabToTitleCase = (input: string): string => {
  // Split the input string by hyphen ('-'), capitalize each word, and join with a space
  return input
    .split("-") // Split the string into an array by '-'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back with a space
};
