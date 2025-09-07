export interface ID {
    getId():string; }
import { Order } from "../models/order.model";
/**
 * Generic repository interface for CRUD operations.
 *
 * @template T - The type of entity managed by the repository.
 *
 * @method getAll
 * Retrieves all entities.
 * @returns {Promise<T[]>} A promise that resolves to an array of entities.
 * @throws May throw if retrieval fails.
 *
 * @method getById
 * Retrieves an entity by its unique identifier.
 * @param {ID} id - The unique identifier of the entity.
 * @returns {Promise<T>} A promise that resolves to the entity.
 * @throws May throw if the entity is not found or retrieval fails.
 *
 * @method create
 * Creates a new entity.
 * @param {T} item - The entity to create.
 * @returns {Promise<T>} A promise that resolves to the created entity.
 * @throws May throw if creation fails.
 *
 * @method update
 * Updates an existing entity.
 * @param {T} item - The entity with updated data.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws May throw if update fails.
 *
 * @method delete
 * Deletes an entity by its unique identifier.
 * @param {ID} id - The unique identifier of the entity to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 * @throws May throw if deletion fails.
 * @throws database exception if any database error occurs
 */
export interface IRepository<T extends ID> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(item: T): Promise<string>;
    update(item: T): Promise<void>;
    delete(id: string): Promise<void>;
}

export interface Initialzable {
    init(): Promise<void>;
}
export interface InitialzableRepository<T extends ID> extends IRepository<T>,Initialzable{}