## [1.3.11](https://github.com/skypilot-dev/steampress/compare/v1.3.11-next.1...v1.3.11) (2020-05-08)



## [1.3.11-next.1](https://github.com/skypilot-dev/steampress/compare/v1.3.11-next.0...v1.3.11-next.1) (2020-05-08)



## [1.3.11-next.0](https://github.com/skypilot-dev/steampress/compare/v1.3.10...v1.3.11-next.0) (2020-05-08)



## [1.3.10](https://github.com/skypilot-dev/steampress/compare/v1.3.10-next.0...v1.3.10) (2020-03-14)



## [1.3.10-next.0](https://github.com/skypilot-dev/steampress/compare/v1.3.9...v1.3.10-next.0) (2020-03-14)



## [1.3.9](https://github.com/skypilot-dev/steampress/compare/v1.3.9-next.0...v1.3.9) (2020-03-12)



## [1.3.9-next.0](https://github.com/skypilot-dev/steampress/compare/v1.3.8...v1.3.9-next.0) (2020-03-12)



## [1.3.8](https://github.com/skypilot-dev/steampress/compare/v1.3.8-next.0...v1.3.8) (2020-03-01)



## [1.3.8-next.0](https://github.com/skypilot-dev/steampress/compare/v1.3.7...v1.3.8-next.0) (2020-03-01)



## [1.3.7](https://github.com/skypilot-dev/steampress/compare/v1.3.6...v1.3.7) (2020-03-01)



## [1.3.6](https://github.com/skypilot-dev/steampress/compare/v1.3.5...v1.3.6) (2020-02-07)



## [1.3.5](https://github.com/skypilot-dev/steampress/compare/v1.3.4...v1.3.5) (2020-02-06)



## [1.3.4](https://github.com/skypilot-dev/steampress/compare/v1.3.3...v1.3.4) (2020-02-06)



## [1.3.3](https://github.com/skypilot-dev/steampress/compare/1.3.2...v1.3.3) (2020-02-06)



## [1.3.2](https://github.com/skypilot-dev/steampress/compare/1.3.1...1.3.2) (2020-01-30)



## [1.3.1](https://github.com/skypilot-dev/steampress/compare/1.3.0...1.3.1) (2019-12-07)



# [1.3.0](https://github.com/skypilot-dev/steampress/compare/1.2.0...1.3.0) (2019-11-27)



# [1.2.0](https://github.com/skypilot-dev/steampress/compare/1.1.3...1.2.0) (2019-11-26)



## [1.1.3](https://github.com/skypilot-dev/steampress/compare/1.1.2...1.1.3) (2019-11-25)



## [1.1.2](https://github.com/skypilot-dev/steampress/compare/1.1.1...1.1.2) (2019-11-25)



## [1.1.1](https://github.com/skypilot-dev/steampress/compare/1.1.0...1.1.1) (2019-11-25)


### Bug Fixes

* When false, 'ignore row' checks should not bypass validators ([0a48a37](https://github.com/skypilot-dev/steampress/commit/0a48a3711dcdcc5cad9b681f4ad3b5781134c0e6))



# [1.1.0](https://github.com/skypilot-dev/steampress/compare/1.0.0...1.1.0) (2019-11-25)


### Bug Fixes

* Transforms should not be applied to a default value ([544a869](https://github.com/skypilot-dev/steampress/commit/544a869416afc2cf602640f75d092ceda5ad9449))



# [1.0.0](https://github.com/skypilot-dev/steampress/compare/v0.5.9-alpha...1.0.0) (2019-11-24)


* chg!: Rename options controlling whether empty cells are disallowed ([b9a0ace](https://github.com/skypilot-dev/steampress/commit/b9a0acee8becd829bb0bb4d562c88d3be31bd44e))
* chg!: Rename sheet `transformers` to `sheetTransformers` ([3904584](https://github.com/skypilot-dev/steampress/commit/3904584240cdbb5901be5b2ef0e584c3c755c757))
* chg!: Rename cell 'transformers' option to 'cellTransformers' ([07e591b](https://github.com/skypilot-dev/steampress/commit/07e591b4f0f3b7868372fd33680f088aec2bb8c3))


### BREAKING CHANGES

* The `disallowEmptyCells` property of `ParseSheetOptions` and `ParseColumnOptions` has been renamed to `disallowEmptyCellsInSheet` and `disallowEmptyCellsInColumn` for clarity
* The change is one of a series of changes intended to avoid confusion among the various kinds of transformers.
* The `transformers` option of `ParseColumnOptions` has been renamed to `cellTransformers`. The change has been made for the sake of clarity (it might have been assumed that the transformers applied to the entire column), and also to make room for an eventual `columnTransformers` property.



## [0.5.9-alpha](https://github.com/skypilot-dev/steampress/compare/v0.5.8-alpha...v0.5.9-alpha) (2019-11-20)


### Features

* Can use a named export instead of a default export ([1f54c8c](https://github.com/skypilot-dev/steampress/commit/1f54c8c34b04960e9e85b251b2ee038d2a5d7cdd))



## 0.5.8-alpha (2019-11-18)



