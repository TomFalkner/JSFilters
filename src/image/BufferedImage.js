(function() {

    "use strict";

    var BufferedImage = JSFilters.namespace('image.BufferedImage');

    function factory(canvas) {

        var width = canvas.width,
            height = canvas.height,
            context,
            imageData,
            ImageMath = JSFilters.image.ImageMath,
            x = 0,
            y = 0;

        context = getContext();
        imageData = getData();

        function getX() {
            return x;
        }

        function setY(position) {
            y = position;
        }

        function setX(position) {
            x = position;
        }
        
        function getY() {
            return y;
        }

        function getBounds() {
            return {
                x: getX(),
                y: getY(),
                width: width,
                height: height
            }
        }
        
        function getData() {
            return context.getImageData(0, 0, canvas.width, canvas.height);
        }

        function getContext() {
            return canvas.getContext('2d');
        }

        function getPixel(x, y) {

            var location = getLocation(x, y),
                pixel = 0;

            //switch from RGBA to ARGB to Save conversion headaches
            // location + 0 = R
            // location + 1 = G
            // location + 2 = B
            // location + 3 = A

            pixel = pixel | ImageMath.toUint32(imageData.data[location + 3] << 24) | imageData.data[location] << 16 | imageData.data[location + 1] << 8 | imageData.data[location + 2];

            return pixel;
        }

        function setPixel(x, y, pixel) {

            var context = getContext(),
                newData = context.createImageData(1, 1);

            newData.data[0] = (pixel >> 16) & 0xFF;
            newData.data[1] = (pixel >> 8) & 0xFF;
            newData.data[2] = pixel & 0xFF;
            newData.data[3] = pixel & 0xFF000000;

            context.putImageData(newData, x, y);

        }

        function getLocation(x, y) {
            return ((y * width) + x) * 4;
        }

        function drawImage(img, x, y) {

            var imgX,
                imgY,
                context = getContext();

            if (arguments.length === 1) {
                imgX = 0;
                imgY = 0;
            } else {
                imgX = x;
                imgY = y;
            }

            context.drawImage(img, imgX, imgY);
            imageData = getData();
        }


        return {
            drawImage: drawImage,
            setX: setX,
            setY: setY,
            getBounds: getBounds,
            getData: getData,
            getContext: getContext,
            getPixel: getPixel,
            setPixel: setPixel
        }
    }
    
    BufferedImage.factory = factory;
    
})();
