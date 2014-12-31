(function() {

    var ConvolveFilter = JSFilters.namespace('image.ConvolveFilter');

    ConvolveFilter.ZERO_EDGES = 0;
    ConvolveFilter.CLAMP_EDGES = 1;
    ConvolveFilter.WRAP_EDGES = 2;

    function create(configObj) {

        /*
         * configObj =
         * {
         *  matrix: Array,
         *  rows: int,
         *  cols: int
         * }
         */

        var kernal,
            alpha = true,
            premultiplyAlpha = true;

        if(typeof configObj === 'undefined') {
            configObj = {};
        }

        if (typeof configObj.rows === 'undefined') {
            configObj.rows = 3;
        }

        if (typeof configObj.cols === 'undefined') {
            configObj.cols = 3;
        }

        if (typeof configObj.matrix === 'undefined') {
            configObj.matrix = [
                0.0, 0.0, 0.0,
                0.0, 0.0, 0.0,
                0.0, 0.0, 0.0];
        }

        return {};
    }

    ConvolveFilter.create = create;

})();