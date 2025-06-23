1. Binary operators (- and +):

```scss
// Before
$size: 10px;
div {
  margin: 15px -$size;
}

// After
$size: 10px;
div {
  margin: 15px - $size;
  // or
  margin: 15px (-$size);
}

// Compiled CSS (same for both)
div {
  margin: 5px;
}

// Benefit: Removes ambiguity, making it clear whether the - is intended
// as a binary operator or part of a negative value.
```

2. Division operator:

```scss
// Before
.item {
  width: (100px / 2);
}

// After
@use 'sass:math';

.item {
  width: math.div(100px, 2);
}

// Compiled CSS (same for both)
.item {
  width: 50px;
}

// Benefit: Clearly distinguishes between division operations and CSS's
// use of / as a separator, improving compatibility with new CSS features.
```

3. Color functions with incorrect units:

```scss
// Before
$color: hsl(0.5turn, 100, 50);
.element {
  color: $color;
}

// After
$color: hsl(180deg, 100%, 50%);
.element {
  color: $color;
}

// Compiled CSS (same for both, but 'Before' version may produce incorrect color)
.element {
  color: #00ffff;
}

// Benefit: Ensures correct interpretation of color values, aligning
// with CSS specifications and preventing unexpected color outputs.
```

4. color.mix() with unitless weight:

```scss
// Before
$mixed: color.mix(red, blue, 50);
.element {
  background-color: $mixed;
}

// After
$mixed: color.mix(red, blue, 50%);
.element {
  background-color: $mixed;
}

// Compiled CSS (same for both)
.element {
  background-color: #800080;
}

// Benefit: Explicitly requires percentage units for weight,
// reducing potential errors and aligning with the conceptual meaning of the parameter.
```

5. Extending compound selectors:

```scss
// Before
.message {
  border: 1px solid black;
}
.info {
  font-size: 1.5rem;
}
.heads-up {
  @extend .message.info;
}

// After
.message {
  border: 1px solid black;
}
.info {
  font-size: 1.5rem;
}
.heads-up {
  @extend .message, .info;
}

// Compiled CSS (Before - in LibSass, which is deprecated)
.message.info,
.heads-up {
  border: 1px solid black;
  font-size: 1.5rem;
}

// Compiled CSS (After - in modern Sass implementations)
.message,
.heads-up {
  border: 1px solid black;
}
.info,
.heads-up {
  font-size: 1.5rem;
}

// Benefit: Provides more predictable and intuitive behavior for extends,
// ensuring that each class is extended separately as intended.
```

6. Custom Property Declarations:

```scss
// Before
$accent-color: #fbbc04;
:root {
  --accent-color: $accent-color;
}

// After
$accent-color: #fbbc04;
:root {
  --accent-color: #{$accent-color};
}

// Compiled CSS (same for both)
:root {
  --accent-color: #fbbc04;
}

// Benefit: Improves compatibility with CSS spec and allows for more
// complex custom property values that might not be valid SassScript.
```

7. Variable Flags:

```scss
// Before
$var: value !default !default;

// After
$var: value !default;

// Benefit: Ensures consistency and removes redundant flags,
// making the code cleaner and less prone to confusion.
```

8. ECMAScript Module Import:

```javascript
// Before
import sass from 'sass';

// After
import * as sass from 'sass';

// Benefit: Aligns with proper ESM syntax and type declarations,
// ensuring better compatibility and type checking.
```

9. SassColor Constructor:

```javascript
// Before
new sass.SassColor({red: 102, green: 51, blue: 153, alpha: null});

// After
new sass.SassColor({red: 102, green: 51, blue: 153, alpha: 1});

// Benefit: Prepares for future support of CSS Color Module Level 4,
// allowing for explicit distinction between opaque and missing alpha values.
```

10. abs() Function with Percentages:

```scss
// Before
$value: abs(10%);

// After
@use 'sass:math';
$value: math.abs(10%);

// Benefit: Aligns with CSS spec behavior for abs() function,
// preventing unexpected results when working with percentages.
```

11. Function and Mixin Names:

```scss
// Before
@function --my-function() {
  /* ... */
}

// After
@function my-function() {
  /* ... */
}

// Benefit: Prepares for potential future CSS support of native functions
// and mixins, ensuring Sass can distinguish between its own and CSS declarations.
```

12. Nested Rules and Declarations Order:

```scss
// Before
.example {
  color: red;
  a {
    font-weight: bold;
  }
  font-weight: normal;
}

// After
.example {
  color: red;
  a {
    font-weight: bold;
  }
  & {
    font-weight: normal;
  }
}

// Benefit: Matches the new CSS nesting behavior, ensuring consistent
// output between Sass and native CSS nesting.
```

13. meta.feature-exists() Function:

```scss
// Before
@if meta.feature-exists('custom-properties') {
  // Use custom properties
}

// After
// Remove the check entirely, or use alternative detection methods

// Benefit: Simplifies code by removing unnecessary feature checks,
// as all modern Sass versions support these features.
```

14. Color Functions Deprecation:

```scss
// Before
@debug color.red(#c71585);
@debug saturate(#c71585, 20%);

// After
@use 'sass:color';
@debug color.channel(#c71585, 'red', $space: rgb);
@debug color.adjust(#c71585, $saturation: 20%, $space: hsl);

// Benefit: Provides unambiguous color manipulation across different color spaces,
// ensuring consistent results when working with modern CSS color features.
```

15. JS Color API Updates:

```javascript
// Before
const color = new sass.SassColor({red: 0x66, green: 0x33, blue: 0x99});
color.change({hue: 270});

// After
const color = new sass.SassColor({red: 0x66, green: 0x33, blue: 0x99});
color.change({hue: 270, space: 'okclh'});

// Benefit: Explicitly specifies the color space for transformations,
// preventing ambiguity and unexpected results when working with different color spaces.
```

16. Legacy JS API Deprecation:

```javascript
// Before (Legacy API)
sass.render(
  {
    file: 'input.scss',
    importer: function (url, prev, done) {
      // Importer logic
    },
    functions: {
      'custom-function($arg)': function (arg) {
        // Custom function logic
      },
    },
  },
  function (err, result) {
    // Callback logic
  }
);

// After (Modern API)
sass
  .compile('input.scss', {
    importers: [
      {
        canonicalize(url) {
          // Canonicalization logic
        },
        load(canonicalUrl) {
          // Load logic
        },
      },
    ],
    functions: {
      'custom-function($arg)': args => {
        // Custom function logic using modern Value class
      },
    },
  })
  .then(result => {
    // Promise resolution logic
  });

// Benefit: Provides a more modern, Promise-based API with better support for
// asynchronous operations, improved type safety, and more robust value handling.
```

17. Bundler Configuration (example for Vite):

```javascript
// Before (Vite 4)
// No configuration needed, uses legacy API by default

// After (Vite 5.4+)
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
};

// Benefit: Enables use of the modern Sass API in build tools,
// providing access to new features and improved performance.
```

---

# SASS Import

## Basic Import:

Before

```scss
@import 'variables';
@import 'mixins';

body {
  background-color: $primary-color;
  @include border-radius(5px);
}
```

After

```scss
@use 'variables';
@use 'mixins';

body {
  background-color: variables.$primary-color;
  @include mixins.border-radius(5px);
}
```

## Importing with Namespace

Before

```scss
@import 'utils/colors';
@import 'utils/functions';

.element {
  color: $primary-color;
  width: calculate-width(100%);
}
```

After

```scss
@use 'utils/colors' as c;
@use 'utils/functions' as f;

.element {
  color: c.$primary-color;
  width: f.calculate-width(100%);
}
```

## Importing Multiple Files

Before

```scss
@import 'reset', 'typography', 'layout';

body {
  @include container;
  font-family: $base-font;
}
```

After

```scss
@use 'reset';
@use 'typography' as t;
@use 'layout' as l;

body {
  @include l.container;
  font-family: t.$base-font;
}
```

## Importing with Default Namespace

Before

```scss
@import 'math';

.circle {
  width: pow(5, 2) * 1px;
}
```

After

```scss
@use 'sass:math';

.circle {
  width: math.pow(5, 2) * 1px;
}
```

## Importing and Overriding Variables:

```scss
// _variables.scss
$primary-color: blue;

// main.scss
@import 'variables';
$primary-color: red;

body {
  color: $primary-color; // red
}
```

After

```scss
// _variables.scss
$primary-color: blue !default;

// main.scss
@use 'variables' with (
  $primary-color: red
);

body {
  color: variables.$primary-color; // red
}
```

---

String Functions:

1. string.unquote($string)
2. string.quote($string)
3. string.length($string)
4. string.insert($string, $insert, $index)
5. string.index($string, $substring)
6. string.slice($string, $start-at, $end-at)
7. string.to-upper-case($string)
8. string.to-lower-case($string)
9. string.unique-id()

Math Functions: 10. math.div($number1, $number2)
11. math.percentage($number) 12. math.round($number)
13. math.ceil($number) 14. math.floor($number)
15. math.abs($number) 16. math.min($numbers...)
17. math.max($numbers...) 18. math.random(\[$limit])
19. math.unit($number) 20. math.is-unitless($number)
21. math.compatible($number1, $number2)
22. math.pow($base, $exponent)
23. math.sqrt($number) 24. math.cos($number)
25. math.sin($number) 26. math.tan($number)
27. math.acos($number) 28. math.asin($number)
29. math.atan($number) 30. math.atan2($y, $x)

List Functions: 31. list.length($list)
32. list.nth($list, $n)
33. list.set-nth($list, $n, $value)
34. list.join($list1, $list2, $separator: auto, $bracketed: auto)
35. list.append($list, $val, $separator: auto)
36. list.zip($lists...) 37. list.index($list, $value)
38. list.separator($list) 39. list.slash($elements...)

Map Functions: 40. map.get($map, $key)
41. map.merge($map1, $map2)
42. map.remove($map, $keys...)
43. map.keys($map) 44. map.values($map)
45. map.has-key($map, $key)

Color Functions: 46. color.rgb($red, $green, $blue)
47. color.rgba($red, $green, $blue, $alpha)
48. color.hsl($hue, $saturation, $lightness)
49. color.hsla($hue, $saturation, $lightness, $alpha)
50. color.adjust($color, $hue: null, $saturation: null, $lightness: null, $alpha: null)
51. color.scale($color, $hue: null, $saturation: null, $lightness: null, $alpha: null)
52. color.change($color, $hue: null, $saturation: null, $lightness: null, $alpha: null)
53. color.complement($color) 54. color.grayscale($color)
55. color.invert($color, $weight: 100%)
56. color.mix($color1, $color2, $weight: 50%)
57. color.ie-hex-str($color)

Selector Functions: 58. selector.nest($selectors...)
59. selector.append($selectors...) 60. selector.extend($selector, $extendee, $extender)
61. selector.replace($selector, $original, $replacement)
62. selector.unify($selector1, $selector2)
63. selector.is-superselector($super, $sub)
64. selector.simple-selectors($selector) 65. selector.parse($selector)

Meta Functions: 66. meta.feature-exists($feature)
67. meta.variable-exists($name) 68. meta.global-variable-exists($name)
69. meta.function-exists($name) 70. meta.mixin-exists($name)
71. meta.inspect($value) 72. meta.type-of($value)
73. meta.call($function, $args...)
74. meta.content-exists()
75. meta.module-variables($module) 76. meta.module-functions($module)

Miscellaneous Functions: 77. if($condition, $if-true, $if-false)

To use these functions, remember to import the appropriate modules at the top of your Sass file:

```scss
@use 'sass:string';
@use 'sass:math';
@use 'sass:list';
@use 'sass:map';
@use 'sass:color';
@use 'sass:selector';
@use 'sass:meta';
```
