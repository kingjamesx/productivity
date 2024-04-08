export const FormatDate = (due, done = false) => {
  let due_date;

  done
    ? (due_date = due.toString().split(' '))
    : (due_date = new Date(due).toString().split(" "));
    
  const year = due_date[3];
  const month = due_date[1];
  const date = due_date[2];

  return { year, month, date };
};
