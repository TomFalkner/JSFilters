(function() {

    var ConvolveFilter = JSFilters.namespace('image.ConvolveFilter');

    ConvolveFilter.ZERO_EDGES = 0;
    ConvolveFilter.CLAMP_EDGES = 1;
    ConvolveFilter.WRAP_EDGES = 2;

    // Really we just want a kernel as a config object but this allows for defaults
    function create(configObj) {

        /*
         * configObj =
         * {
         *  matrix: Array,
         *  rows: int,
         *  cols: int
         * }
         */

        var kernel,
            alpha = true,
            premultiplyAlpha = true,
            edgeAction = ConvolveFilter.CLAMP_EDGES;

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

        kernel = JSFilters.utils.Kernel.factory(configObj.cols, configObj.rows, configObj.matrix);

        function getKernel() {
            return kernel;
        }

        function setKernel(newKernel) {
            kernel = newKernel;
        }

        function setEdgeAction(newEdgeAction) {
            edgeAction = newEdgeAction;
        }

        function getEdgeAction() {
            return edgeAction;
        }

        function setUseAlpha(useAlpha) {
            alpha = useAlpha;
        }

        function getUseAlpha() {
            return alpha;
        }

        function setPremultiplyAlpha(alpha) {
            premultiplyAlpha = alpha;
        }

        function getPremultiplyAlpha() {
            return premultiplyAlpha;
        }

        function filter(src, dst) {
            //Assume src and dst are canvas obj?
            var width = src.width,
                height = src.height;

            if(typeof dst === "undefined") {
                dst = createCompatibleDestImage(src, null)
            }

            var inPixels = [];
            var outPixels = [];

            getRGB(src, 0, 0, width, height, inPixels); // Prob not necessary since canvas will give us direct access to pixels

            var ImageMath = {};
            if (premultiplyAlpha) {
                ImageMath.premultiply(inPixels, 0, inPixels.length);
            }
            convolve(kernel, inPixels, outPixels, width, height, alpha, edgeAction);

            if (premultiplyAlpha) {
                ImageMath.unpremultiply(outPixels, 0, outPixels.length);
            }

            setRGB(dst, 0, 0, width, height, outPixels);
            return dst;
        }

        function getRGB(src, x, y, width, height, destArray) {
            throw new Error("Implement");
            //TODO - should be in super
        }

        function createCompatibleDestImage(src, dstCM) {
            throw new Error("Implement");
            //TODO
        }

        return {
            getKernel: getKernel,
            setKernel: setKernel,
            setEdgeAction: setEdgeAction,
            getEdgeAction: getEdgeAction,
            setUseAlpha: setUseAlpha,
            getUseAlpha: getUseAlpha,
            setPremultiplyAlpha: setPremultiplyAlpha,
            getPremultiplyAlpha: getPremultiplyAlpha,
            filter: filter
        };
    }

    ConvolveFilter.factory = create;

})();