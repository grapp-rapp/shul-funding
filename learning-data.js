(function(scope) {
  'use strict';
  const cities = [
    ['281184','Jerusalem','ירושלים'], ['295432','Beit Shemesh','בית שמש'], ['295514','Bnei Brak','בני ברק'],
    ['293397','Tel Aviv','תל אביב'], ['294801','Haifa','חיפה'], ['295629','Ashdod','אשדוד'],
    ['294071','Netanya','נתניה'], ['293918','Petach Tikva','פתח תקווה'], ['293100','Tzfat','צפת'], ['293322','Tiberias','טבריה']
  ];
  const monthly = ['1-9','10-17','18-22','23-28','29-34','35-38','39-43','44-48','49-54','55-59','60-65','66-68','69-71','72-76','77-78','79-82','83-87','88-89','90-96','97-103','104-105','106-107','108-112','113-118','119:1-96','119:97-176','120-134','135-139','140-144','145-150'];
  function israelDay(now = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit' }).format(now); }
  function addDays(day, n) { const d = new Date(day + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0,10); }
  function tehillim(day, nextDay) { return day === 29 && nextDay === 1 ? '140-150' : monthly[day - 1]; }
  const api = { cities, monthly, israelDay, addDays, tehillim };
  if (typeof module !== 'undefined') module.exports = api; else scope.LearningData = api;
})(typeof window === 'undefined' ? {} : window);
