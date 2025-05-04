// ORM para el acceso a la base de datos.
// Datamapper es un ORM para Node.js que permite interactuar con bases de datos SQL de manera sencilla y eficiente.

export interface Repository<T> {
  findAll(): Promise<T[] | undefined>;
  findOne(item: { id: string }): Promise<T | undefined>;
  add(item: T): Promise<T | undefined>;
  update(item: T): Promise<T | undefined>;
  delete(item: { id: string }): Promise<T | undefined>;
}
