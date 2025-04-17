function getLocalDateStrings() {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
  
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    const todayISO = today.toISOString().split('T')[0];
    const yesterdayISO = yesterday.toISOString().split('T')[0];
  
    return { todayISO, yesterdayISO };
  }
  
  module.exports = { getLocalDateStrings };
  