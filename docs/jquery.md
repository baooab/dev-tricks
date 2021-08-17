# jQuery 源码讲解 

> 更新：2021/08/16 重新组织文章，更好地组织内容。
> 
> 更新：2021/08/17 补充 jQeury.extend() 方法的说明，画龙点睛的一笔

jQuery 的源码涵盖了特别多的内容，某些方法的实现在查看时会看到有特别繁琐的地方，很大程度上是由于历史债务问题。为了保持完全向前兼容，不得已做出的折中选择。

如何讲解源码？当然首先我想到的就是**先把 jQuery 源码中普遍使用的方法先说明一番**。比如，我选择首先讲解的 `jQuery.extend()` 方法——这个方法，不仅对外用来补充插件系统，还在内部代码中广泛在使用。

### jQuery.extend()/jQuery.fn.extend() 方法

`jQuery.extend()/jQuery.fn.extend()` 方法用来扩展目标对象属性。作用类似于 ES6 中的 `Object.assign()` 方法，不过结果是还是有较大区别的。

#### 经典用法

```ts
const defaults = { foo: 'foo' };
const options = { bar: 'bar', baz: undefined };
jQuery.extend({}, defaults, options); // { foo: 'foo', bar: 'bar' }
```

#### 参数说明

第一个参数叫“目标对象”，后面的参数叫“来源参数”。

有两个要注意的点：

1. 如果来源参数中某个属性值是 `undefined`，那么这个属性不会被赋值到目标对象上
1. 后面的来源参数会覆盖前面来源参数的同名属性

#### 简单实现

```ts {24,29-31}
jQuery.extend = function () {
  // 第一个参数是“目标对象”
  var target = arguments[0] || {};
  // 后续参数都是“来源对象”
  var sources = slice.call(arguments, 1);

  // 目标对象必须是个对象或者是函数
  if (typeof target !== "object" && !isFunction( target )) {
    target = {};
  }

  // 按照入参顺序遍历来源对象，将属性赋给目标对象
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];

    // 排除无效值：`null` 和 `undefined`
    if (source != null) {
      
      // 遍历一个来源对象
      for (var propKey in source) {
        var propValue = source[propKey];

        // 避免 `Object.prototype` 被污染
        if (propValue === '__proto__') {
          continue;
        }
          
        // 排除掉属性值是 `undefined` 的属性 
        if (typeof propValue !== 'undefined') {
          target[propKey] = propValue;
        }
      }

    }
  }

  return target;
}
```

到此，我们实现了一个浅复制方法。

#### 实现深复制

但还不够，`jQuery.extend()` 方法还支持了另一种参数传入方式，来支持深复制。

不过需要注意的是，jQuery 只会对纯对象和数组做深度复制，其他类型的数据则走的时候浅复制。

```ts
var target = {};
var source = { foo: { bar: 'baz' } };

// 第一种方式：浅复制
$.extend(target, source);
target.foo === source.foo // true

// 第二种方式：深复制
$.extend(true, target, source);
target.foo === source.foo // false
```

通过将第一个参数设置成 `true`，表示要进行一次深复制。目标对象和来源对象的位置统一后移一位。


```ts {6,14-21,24-26,41,49-64}
jQuery.extend = function () {
  // 注意，当我们将第一个参数设置成 `false` 时，目标对象不是第二个参数，
  // 而是内部创建的一个新的空对象，从第二个参数起都是来源参数
  // 感觉像个 BUG -- 
  // 因为 `jQuery.extend(true, ...)` 和 `jQuery.extend(false, ...)` 语义不一致了
  var target = arguments[0] || {};
  var deep = false;

  var length = arguments.length;
  // 这个数值用来标记来源对象在 `arguments` 对象中的起始索引位置
  var i = 1;

  // 处理深复制参数的传入
  if (typeof target === 'boolean') {
    deep = target;

    // 第二个参数自动变成目标对象
    target = arguments[1] || {};
    // 来源对象的起始索引位置也有同步变更下
    i++;
  }
  
  // 目标对象必须是个对象或者是函数
  if (typeof target !== "object" && !isFunction( target )) {
    target = {};
  }

  // 按照入参顺序遍历来源对象，将属性赋给目标对象
  for (; i < length; i++) {
    var source = arguments[i];

    // 排除无效值：`null` 和 `undefined`
    if (source != null) {
      
      // 遍历一个来源对象
      for (var propKey in source) {
        var propValue = source[propKey];

        // 避免 `Object.prototype` 被污染
        // 避免死循环
        if (propValue === '__proto__' || target === propValue) {
          continue;
        }
        
        var propValueIsPlainObject = jQuery.isPlainObject(propValue);
        var propValueIsArray = Array.isArray(propValue);

        // 深复制只考虑属性值是数组或者纯对象的情况
        if (deep && propValue  && (propValueIsPlainObject || propValueIsArray)) {
          // 还要考虑之前的旧值类型
          var originValue = target[propKey];

          if (propValueIsArray && !Array.isArray(originValue)) {
            var clone = [];
          } else if (propValueIsPlainObject && !jQuery.isPlainObject(originValue)) {
            var clone = {};
          } else {
            var clone = originValue;
          }

          // 递归调用
          target[propKey] = jQuery.extend(deep, clone, propValue);
        
        // 排除掉属性值是 `undefined` 的属性 
        } else if (typeof propValue !== 'undefined') {
          target[propKey] = propValue;
        }
      }

    }
  }

  return target;
}
```

#### 画龙点睛的一笔

jQuery 提供的 `.extend()` 方法，其实不仅能支持能作为 jQuey 上的静态方法用（`jQuery.extend()`）；也能作为实例方法用（`jQuery.fn.extend()`）。

当 `.extend()` 方法传入两个以上的参数时，我们能行参数里获得目标对象。

`.extend()` 方法还有一个微妙的地方在于，当你只传入一个参数的时候，能根据你使用方法的方式不同，扩展 `jQuery` 或者 `jQuery.fn` 对象——这就是 jQuery 插件的工作原理。

```ts
// 为 jQuery 对象扩展 foo 方法
jQuery.extend({ foo() { console.log('foo') } });

// 为 jQuery.fn 对象扩展 foo 方法
jQuery.fn.extend({ foo() { console.log('foo') } });
```

而这个功能的实现，会发现非常简单，是一个点睛之笔：

```ts
...

// Handle case when target is a string or something (possible in deep copy)
if ( typeof target !== "object" && !isFunction( target ) ) {
	target = {};
}

// 只有一个参数的时候，将调用对象（jQuery 或 jQuery.fn）作为目标对象
if ( i === length ) {
	target = this;
	i--;
}

for ( ; i < length; i++ ) {
	...
}
```

### 基础方法

#### 数组方法

jQuery 一开始就声明了一个空的数组字面量，然后从这个字面量上得到数组原生方法。

接下来内部就可以直接通过变量的形式使用这些原生方法了。

```ts
var arr = [];

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};

var push = arr.push;

var indexOf = arr.indexOf;
```

### 对象方法

除了数组方法，jQuery 还在内部把对象相关的原生方法保存了一下。

```ts
// 获取原型
var getProto = Object.getPrototypeOf;

var class2type = {};

// 用于得到数据类型
var toString = class2type.toString;

// 是否是对象自有属性?
var hasOwn = class2type.hasOwnProperty;

// 有别于 Object.prototype.toString, Function.prototype.toString 方法会把函数源代码打印出来
var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );
```

这里的 class2type 对象最终会被填充成下面这种形式：

```ts
{
  "[object Array]": "array",
  "[object Boolean]": "boolean",
  "[object Date]": "date",
  "[object Error]": "error",
  "[object Function]": "function",
  "[object Number]": "number",
  "[object Object]": "object",
  "[object RegExp]": "regexp",
  "[object String]": "string"
}
```

实现代码类似于：

```ts
var class2type = {};

jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
```

关于 `jQuery.each()` 方法的实现，可以参照本篇中的介绍。

## jQuery.each()/jQuery.fn.each() 方法

// 

### 判断参数类型

#### 是否是函数

按照平常的写法，一般我们会认为只要判断 `typeof obj === 'function'` 为 `true` 就够了。

但 jQuery 也考虑到了复杂的浏览器环境和 DOM 节点。

```ts
var isFunction = function isFunction( obj ) {

  // Support: Chrome <=57, Firefox <=52
  // In some browsers, typeof returns "function" for HTML <object> elements
  // (i.e., `typeof document.createElement( "object" ) === "function"`).
  // We don't want to classify *any* DOM node as a function.
  // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
  // Plus for old WebKit, typeof returns "function" for HTML collections
  // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
  return typeof obj === "function" && typeof obj.nodeType !== "number" &&
    typeof obj.item !== "function";
};
```

#### 是否是纯对象

同样的，按照我们的理解。只要判断 `Object.prototype.toString.call(obj) === '[object Object]'` 为 `true` 就可以了。

但这方面 jQuery 就想的比较多。

```ts
jQuery.extend({
  isPlainObject: function( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
      return false;
    }

    proto = getProto( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
      return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
  }
})
```
