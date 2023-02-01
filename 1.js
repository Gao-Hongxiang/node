// 面向过程
const arr = [1, 2, 3, 4, 5]
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//   sum += arr[i]
// }
// console.log(sum)

// 面向对象, 为何状态和行为

// class Calc {
//   constructor() {
//     this.sum = 0
//   }
//   add(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       this.sum += arr[i]
//     }
//   }
// }
// const calc = new Calc()
// calc.add(arr)
// console.log(calc)

// let x = arr.reduce((pre, cur) => cur + pre, 0)
// console.log("x=>", x)

Array.prototype.reduce1 = function (callback, startVal) {
  let arr = this
  //基础值
  let acc = typeof startVal === "undefined" ? arr[0] : startVal
  //开始索引
  let sIndex = typeof startVal === "undefined" ? 1 : 0
  for (let i = 0; i < arr.length; i++) {
    acc = callback(acc, arr[i])
  }
  return acc
}
let x = arr.reduce1((pre, cur) => cur + pre, 0)
console.log("x=>", x)

function say(val) {
  console.log("val", val)
}

Function.prototype.before = function (cb) {
  console.log(this)
  return (...args) => {
    console.log(this)

    cb(...args)
    this(...args)
  }
}
const newSay = say.before((before) => {
  console.log("say before", before)
})

newSay("我说了一句话")

function exec(a, b) {
  console.log("running")
  return a + b
}

const memoize = function (fn, resolver) {
  const cache = new Map()
  return (...args) => {
    const key = typeof resolver === "function" ? resolver(...args) : args[0]
    let result = cache.get(key)
    if (result === undefined) {
      result = fn(...args)
      cache.set(key, result)
    }
    return result
  }
}

const _ = require("lodash")
const resolver = (...args) => {
  return JSON.stringify(args)
}
// const memorizedExec = _.memoize(exec, resolver)
const memorizedExec = memoize(exec, resolver)
console.log(memorizedExec(1, 1))
console.log(memorizedExec(1, 1))

console.log(memorizedExec(1, 3))

// const _ = require("lodash")
let newFn = _.after(2, function () {
  console.log("running after")
})
newFn()
newFn()
newFn()
newFn()
// 真正的开发中我们理解的闭包：词法作用域

// function a() {
//   // 当前定义的函数，记住了所在的词法作用于，b函数不在当前词法作用域中执行，此时就会产生闭包
//   let c = 100 // 只要记住了这个词法作用域 就是闭包
//   function b() {
//     console.log(c)
//   }
//   b()
// }
// a()

function a() {
  // 当前定义的函数，记住了所在的词法作用于，b函数不在当前词法作用域中执行，此时就会产生闭包
  let c = 100 // 只要记住了这个词法作用域 就是闭包
  return function b() {
    console.log(c)
  }
  //   b()
}
const b = a()
b()
// 定义的函数的词法作用域和我们执行的测法作用域不是同一个，就会产生闭包
