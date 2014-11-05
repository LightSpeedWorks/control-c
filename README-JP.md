[control-c](https://www.npmjs.org/package/control-c) - npm
====

[English version](README.md#readme)

[ControlC](https://www.npmjs.org/package/control-c)は簡単なユーティティでSIGINTというかControl-Cをハンドリングする事が出来る。<br/>
もちろん1回のControl-Cや2回とか3回以上のControl-Cもサポートする。

例えば、1回のControl-Cで、プログラムの状態をプリントしたり、<br/>
2回のControl-Cで、リセットや再初期化を行ったり、<br/>
3回のControl-Cで、クリーンアップと正常終了を行う、など。

# インストール:

```bash
$ npm install control-c
```

# 使い方:

```js
var ControlC = require('control-c');
```

## メソッド: ControlC.new(handlers...)

  SIGINTをハンドリングする新しいハンドラーを新規に作成して追加する。

### 形式

```js
var c1 = new ControlC(
  function singleControlC() { console.log('single ctrl-c'); },
  function doubleControlC() { console.log('double ctrl-c'); },
  function tripleControlC() { console.log('triple ctrl-c'); this.remove(); });

// or
var c2 = ControlC(
  function singleControlC() { console.log('single ctrl-c'); },
  function doubleControlC() { console.log('double ctrl-c'); },
  function tripleControlC() { console.log('triple ctrl-c'); this.remove(); });

// or
var c3 = ControlC.new(
  function singleControlC() { console.log('single ctrl-c'); },
  function doubleControlC() { console.log('double ctrl-c'); },
  function tripleControlC() { console.log('triple ctrl-c'); this.remove(); });
```

### パラメータ

  + **handlers**...: SIGINTハンドラー関数。必須

### 返り値

  ControlCクラスのインスタンス

## メソッド: this.remove() と this.add()

  SIGINTハンドラーの削除や追加を行う。

### 形式

```js
var c1 = new ControlC(function () {},
  function () { this.remove(); });
c1.remove();
c1.add();
```

## プロパティ: ControlC.interval

  Control-Cタイムアウト間隔。ミリ秒。

### 形式

```js
ControlC.interval = 500;
console.log(ControlC.interval);
```

### パラメータ

  + **interval**: Control-Cタイムアウト間隔。200～2000ミリ秒。デフォルトは500ミリ秒。

# 例:

```js
'use strict';

var ControlC = require('control-c');

var singleCount = 0;
var doubleCount = 0;

var c1 = new ControlC(
  function singleControlC() { console.log('Single:', ++singleCount); },
  function doubleControlC() { console.log('Double:', ++doubleCount); },
  function tripleControlC() { console.log('Reset'); singleCount = doubleCount = 0; },
  function quadrupleControlC() { console.log('Exit'); process.nextTick(process.exit); });

console.log('press control-c in 30 seconds.');
setTimeout(function () {}, 30000);
```

# ライセンス:

  MIT