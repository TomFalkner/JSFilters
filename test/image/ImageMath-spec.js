describe("ImageMath", function() {

    var ImageMath;

    beforeEach(function() {
        ImageMath = JSFilters.image.ImageMath;
    });

    it("Should Exist", function() {
        expect(JSFilters.image.ImageMath).toBeDefined();
    });

    it("Should provide a step function", function() {
        expect(ImageMath.step(2.2, 1.1)).toEqual(0);
        expect(ImageMath.step(0.2, 1.1)).toEqual(1);
    });

    it("Should provide a step function", function() {
        expect(ImageMath.gain(0.5, 0.5)).toEqual(0.5);
        //expect(JSFilters.image.ImageMath.gain(12, 0.2)).toEqual(2);
        //TODO More testing
    });

    it("Should provide a pulse function", function() {
        expect(ImageMath.pulse(2, 5, 3)).toEqual(1);
        expect(ImageMath.pulse(2, 5, 6)).toEqual(0);
        expect(ImageMath.pulse(2, 5, 1)).toEqual(0);
    });

    it("Should provide a smooth pulse function", function() {
        expect(ImageMath.smoothPulse).toBeDefined();
        //TODO: Test
    });

    it("Should provide a smooth step function", function() {
        expect(ImageMath.smoothStep).toBeDefined();
        //TODO: Test
    });

    it("Should provide a circle up function", function() {
        expect(ImageMath.circleUp).toBeDefined();
        //TODO: Test
    });

    it("Should provide a clamp function", function() {
        expect(ImageMath.clamp(3, 2, 5)).toEqual(3);
        expect(ImageMath.clamp(6, 2, 5)).toEqual(5);
        expect(ImageMath.clamp(1, 2, 5)).toEqual(2);
    });
});