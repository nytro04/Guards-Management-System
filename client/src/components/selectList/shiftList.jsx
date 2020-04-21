export const shift = [
  { _id: "5b21ca3eeb7f6fbccd471822", name: "Day" },
  { _id: "5b21ca3eeb7f6fbccd471823", name: "Night" },
  { _id: "5b21ca3eeb7f6fbccd471824", name: "Reliever" },
];

export function getShift() {
  return shift.filter((sh) => sh);
}
