(function() {

    var Kernel = JSFilters.namespace('utils.Kernel');

    function factory(width, height, matrix) {

        var kernelWidth,
            kernelHeight,
            kernelMatrix;

        kernelWidth = width;
        kernelHeight = height;

        if (matrix.length !== width * height) {
            throw new Error("Expected matrix to equal kernel width * height");
        }

        kernelMatrix = matrix;

        return {
            getHeight: function() {
                return kernelHeight;
            },
            getWidth: function() {
                return kernelWidth;
            },
            getKernelData: function() {
                return kernelMatrix;
            },
            getXOrigin: function() {
                return (width - 1) / 2;
            },
            getYOrigin: function() {
                return (height - 1) / 2;
            }
        };
    }

    Kernel.factory = factory;

})();