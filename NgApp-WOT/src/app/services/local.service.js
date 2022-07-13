export function getMinutes() {
  var minArr = [];
  for (let i = 0; i <= 59; i++) {
    if (i < 10) minArr.push({ value: "0" + i });
    else minArr.push({ value: i + "" });
  }
  return minArr;
}

export function getRoles() {
  return [{ name: "Admin" }, { name: "Operator" }];
}

export function getWorkOrderStatusToDisplay() {
  return [
    { value: 0, woStatus: "Not_Started" },
    { value: 1, woStatus: "Start_Running" },
    { value: 2, woStatus: "Completed" },
    { value: 3, woStatus: "Can_Not_Complete" },
  ];
}

export function getOperationStatusToDisplay() {
  return [
    { value: 0, opStatus: "Not_Started" },
    { value: 1, opStatus: "Start_Running" },
    { value: 2, opStatus: "Pause_Running" },
    { value: 3, opStatus: "Completed" },
    { value: 4, opStatus: "Can_Not_Complete" },
  ];
}

export function getOperationNumberToDisplay() {
  return [
    { value: 10, opNumber: "Spindle" },
    { value: 20, opNumber: "Hub_Single_Head" },
    { value: 30, opNumber: "Hub_Double_Head" },
    { value: 40, opNumber: "Push_Cups" },
    { value: 50, opNumber: "Assembly_Spindle_Hub" },
    { value: 60, opNumber: "Paint" },
    { value: 70, opNumber: "Packaging" },
    { value: 80, opNumber: "Rework_Spindle" },
    { value: 90, opNumber: "Rework_Hub" },
  ];
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

export function getHours() {
  var hrArr = [];

  for (let i = 1; i <= 12; i++) {
    if (i < 10) hrArr.push({ value: "0" + i });
    else hrArr.push({ value: i + "" });
  }
  return hrArr;
}
