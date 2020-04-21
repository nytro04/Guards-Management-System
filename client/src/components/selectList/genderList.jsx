export const gender = [
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Male" },
  { _id: "5b21ca3eeb7f6fbccd471821", name: "Female" },
];

export function getGender() {
  return gender.filter((s) => s);
}
