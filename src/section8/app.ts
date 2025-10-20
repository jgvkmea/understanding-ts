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
