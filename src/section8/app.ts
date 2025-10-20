// 106: 最初のクラスデコレータ, 107: デコレータファクトリ
function Logger(str: string) {
  return function (constructor: Function) {
    console.log(str);
    console.log(constructor);
  };
}

// 108: 便利なデコレータ
function WithTemplate(template: string, id: string) {
  return function (constructor: any) {
    const el = document.getElementById(id)!;
    const p = new constructor();
    if (el) {
      el.innerHTML = template;
      el.querySelector("h1")!.innerText = p.name;
    }
  };
}

// @Logger("ログ出力中: Person")
@WithTemplate("<h1>H1 content</h1>", "app-id")
class Person2 {
  constructor() {
    console.log("Person作成中");
  }

  name = "Max";
}

const p2 = new Person2();
