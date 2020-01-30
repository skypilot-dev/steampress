## <small>1.3.2 (2020-01-30)</small>

* Automatically publish master & edge releases ([82c12d1](https://github.com/skypilotcc/steampress/commit/82c12d1))
* refactor: Update all dependencies ([ec1c1ff](https://github.com/skypilotcc/steampress/commit/ec1c1ff))
* refactor: Update Toolchain tooling configs ([63f8d70](https://github.com/skypilotcc/steampress/commit/63f8d70))



## <small>1.3.1 (2019-12-07)</small>

* Update all dependencies ([4f2eabf](https://github.com/skypilotcc/steampress/commit/4f2eabf))
* add: Show more informative error message when invalid data is found ([941f475](https://github.com/skypilotcc/steampress/commit/941f475))



## 1.3.0 (2019-11-27)

* chg!: Renamed `exclude` to `excludeThisColumn` for clarity ([6c78491](https://github.com/skypilotcc/steampress/commit/6c78491))
* add: Can check whether cell content matches a regular expression ([d363175](https://github.com/skypilotcc/steampress/commit/d363175))
* add: Can transform cell content prior to validation ([7fe3fc3](https://github.com/skypilotcc/steampress/commit/7fe3fc3))



## 1.2.0 (2019-11-26)

* add: Can conditionally exclude a cell from the output ([7b4fc02](https://github.com/skypilotcc/steampress/commit/7b4fc02))



## <small>1.1.3 (2019-11-25)</small>




## <small>1.1.3-beta (2019-11-25)</small>

* chg: `defaultValue` > `ignoreRowIf` > `disallowEmptyCells...` ([84ddc98](https://github.com/skypilotcc/steampress/commit/84ddc98))
* chg: New `ignoreRowIf` option supersedes old `ignoreRowIf...` options ([07818db](https://github.com/skypilotcc/steampress/commit/07818db))
* add: Can ignore a row when a cell is empty ([6db9d67](https://github.com/skypilotcc/steampress/commit/6db9d67))



## <small>1.1.2 (2019-11-25)</small>

* Add missing details to package file ([1291d27](https://github.com/skypilotcc/steampress/commit/1291d27))



## <small>1.1.1 (2019-11-25)</small>

* fix: When false, 'ignore row' checks should not bypass validators 0a48a37



## 1.1.0 (2019-11-25)

* add: Cell-content validator accepts custom validation functions 45e3a9a
* Rename cell `validators` to `cellValidators` e9d6a26



## 1.1.0-beta (2019-11-24)

* add: `addProperty` & `duplicateProperty` can be called without `bind` 85165d1
* add: A default value can be set for empty cells 1455329
* add: Can omit a row when a cell contains a falsy value 940a49f
* add: Can set a column's data type & reject values of incorrect type 5215ca1
* add: Can set permitted values & reject nonpermitted values 7bd8c0f
* add: Can specify integer as a column's data type c94a3d8
* add: Columns can be parsed without configuration 558608f
* add: Empty values can be disallowed for a cell or all cells 104a4a2
* add: Rows can be omitted when cell content is truthy 846039d
* Disallow empty cells 5f015f5
* Make the row index passed to the row parser optional bfe9dbf
* Refactor data-type validation & tests d85dd5b
* Reformat & reorganize code 77c024c
* Rename tests to conform to convention 66c9064
* Simplify row-parsing tests 9e34dbb
* Update dependencies 90bb3d6
* fix: Transforms should not be applied to a default value 544a869



## 1.0.0 (2019-11-24)

* Add author's email to package file 5011b23
* Add convenience scripts to package file 15bfece
* Add function to test a value against multiple validators 662fafc
* Add function to validate a value's data type 1460ec3
* Add ISC license 5638cc6
* Add typings of JSON objects 5995c8c
* chg!: Rename `cellPretransformers` to `globalCellTransformers` 0c96449
* chg!: Rename cell 'transformers' option to 'cellTransformers' 07e591b
* chg!: Rename options controlling whether empty cells are disallowed b9a0ace
* chg!: Rename sheet `transformers` to `sheetTransformers` 3904584
* Customize the Bumped config 6cc987a
* Housekeeping 0334fd8
* Install & initialize Bumped 48188e4
* Install Common Types e4a8ce7
* Move parsing options interfaces to types file 96a30cd
* Move row-parsing functionality to separate function 7c675a0
* Move the function that applies transforms to a separate file 1443abb
* Remove duplicate types 2186218
* Rename ParseExcelSheetOptions to ParseSheetOptions 206a410
* Rename sheet parsing options var for clarity aa124e4
* Return null from the row parser to signify a skipped row 37d9dfb
* Update dependencies 71a3c47
* v0.5.10-alpha b9d7aec


### BREAKING CHANGE

* The `disallowEmptyCells` property of `ParseSheetOptions` and `ParseColumnOptions` has been renamed to `disallowEmptyCellsInSheet` and `disallowEmptyCellsInColumn` for clarity
* The `transformers` option of `ParseColumnOptions` has been renamed to `cellTransformers`. The change has been made for the sake of clarity (it might have been assumed that the transformers applied to the entire column), and also to make room for an eventual `columnTransformers` property.
* The change is one of a series of changes intended to avoid confusion among the various kinds of transformers.


## <small>0.5.9-alpha (2019-11-20)</small>

* Update dependencies 190ff3c
* v0.5.9-alpha a6f2bd7
* feat: Can use a named export instead of a default export 1f54c8c



## <small>0.5.8-alpha (2019-11-18)</small>

* Add configuration for GitHub Actions workflow 1d26514
* Install & initialize Toolchain 5794279
* Remove all dev dependencies aeea933
* Remove configuration for CircleCI workflow b6c0493
* Reorder imports and add section headings to code 9fc3b7b
* Resolve type issues revealed by stricter type-checking 80667f5
* v0.5.8-alpha 8ab36fb
* sec: Close vulnerability in eslint-utils 455c2f7



## <small>0.5.6-alpha (2019-11-04)</small>

* Add some missing typings d8a696d
* Add type-checking and testing to prepublish script a606adb
* Configure CircleCI 8098731
* Move tests to subdirectories 04779e5
* Remove redundant type declarations 615d872
* Replace heavyweight 'for ... of' loop with classic loop f319d64
* Replace NPM with Yarn in package file scripts 674d21a
* Update dependencies bc65a89
* Upgrade all dependencies 8c6cd81
* Use whitelist instead of blacklist to select files for NPM package a3813b0
* v0.5.6-alpha fe68ea5
* Wipe output dir before building NPM package 3278696
* bug: Date-formula adds 1 to a 1-indexed day-of-month value 8d14a95
* bug: Temp files directory expected by conversion test may not exist 7e82aa4
* ft: Can add a property and value to every row 114cb72
* mnt: Update dependencies 18b77d7



## 0.5.0-alpha (2019-07-24)

* ft: Can disallow rows with empty cells; can control verbosity 1b05664
* ft: Can easily duplicate a property 17ba4b2
* ft: Can load & parse in a single function call 4da69d4
* ft: Can load an Excel file as JSON 3b29e13
* ft: Can output in formats in addition to JSON be05d84
* ft: Can parse Excel data 40760e0
* ft: Can prepend imports to a TypeScript export 4e69ee1
* ft: Can use library of common transformations 0cb1856
* mnt: Upgrade all packages to latest minor version 4fbe234
* mnt: Use type parameter instead of cast for declared type; add test 7652784
* sec: Close vulnerability in `lodash` package a5f579b
* sec: Close vulnerability in `mixin-deep` package f26a239
* bug: Format options are required but should be optional 9ec16e3
* cq: Add convenience functions for writing output to files e4342a5
* cq: Add script & TypeScript config to generate typings 9fc871a
* cq: Enable ESLint 5f8f64e
* cq: Exclude nonproduction files from NPM package cba11b0
* cq: Install Jest with Babel support 5811024
* cq: Install Prettier 2079f0b
* cq: Rewrite exports to include typings c17ecdb
* cq: Test that all and only intended exports are exported 04aafc1
* cq: Update dependencies 4176d82
* Add standard configuration files ec89ce5
* Configure for publication via NPM c1fd257
* Initial commit 0255edd
* Initialize NPM package 7d186a8
* Install Babel with TypeScript support cb048d1
* Install TypeScript, ESLint & TypeScript-ESLint 26e9966



