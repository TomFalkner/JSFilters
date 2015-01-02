(function() {

    "use strict";

    var GrayscaleFilter = JSFilters.namespace('image.GrayscaleFilter');

    function factory() {

        var filter = {};

        filter.canFilterIndexColorModel = true;

        filter.filterRGB = function filterRGB(x, y, r, g, b) {

            // Question - what is RGB? An array

            var result = {},
                average;

            //Average:
            // result = (r + b + g) / 3;
            // NTSC
            average = Math.floor((r * 77 + g * 151 + b * 28) / 255);

            result.r = average;
            result.g = average;
            result.b = average;

            return result;

        };

        return filter;
    }

    GrayscaleFilter.factory = factory;

})();
