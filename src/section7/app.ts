// 95: Generic関数の作成
// 97: extendsで型に制約を付けられる
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Ken" }, { age: 29 });
console.log(mergedObj.age);

// 98: もう一つのGeneric関数
interface Lengthy {
  length: number;
}

// elementには length プロパティがある型だけ受け付けるようにしたい
// Lengthy型を用意して extends で継承させて確実にlengthプロパティがある型を渡されるようにする
function countAndDescribe<T extends Lengthy>(element: T) {
  var describeText = "値がありません";
  if (element.length > 0) {
    describeText = "値は" + element.length + "個です";
  }
  return [element, describeText];
}

// 99: keyofの制約
function extractAndConvert<T extends Object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "値: " + obj[key];
}

console.log(extractAndConvert({ name: "Ken" }, "name"));
