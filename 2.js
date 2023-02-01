// function sum1(a,b,c){ // 多参数的函数

//     return a + b + c;
// }
// sum1(1,2,3);

function sum2(x, y) {
  return function c(z) {}
}

sum2(1, 2)(3) // 单个的参数函数
// 函数柯里化的要求就是必须转成单参数的传入 (1)(2)(3)  标准的柯里化
// 偏函数 就是先固定一些参数，之后传入其它的函数(1,2)(3)

// 在开发的时候 我们不区分偏函数和柯里化(1)(2)(3)  (1,2)(3)
// 转化成了单一的函数之后，会让函数粒度变的更低 （控制的更精准）

function sum3(x) {
  return function (y) {
    return function (z) {}
  }
}
let sum31 = sum3(1) // 我们可以通过一个范围较大的函数，衍生出小函数，可以通过组合来使用
sum3(2)(3)

function isType(typing, val) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`
}
// 固定的参数我们希望缓存起来，可以利用柯里化来实现
console.log(isType("String", "abc"))
console.log(isType("String", 123))
console.log(isType("String", true))

console.log("------------")
const _ = require("lodash")

const curriedIsType = _.curry(isType)

const isString = curriedIsType("String")
console.log(isString("123"))
console.log(isString(123))

function sum(a, b, c) {
  // 多参数的函数
  return a + b + c
}
// 柯里化的实现， （分批传入参数）， 将多参数转化成细粒度函数，转化后还可以组合， 可以实现部分参数的缓存
function curry(func) {
  const curried = (...args) => {
    if (args.length < func.length) {
      return (...other) => curried(...args, ...other)
    }
    return func(...args)
  }
  return curried
}

const curriedSum = curry(sum)
console.log(curriedSum(1, 2)(3)) // 如果执行的参数没有达到函数的参数 此时会返回一个新函数来继续等待接受剩余的参数

// 组合 compose 组合函数 （redux compose， koa express 组合函数）  1） 处理请求参数 2） 看用户是否权限  3） 响应内容

function double(n) {
  // 纯函数
  return n * 2
}
function toFixed(n) {
  return n.toFixed(2)
}
function addPrefix(n) {
  return "£" + n
}

// addPrefix(toFiexd(double(10000))) // 洋葱模型
// double(10000) | toFiexd | addPrefix //   过滤器的用法 管道 （滤网）  vue2 filter
// 组合
function flowRight(...fns) {
  if (fns.length == 1) {
    // 只有一个函数就不组合了
    return fns[0]
  }
  // 最终reduce返回的是一个函数
  return fns.reduceRight(
    (a, b) =>
      (...args) =>
        b(a(...args))
  )
}
// double -> a 从right开始
// toFiexd -> b

// a -> (...args)=> toFiexd(double(...args))
// b -> addPrefix

// addPrefix( toFiexd(double(1000)))
const composed = flowRight(addPrefix, toFixed, double) // Pointed Free
const r = composed(10000)
console.log(r)
