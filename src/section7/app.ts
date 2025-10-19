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

// 100: Genericクラス
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage: DataStorage<string> = new DataStorage();
textStorage.addItem("1");
textStorage.addItem("2");
textStorage.removeItem("1");
console.log(textStorage.getItems());

const numberStorage: DataStorage<number> = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(2);
console.log(numberStorage.getItems());

// 102: Generic型のユーティリティ

// Partial: 一時的にプロパティをオプショナルに変更する
interface Course {
  id: string;
  title: string;
}

function createCourse(id: string, title: string): Course {
  // Partialにしないと {} はidやtitleを持たないためエラーになる
  // 初期化と値の詰め込みを別でしたい場合にPartialが使える
  const course: Partial<Course> = {};
  course.id = id;
  course.title = title;
  return course as Course;
}

// Readonly: 配列やオブジェクトを変更不可にする
const names: Readonly<string[]> = ["Ken", "Mike"];
// names.push("Alice"); エラーになる
