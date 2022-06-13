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

export function getOperationStatus(ops) {
  if (ops === 0) return "Not_Started";
  if (ops === 1) return "Start_Running";
  if (ops === 2) return "Pause_Running";
  if (ops === 3) return "Completed";
  if (ops === 4) return "Can_Not_Complete";
}

export function getOperationNumber(opn) {
  if (opn === 10) return opn + "- Spindle";
  if (opn === 20) return opn + "- Hub_Single_Head";
  if (opn === 30) return opn + "- Hub_Double_Head";
  if (opn === 40) return opn + "- Push_Cups";
  if (opn === 50) return opn + "- Assembly_Spindle_Hub";
  if (opn === 60) return opn + "- Paint";
  if (opn === 70) return opn + "- Packaging";
  if (opn === 80) return opn + "- Rework_Spindle";
  if (opn === 90) return opn + "- Rework_Hub";
}

export function getOperationStatusForOperator(ops) {
  if (ops === 0) return "Start_Running";
  if (ops === 1) return "Pause_Running";
}
