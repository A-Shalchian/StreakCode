function calculateStreaks(allDays, todayISO, yesterdayContributionCount, todayContributionCount) {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
  
    const sortedDays = [...allDays].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    for (const day of sortedDays) {
      if (day.date === todayISO) continue;
      if (day.contributionCount > 0) currentStreak++;
      else break;
    }
  
    if (todayContributionCount > 0 && (yesterdayContributionCount > 0 || currentStreak === 0)) {
      currentStreak++;
    }
  
    for (const day of sortedDays) {
      if (day.contributionCount > 0) {
        tempStreak++;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 0;
      }
    }
  
    maxStreak = Math.max(maxStreak, tempStreak);
  
    return { currentStreak, maxStreak };
  }
  
  module.exports = { calculateStreaks };
  