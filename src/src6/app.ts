// 83: 交差型
// オブジェクト同士を合成する
// プリミティブ型は合成できない。その場合はユニオン型を使う。
type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // 交差型
const e1: ElevatedEmployee = {
  name: "Kensei",
  privileges: ["create-server"],
  startDate: new Date(),
};
console.log(e1);

type Combinable = string | number;
// type Numeric = number | boolean;

// type Universal = Combinable & Numeric; // number

// interfaceでも交差型は可能
// interface IAdmin {
//   name: string;
//   privileges: string[];
// }
// interface IEmployee {
//   name: string;
//   startDate: Date;
// }
// interface IElevatedEmployee extends IAdmin, IEmployee {} // 継承で交差型

// 84: 型ガード
function add2(a: Combinable, b: Combinable) {
  // 変数の型をチェックするには typeof
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add2("1", 2));
console.log(add2(1, 2));

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  // 変数があるプロパティを持っているか確認するには in
  if ("privileges" in emp) {
    console.log(emp.privileges);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("運転中");
  }
}

class Truck {
  drive() {
    console.log("トラック運転中");
  }

  loadCargo(amount: number) {
    console.log("荷物積み込み: " + amount);
  }
}

type Vehicle = Car | Truck;

const v1: Vehicle = new Car();
const v2: Vehicle = new Truck();

function useVehicle(v: Vehicle) {
  v.drive();
  // インスタンス変数の型を確かめるのは instanceof
  if (v instanceof Truck) {
    v.loadCargo(10);
  }
}

useVehicle(v1);
useVehicle(v2);

// 85: 判別可能なUnion型
interface Bird {
  // bird というリテラル型のみを許容するtypeプロパティを定義
  // birdという値ではないので注意
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  var speed;
  // typeプロパティに入る値によってどちらの型か判別できる
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("移動速度: " + speed);
}
moveAnimal({ type: "horse", runningSpeed: 10 });

// 86: 型キャスト
const inputElement = document.getElementById("input-text");
// inputElement.value = "こんにちは";
// これはエラーになる
// 1. nullの可能性がある -> getElementById()の末尾に ! をつけるかif文で制御する
// 2. 汎用的な型であるHTMLElement型になっていてvalueプロパティを持っていない
// -> HTMLInputElement であること型キャストで伝える

// const inputElement = <HTMLInputElement>document.getElementById("input-text")!;
if (inputElement) {
  // Reactでは JSX で<>を使う記法があるので as を使う
  (inputElement as HTMLInputElement).value = "こんにちは";
}

// 87: インデックス型
// あらかじめどのようなプロパティ名でいくつプロパティが必要かわからない場合に使う

interface ErrorContainer {
  // email や username というプロパティもありうるし、将来的にさらに増えそうな場合
  [prop: string]: string; // propという名前に意味はない
}

var errorBag: ErrorContainer = {}; // プロパティなしでもOK
errorBag = {
  // 型があっていればいくらでも追加できる
  email: "正しいメールアドレスのフォーマットで入力してください",
  username: "エラー！",
};

// 88: 関数オーバーロード
// この関数の引数がどちらもnumberであれば戻り値はnumberになり、
// どちらかがstirngなら戻り値はstringになるということを教えるのが関数オーバーロード
function add3(a: number, b: number): number;
function add3(a: string, b: string): string;
function add3(a: string, b: number): string;
function add3(a: number, b: string): string;
function add3(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add3(1, 2); // resultはCominable型ではなくnumber型になる
const result2 = add3(1, "2"); // resultはCominable型ではなくstring型になる

// 89: オプショナルチェイン
interface UserData {
  id: string;
  job: {
    title: string;
  } | null;
}
const fetchedUser: UserData = {
  id: "u1",
  job: null,
};

// 値があるかわからない場合には ? をつけることで安全にアクセスできる
console.log(fetchedUser.job?.title);

// 90: Null合体演算子
var s1 = "";
// s1がundefinedやnull、ゼロ値の場合はデフォルト値をセットする書き方
// s1 = s1 || "Default";
// ゼロ値の場合はそのまま値を残したい場合はNull合体演算子 ?? を使う
s1 = s1 ?? "Default";
console.log(s1);
