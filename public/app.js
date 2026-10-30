(function () {
  'use strict';

  var POLL_MS = 1000;
  var STATUS_URL = 'api/status';

  var timeEl = document.getElementById('server-time');
  var visitsEl = document.getElementById('visits');
  var noteEl = document.getElementById('status-note');

  var formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  var inFlight = false;

  function formatTime(iso) {
    var date = new Date(iso);
    if (isNaN(date.getTime())) {
      return null;
    }
    return formatter.format(date);
  }

  function showFailure() {
    noteEl.textContent = 'Connection problem: showing last known values.';
  }

  function showSuccess() {
    noteEl.textContent = '';
  }

  function poll() {
    if (inFlight) {
      return;
    }
    inFlight = true;

    fetch(STATUS_URL, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        var time = formatTime(data.time);
        var visits = data.visits;
        if (time === null || typeof visits !== 'number') {
          throw new Error('Unexpected response shape');
        }
        timeEl.textContent = time;
        visitsEl.textContent = String(visits);
        showSuccess();
      })
      .catch(function () {
        showFailure();
      })
      .then(function () {
        inFlight = false;
      });
  }

  poll();
  setInterval(poll, POLL_MS);
})();
