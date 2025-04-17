function todayIncluded(weeks, todayISO) {
    let todayIncluded = false;
    const lastWeek = weeks[weeks.length - 1];
  
    for (const day of lastWeek.contributionDays) {
      if (day.date === todayISO) {
        todayIncluded = true;
        break;
      }
    }
  
    if (!todayIncluded) {
      lastWeek.contributionDays.push({
        date: todayISO,
        contributionCount: 0,
        color: '#ebedf0',
      });
    }
  
    return weeks;
  }
  
  module.exports = { todayIncluded };
  