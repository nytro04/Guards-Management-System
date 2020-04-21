export const status = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Active" },
  { _id: "5b21ca3eeb7f6fbccd471819", name: "Inactive" },
];

export function getStatus() {
  return status.filter((s) => s);
}
