// ✅ utils/github/normalizeContributions.js
function normalizeContributions(weeks) {
    const dateMap = new Map();
  
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        const contributionDate = new Date(day.date + 'T00:00:00Z');
        const localDate = new Date(
          contributionDate.getTime() + contributionDate.getTimezoneOffset() * 60000
        );
        const localDateISO = localDate.toISOString().split('T')[0];
  
        dateMap.set(localDateISO, {
          count: day.contributionCount,
          color: day.color,
        });
  
        day.date = localDateISO;
      });
    });
  
    return { weeks, dateMap };
  }
  
  module.exports = { normalizeContributions };
  