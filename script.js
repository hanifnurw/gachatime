document.addEventListener('DOMContentLoaded', function () {
  // Get all checkboxes
  const checkboxes = document.querySelectorAll('.task-checkbox');

  // Reset checkboxes to unchecked state
  function resetCheckboxes() {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  }

  // Reset checkboxes every day at 07:00 GMT+7
  function resetDaily() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(7);
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);
    
    // If it's already past 07:00, schedule the reset for the next day
    if (now >= targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const timeUntilReset = targetTime - now;
    
    setTimeout(function(){
      resetCheckboxes();
      setInterval(resetCheckboxes, 24 * 60 * 60 * 1000); // Repeat every 24 hours after the first reset
    }, timeUntilReset);
  }

  resetDaily(); // Start the reset process
});
