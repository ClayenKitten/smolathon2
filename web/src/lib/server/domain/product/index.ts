import DbRepository from "../../db/repository";
import type Result from "../../util/result";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Product as ProductTable } from "$lib/server/db/types";
import type { User } from "../user";

export class Product {
	constructor(
		public id: number,
		public title: string,
		public author: string,
		public price: number,
		public description: string | null = null
	) {}

	public static create(id: number, record: Insertable<ProductTable>) {
		let { title, author, price } = record;
		return new Product(id, title, author, price);
	}

	public static fromRecord(record: Selectable<ProductTable>): Product {
		return new Product(
			record.id,
			record.title,
			record.author,
			record.price,
			record.description
		);
	}
}

export class ProductService {
	constructor(private repos: { product: ProductRepository }) {}

	public async getOwnedProducts(user: User): Promise<Product[]> {
		return this.repos.product.getOwnedProducts(user);
	}
}

export class ProductRepository extends DbRepository {
	public async getOwnedProducts(user: User): Promise<Product[]> {
		return this.db
			.selectFrom("productOwnership")
			.where("userId", "=", user.id)
			.innerJoin("product", "product.id", "productOwnership.productId")
			.selectAll()
			.execute()
			.then(r => Promise.all(r.map(x => this.mapProduct(x))));
	}
	private async mapProduct(record: Selectable<ProductTable>): Promise<Product> {
		return new Product(
			record.id,
			record.title,
			record.author,
			record.price,
			record.description
		);
	}

	public async findById(id: number): Promise<Product | undefined> {
		let record = await this.db
			.selectFrom("product")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return Product.fromRecord(record);
	}

	public async create(dto: Insertable<ProductTable>): Promise<Product> {
		let id = await this.db
			.insertInto("product")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Product.create(id, dto);
	}

	public async update(id: number, dto: Updateable<ProductTable>) {
		delete dto.id;
		await this.db
			.updateTable("product")
			.where("id", "=", id)
			.set(dto)
			.execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("product").where("id", "=", id).execute();
	}
}
