// type AddFn = (n1: number, n2: number) => number;
interface AddFn {
  (n1: number, n2: number): number;
}

const add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  readonly name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;
user1 = new Person("Max", 30);
user1.greet("Hello I am");
