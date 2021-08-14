# jQuery 源码讲解 

### jQuery.extend() 方法

`jQuery.extend()` 方法用来扩展目标对象属性。

### 经典用法

```ts
const defaults = { foo: 'foo' };
const options = { bar: 'bar', baz: undefined };
$.extend({}, defaults, options); // { foo: 'foo', bar: 'bar' }
```

### 参数说明

第一个参数叫“目标对象”，后面的参数叫“来源参数”。

有两个要注意的点：

1. 如果来源参数中某个属性值是 `undefined`，那么这个属性不会被赋值到目标对象上
1. 后面的来源参数会覆盖前面来源参数的同名属性

### 简单实现

```ts {24,29-31}
jQuery.extend = function () {
  // 第一个参数是“目标对象”
  var target = arguments[0] || {};
  // 后续参数都是“来源对象”
  var sources = [].slice.call(arguments, 1);

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

### 实现深复制

但还不够，`jQuery.extend()` 方法还支持了另一种参数传入方式，来支持深复制。

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

    // 找到真正的目标对象
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
          // 只在原始值和覆盖值的数据类型相同时，才进行有效深复制
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

<details>  
<summary>辅助方法</summary>

```ts
var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

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

</details>  