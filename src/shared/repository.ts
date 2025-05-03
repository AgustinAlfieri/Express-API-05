// ORM para el acceso a la base de datos.
// Datamapper es un ORM para Node.js que permite interactuar con bases de datos SQL de manera sencilla y eficiente.

export interface Repository<T> {
  findAll(): T[] | undefined;
  findOne(item: { id: string }): T | undefined;
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: { id: string }): T | undefined;
}
