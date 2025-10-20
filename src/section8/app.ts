// 106: 最初のクラスデコレータ, 107: デコレータファクトリ, 109: 複数のデコレータ
function Logger(str: string) {
  console.log("Logger ファクトリ");
  return function (constructor: Function) {
    console.log(str);
    console.log(constructor);
  };
}

// 108: 便利なデコレータ
function WithTemplate(template: string, id: string) {
  console.log("WithTemplate ファクトリ");
  return function (constructor: any) {
    console.log("Template表示");
    const el = document.getElementById(id)!;
    const p = new constructor();
    if (el) {
      el.innerHTML = template;
      el.querySelector("h1")!.innerText = p.name;
    }
  };
}

@Logger("ログ出力中: Person")
@WithTemplate("<h1>H1 content</h1>", "app-id")
class Person2 {
  constructor() {
    console.log("Person作成中");
  }

  name = "Max";
}

const p2 = new Person2();

// 110: プロパティデコレータの詳細
function LogProperty(target: any, propertyName: string | Symbol) {
  console.log("Property デコレータ");
  console.log(target, propertyName);
}

// 111: アクセサとパラメータのデコレータ
function LogAccessor<T>(
  target: any,
  name: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  console.log("Accesor デコレータ");
  console.log("target: " + target);
  console.log("name: " + name);
  console.log("descriptor: " + descriptor);
}

function LogMethod<T>(
  target: any,
  name: string | Symbol,
  descriptor: TypedPropertyDescriptor<T>
) {
  console.log("Method デコレータ");
  console.log("target: " + target);
  console.log("name: " + name);
  console.log("descriptor: " + descriptor);
}

function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log("Parameter デコレータ");
  console.log("target: " + target);
  console.log("name: " + name);
  console.log("position: " + position);
}

class Product {
  @LogProperty
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @LogAccessor
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("価格が不正です");
    }
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this._price * (1 + tax);
  }
}
