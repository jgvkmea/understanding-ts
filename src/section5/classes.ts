abstract class Department {
  static fiscalYear = 2025;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  describeEmployees() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class AccountingDepartment extends Department {
  private static instance: AccountingDepartment;
  private reports: string[] = [];
  private constructor(id: string) {
    super(id, "Accounting");
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d1");
    return this.instance;
  }

  get mostRecentReport() {
    if (this.reports.length === 0) {
      throw new Error("レポートがありません");
    }
    return this.reports[this.reports.length - 1];
  }

  set mostRecentReport(report: string) {
    if (report === "") {
      throw new Error("レポート名を入力してください");
    }
    this.addReport(report);
  }

  describe(this: AccountingDepartment): void {
    console.log(`会計部門: ${this.id}`);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(employee: string): void {
    if (employee === "Ken") {
      return;
    }
    this.employees.push(employee);
  }
}

class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, "IT");
  }

  describe(this: ITDepartment): void {
    console.log(`IT部門: ${this.id}`);
  }

  addAdmin(admin: string) {
    this.admins.push(admin);
  }

  describeAdmins() {
    console.log(this.admins);
  }
}

const accounting = AccountingDepartment.getInstance();
accounting.describe();

accounting.addEmployee("Max");
accounting.addEmployee("Ken");
accounting.describeEmployees();

accounting.mostRecentReport = "期末レポート";
console.log(accounting.mostRecentReport);
accounting.addReport("something");
accounting.printReports();

const it = new ITDepartment("d2", ["Max"]);
it.addAdmin("Ben");
it.describeAdmins();

console.log(Department.createEmployee("Static"), Department.fiscalYear);
