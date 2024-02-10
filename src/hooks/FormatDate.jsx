export const FormatDate = (due) => {
  let due_date = Date(due).toString().split(" ");
  const year = due_date[3];
  const month = due_date[1];
  const date = due_date[2];

  return { year, month, date };
};
