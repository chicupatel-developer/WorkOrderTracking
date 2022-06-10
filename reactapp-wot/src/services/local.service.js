export function getRoles() {
  return [{ name: "Admin" }, { name: "Operator" }];
}

export function getWorkOrderStatus(wos) {
  if (wos === 0) return "Not_Started";
  if (wos === 1) return "Start_Running";
  if (wos === 2) return "Completed";
  if (wos === 3) return "Can_Not_Complete";
}

export function getDaysLeft(startDate, endDate) {
  let date_1 = new Date(startDate);
  let date_2 = new Date(endDate);
  let difference = date_1.getTime() - date_2.getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays;
}
