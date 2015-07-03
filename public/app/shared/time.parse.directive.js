(function() {
  'use strict';

  angular
    .module('eo')
    .directive('eoParseDate', [eoParseDate]);

  function eoParseDate() {
    return {
      scope: {
        date: '='
      },
      link: linkFn,
      template: '<span>{{output.date}} @ {{output.hours}}:{{output.minutes}}</span>'
    };

    function linkFn(scope, element, attrs) {
      scope.$watch('date', parseDate);

      function parseDate() {
        var originalDate = scope.date,
          parsed = new Date(originalDate),
          date = parsed.toLocaleDateString(),
          hours = parsed.getHours(),
          minutes = parsed.getMinutes();

        scope.output = {
          date: date,
          hours: correctZeroTime(hours),
          minutes: doubleDigitTime(correctZeroTime(minutes))
        };

        // If the input was done at the top of an hour (ex: 13:00 or 15:00),
        // getMinutes() returns 0 as an integer, rather than '00'
        // This corrects it for viewing ease.
        function correctZeroTime(time) {
          return time === 0 ? '00' : time;
        }

        // Fixes scenario where getMinutes() returns single digit
        function doubleDigitTime(mins) {
          return mins < 10 ? '0' + mins : mins;
        }
      }
    }
  }
})();
