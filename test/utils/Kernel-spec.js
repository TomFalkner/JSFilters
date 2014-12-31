describe("Kernel", function() {

    it("Should exist", function() {
        expect(JSFilters.utils.Kernel).toBeDefined();
    });

    describe("Kernel Width and Height", function() {

        var testWidth,
            testHeight,
            testMatrix;

        beforeEach(function() {

            testWidth = 3;
            testHeight = 3;
            testMatrix = [0, 0, 0, 0, 1, 0, 0, 0, 0];

        });

        it("Should have a width", function() {

            var newKernel = JSFilters.utils.Kernel.factory(testWidth, testHeight, testMatrix);
            expect(newKernel.getWidth()).toEqual(3);

        });

        it("Should have a height", function() {

            var newKernel = JSFilters.utils.Kernel.factory(testWidth, testHeight, testMatrix);
            expect(newKernel.getHeight()).toEqual(3);

        });

        it("Should ensure the matrix is the proper size", function() {

            var badMatrix = [1, 2, 3];
            //Have to use bind or else the exception is not caught.
            expect(JSFilters.utils.Kernel.factory.bind(null, testWidth, testHeight, badMatrix)).toThrow();
        });
    });
});