Filters.
========

Base class is WholeImageFilter.

Has the following methods:
filter(BufferedImage src, BufferedImage dst);

//This calculates the output bounds for given input bounds
protected void transformSpace(Rectangle rect);

//And an abstract method to actually filter the pixels.
protected abstract int[] filterPixels(int width, int height, int[] inPixels, Rectangle transformedSpace);

WarpFilter.
• Takes two warp girds. How are those defined?
• A point in the Source Grid moves to its counterpart in the destination grid.

Constructor:
WarpFilter(WarpGrid sourceGrid, WarpGrid destGrid);

Other methods:
setSourceGrid(WarpGrid sourceGrid);
getSourceGrid()
setDestGrid()
setFrames(int frames)
getFrames()
• Special method for morphing (otherwise it's just warping)
setMorphImage(BufferedImage morphImage)
getMorphImage
setTime(float time)
getTime()
transformSpace(Rectangle r)

int[] filterPixels(int width, int height, int[] inPixels, Rectangle transformedSpace )

So it's complex but.. really its just translating one grid to another.



TODO (Re)Read WarpGrid class

WarpGrid.
There are two float arrays:
xGrid <- initialized with rows*cols
yGrid <- initialized with rows*cols
Plus Dimensions:
int rows
int cols

Constructor separates between rows and columns as well as width and height.
WarpGrid(int rows, int cols, int w, int h)

This is how the xGrid and yGrid are defined.

for (int row = 0; row < rows; row++) {
	for (int col = 0; col < cols; col++) {
		xGrid[index] = (float)col*(w-1)/(cols-1);
		yGrid[index] = (float)row*(h-1)/(rows-1);
		index++;
	}
}

So the index increases with each one...

there is a method to addRow(int before)
• before must be in the range of 1..rows - 1
as well as a addCol(int before) that works similarly

As well as
removeRow(int r)
removeCol(int r)

methods.

Source and destination must be the same size. 
LERP = a quasi-acronym for linear interpolation http://en.wikipedia.org/wiki/Linear_interpolation

A digression:
linear interpolation is a method of curve fitting using linear polynomials

So there is a lerp(float t, WarpGrid destination, WarpGrid intermediate) method
It goes through and computes the difference between points

A digression:
spline (http://en.wikipedia.org/wiki/Spline_%28mathematics%29) = a numeric function that is piecewise-defined by polynomial functions http://en.wikipedia.org/wiki/Polynomial#Polynomial_functions

/////

Kernals.

Located in java.awt.image
The Kernal class defines a matrix that describes how a specified pixel and its surrounding pixels affect the value computed for the pixel's position in the output image of a filtering operation. 

The X origin and the Y origin indicate the kernal matrix element that corresponds to the pixel position for which an output value is being computed

A Kernal is also known as convolution matrix:
http://en.wikipedia.org/wiki/Kernel_%28image_processing%29



