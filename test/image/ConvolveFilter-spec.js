describe("Convolve Filter", function() {

    it("Should exist", function() {
        expect(JSFilters.image.ConvolveFilter).toBeDefined();
    });

    it("Should expose constants", function() {
        expect(JSFilters.image.ConvolveFilter.ZERO_EDGES).toBeDefined();
        expect(JSFilters.image.ConvolveFilter.CLAMP_EDGES).toBeDefined();
        expect(JSFilters.image.ConvolveFilter.WRAP_EDGES).toBeDefined();
    });

    it("Should create a new filter", function() {

        var newFilter = JSFilters.image.ConvolveFilter.factory();

        expect(newFilter).toBeDefined();
    });
});