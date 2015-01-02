(function() {

    "use strict";

    var GrayscaleFilter = JSFilters.namespace('image.GrayscaleFilter');

    function factory() {

        var filter = {};

        filter.canFilterIndexColorModel = true;

        filter.filterRGB = function filterRGB(x, y, rgb) {

            //Average:
            // result = (r + b + g) / 3;
            // NTSC
            //average = Math.floor((r * 77 + g * 151 + b * 28) / 255);

            var a = rgb & 0xFF000000,
                r = (rgb >> 16) & 0xFF,
                g = (rgb >> 8) & 0xFF,
                b = rgb & 0xFF,
                result = 0;

            result = (r * 77 + g * 151 + b * 28) >> 8;

            return a | (result << 16)  | (result << 8) | result;

        };

        return filter;
    }

    GrayscaleFilter.factory = factory;

})();
