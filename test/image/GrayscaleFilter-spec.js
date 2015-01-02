describe('A Grayscale Filter', function() {

    it('Should exist', function() {
        expect(JSFilters.image.GrayscaleFilter).toBeDefined();
    });

    it('Should average pixel values', function() {

        var filter = JSFilters.image.GrayscaleFilter.factory(),
            gray = filter.filterRGB(0, 0, 150, 100, 60);

        expect(gray.r).toEqual(111);
        expect(gray.g).toEqual(111);
        expect(gray.b).toEqual(111);

    });

});