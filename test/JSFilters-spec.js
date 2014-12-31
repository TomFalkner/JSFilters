describe("JSFilters Module", function(){

    it("Should have a namespace method", function() {
        expect(JSFilters.namespace).toBeDefined();
    });

    it("Should create a new namespace", function() {

        JSFilters.namespace("images.foo");

        expect(JSFilters.images.foo).toBeDefined();

    });

    it("Should not overwrite an existing namespace", function() {

        JSFilters.special = {
            foo: 'bar'
        };

        JSFilters.namespace("special.baz");
        expect(JSFilters.special.foo).toBe('bar');
    })

});
