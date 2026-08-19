const borrow_period = 7;
const first_due_timeperiod = 3
const first_due_penalty = 1
const second_due_penalty = 2;
const maxmium_penalty_amount = 15;

const mili_second_per_day = 1000 * 60 * 60 * 24;

function getDueDate(issued_date) {
  const due = new Date(issued_date)
  due.setDate(due.getDate() + borrow_period)
  return due;
}

function daysBetween(a, b) {
  const start = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const end = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((end - start) / mili_second_per_day);
}

function calculatePenalty(dueDate, today = new Date()){
  const daysOverdue = daysBetween(new Date(dueDate), today)
  if (daysOverdue <= 0)
    return 0;

  const first_due = Math.min(daysOverdue, first_due_timeperiod)
  const second_due = Math.max(daysOverdue - first_due_timeperiod, 0)
  const penalty = (first_due * first_due_penalty) + (second_due * second_due_penalty)
  return Math.min(penalty,maxmium_penalty_amount)
}


function getStatus(dueDate, today = new Date()) {
  const daysUntilDue = daysBetween(today, new Date(dueDate))

  if (daysUntilDue < 0) return 'overdue'
  if (daysUntilDue === 1) return 'dueTomorrow'
  return 'safe'
}

module.exports = {
  getDueDate,
  daysBetween,
  calculatePenalty,
  getStatus,
  borrow_period,
}
