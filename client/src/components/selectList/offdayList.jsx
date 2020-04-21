export const offday = [
  { _id: "5b21ca3eeb7f6fbccd47182", name: "Monday" },
  { _id: "5b21ca3eeb7f6fbccd47182", name: "Tuesday" },
  { _id: "5b21ca3eeb7f6fbccd471827", name: "Wednesday" },
  { _id: "5b21ca3eeb7f6fbccd471828", name: "Thursday" },
  { _id: "5b21ca3eeb7f6fbccd471829", name: "Friday" },
  { _id: "5b21ca3eeb7f6fbccd471830", name: "Saturday" },
  { _id: "5b21ca3eeb7f6fbccd471831", name: "Sunday" },
];

export function getOffday() {
  return offday.filter((o) => o);
}
