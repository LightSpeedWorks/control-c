Control-C をハンドリングするのに便利なツール
====

npm に [control-c](https://www.npmjs.org/package/control-c) というパッケージをを登録した。

例えば、以下の様な事ができる。

  + 1回の Control-C のキーインで、プログラムの状態を表示する。
  + 2回の Control-C のキーインで、リセットとか再初期化を行う。
  + 3回以上の Control-C のキーインで、クリーンアップして正常に終了させる。

![control-c.png](images/control-c.png)

## インストール:

```bash
$ npm install control-c
```

## 使い方:

```js
var ControlC = require('control-c');
```

## 例:

```js:example.js
'use strict';

var ControlC = require('control-c');

var singleCount = 0;
var doubleCount = 0;

var c1 = ControlC(
  function singleControlC() { console.log('Single:', ++singleCount); },
  function doubleControlC() { console.log('Double:', ++doubleCount); },
  function tripleControlC() { console.log('Reset'); singleCount = doubleCount = 0; },
  function quadrupleControlC() { console.log('Exit'); process.nextTick(process.exit); });

console.log('press control-c in 30 seconds.');
setTimeout(function () {}, 30000);
```

## 試し方:

```bash
$ node example
```

1回のControl-Cというのは、普通にできると思う。

2回以上のControl-Cというのは、500ミリ秒以内に続けて次のControl-Cを入力してください。

## あとがき

もちろん4回とか5回以上のControl-Cハンドラーも定義できるけど、指がつりそうになったり、何回押したか数えられなくなるかもしれないよ。


おしまい
