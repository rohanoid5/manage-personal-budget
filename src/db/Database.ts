import { IModel } from "../type/model";

export default class Database<T> {
  data: (IModel & T)[];
  nextId: number;

  constructor() {
    this.data = [];
    this.nextId = 1;
  }

  getAllFromDB(): T[] {
    return this.data;
  }

  getFromDBById(id: number) {
    return this.data.find((element) => {
      return element.id === id;
    });
  }

  addToDB(instance: T) {
    const newInstance: IModel & T = {
      ...instance,
      id: this.nextId++,
    };
    this.data.push(newInstance);
    return this.data[this.data.length - 1];
  }

  updateInstanceInDB(instance: IModel & T) {
    const instanceIndex = this.data.findIndex((element) => {
      return element.id === instance.id;
    });

    if (instanceIndex > -1) {
      this.data[instanceIndex] = instance;
      return this.data[instanceIndex];
    } else {
      return null;
    }
  }

  deleteFromDBbyId(id: number) {
    const index = this.data.findIndex((element) => {
      return element.id === id;
    });

    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  deleteAllFromDatabase() {
    this.data = [];
    return this.data;
  }
}
