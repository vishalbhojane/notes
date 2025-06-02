Create a function `euclideanDistance` that calculates the Euclidean distance between two points in n-dimensional space. The Euclidean distance is the "ordinary" straight-line distance between two points in Euclidean space.

## Solution

```javascript
function euclideanDistance(point1, point2) {
    if (point1.length !== point2.length) {
        throw new Error("Points must have the same number of dimensions");
    }

    return Math.hypot(...point1.map((coord, i) => point2[i] - coord));
}
```

Core Logic:
1. Check if both points have the same number of dimensions.
2. Use `Math.hypot()` to calculate the square root of the sum of squares of the differences between corresponding coordinates.
3. The `map` function is used to calculate the differences, and the spread operator `...` is used to pass these differences as separate arguments to `Math.hypot()`.

Usage

```javascript
console.log(euclideanDistance([1, 1], [2, 3]));       // ~2.2361 (2D)
console.log(euclideanDistance([1, 1, 1], [2, 3, 2])); // ~2.4495 (3D)
console.log(euclideanDistance([1, 1, 1, 1], [2, 3, 2, 3])); // ~3.1623 (4D)
```

## Complexity

Time Complexity: O(n), where n is the number of dimensions. We iterate through each dimension once.

Space Complexity: O(n), as we create an array of differences with the same length as the input points.

Note: The use of `Math.hypot()` is both efficient and accurate, as it avoids intermediate overflow or underflow when calculating sums of squares.

## Mathematical Background

The Euclidean distance is calculated using the Pythagorean theorem:

1. For 1D: d = |x₂ - x₁|
2. For 2D: d = √((x₂ - x₁)² + (y₂ - y₁)²)
3. For 3D: d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²)
4. For n dimensions: d = √(Σ(pᵢ - qᵢ)²), where i = 1 to n

The `Math.hypot()` function efficiently computes this square root of the sum of squares.