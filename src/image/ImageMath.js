(function() {

    var ImageMath = JSFilters.namespace('image.ImageMath');

    ImageMath.PI = Math.PI;
    ImageMath.HALF_PI = Math.PI / 2.0;
    ImageMath.QUARTER_PI = Math.PI / 4.0;
    ImageMath.TWO_PI = Math.PI * 2.0;

    // Javascript really hates integers.
    // http://www.2ality.com/2012/02/js-integers.html

    ImageMath.toInteger = function toInteger(x) {
        var result = Number(x);
        return result < 0 ? Math.ceil(result) : Math.floor(result);
    };

    ImageMath.modulo = function modulo(a, b) {
        return a - Math.floor(a/b) * b;
    };

    ImageMath.toUint32 = function toUint32(x) {
        return x >>> 0;
        //return ImageMath.modulo(ImageMath.toInteger(x), Math.pow(2, 32));
    };

    ImageMath.toInt32 = function toInt32(x) {
        return x >> 0;
        //var uint32 = ImageMath.toUint32(x);
        //
        //if (uint32 >= Math.pow(2, 31)) {
        //    return uint32 - Math.pow(2, 32);
        //} else {
        //    return uint32;
        //}
    };

    /* Apply a bias to a number in the unit interval, moving numbers towards 0 or 1
     * according to the bias parameter
     * @param a the number to bias
     * @param b the bias parameter. 0.5 means no change, smaller values bias towards 0, larger towards 1.
     * @return the output value
     */
    ImageMath.bias = function bias(a, b) {
        return a / ((1.0 / b - 2) * (1.0 -a) + 1);
    };

    /* A variant on the gamma function
     * http://mathworld.wolfram.com/GammaFunction.html or http://en.wikipedia.org/wiki/Gamma_function (better)
     * @param a the number to apply gain to
     * @param b the gain parameter 0.5 means no change, smaller values bias towards 0, larger towards 1.
     * @return the output value
     */
    ImageMath.gain = function gain(a, b) {

        var c = (1.0 / b - 2.0) * (1.0 - 2.0 * a);

        if (a < 0.5) {
            return a / (c + 1.0);
        } else {
            return (c - a) / (c - 1.0);
        }
    };

    /*
     * Step function. Returns 0 below a threshold, 1 above.
     * @return 0 or 1
     */
    ImageMath.step = function step(thresholdPosition, input) {
        return (input < thresholdPosition) ? 0 : 1;
    }

    /*
     * Pulse function. Returns 1 between two thresholds, 0 outside
     */

    ImageMath.pulse = function pulse(lowerThreshold, upperThreshold, input) {
        return (input < lowerThreshold || input >= upperThreshold) ? 0 : 1;
    };

    ImageMath.smoothPulse = function smoothPulse(lowerThresholdStart, upperThresholdStart, lowerThresholdEnd, upperThresholdEnd, input) {

        if (input < lowerThresholdStart || input >= upperThresholdEnd) {
            return 0;
        }
        if (input >= upperThresholdStart) {
            if (input < lowerThresholdEnd) {
                return 1;
            }
            input = (input - lowerThresholdEnd) / (upperThresholdEnd - lowerThresholdEnd);
            return 1 - (input * input * (3 - 2 * input));
        }
        input = (input - lowerThresholdStart) / (upperThresholdStart - lowerThresholdStart);
        return input * input * (3 - 2 * input);
    };

    ImageMath.smoothStep = function smoothStep(lowerThreshold, upperThreshold, input) {
        if (input < lowerThreshold) {
            return 0;
        }

        if (input >= upperThreshold) {
            return 1;
        }
        input = (input - lowerThreshold) / (upperThreshold - lowerThreshold);

        return input * input * ( 3 - 2 * input);
    };

    ImageMath.circleUp = function circleUp(input) {
        var result = 1 - input;
        return Math.sqrt(1 - result * result);
    };

    ImageMath.clamp = function clamp(input, lowerThreshold, upperThreshold) {
        return (input < lowerThreshold) ? lowerThreshold : (input > upperThreshold) ? upperThreshold : input;
    };

    ImageMath.mod = function mod(dividend, divisor) {
        var n = dividend / divisor;

        var result = dividend - (n * divisor);
        if (result < 0) {
            return result + divisor;
        }
        return result;
    };

    ImageMath.triangle = function triangle(input) {
        var r = ImageMath.mod(input, 1.0);
        return 2 * (r < 0.5 ? r : 1 - r);
    };

    ImageMath.lerp = function lerp(interpolation, lower, upper) {
        return lower + interpolation * (upper - lower);
    };

    // Linear interpolation of ARGB values.
    ImageMath.mixColors = function mixColors(interpolation, rgb1, rgb2) {
        throw new Error("Figure out how you're handling RGB values");
        // Java library stores RGB values as ints in ARGB format.
        // Canvas stores RGB in array of values from 1-255 in RGBA format
        // Plus side, js does have bitwise operators.

        //Original implementation:
        var a1 = (rgb1 >> 24) & 0xff,
            r1 = (rgb1 >> 16) & 0xff,
            g1 = (rgb1 >> 8) & 0xff,
            b1 = rgb1 & 0xff,
            a2 = (rgb2 >> 24) & 0xff,
            r2 = (rgb2 >> 16) & 0xff,
            g2 = (rgb2 >> 8) & 0xff,
            b2 = rgb2 & 0xff;

        a1 = lerp(interpolation, a1, a2);
        r1 = lerp(interpolation, r1, r2);
        g1 = lerp(interpolation, g1, g2);
        b1 = lerp(interpolation, b1, b2);

        return (a1 << 24) | (r1 << 16) | (g1 << 8) | b1;
    };



    // Bilinear interpolation of ARGB values
    // stop ImageMath.java line 289

})();