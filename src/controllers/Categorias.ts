import { ODataController, odata, ODataQuery } from "odata-v4-server";
import { createQuery } from "odata-v4-pg";
import { Categoria } from "../models/Categoria";
import { Indicador } from "../models/Indicador";
import convertResults from "../utils/convertResults";
import connect from "../utils/connect";
import insert from "../utils/insert";
import update from "../utils/update";
import replace from "../utils/replace";


@odata.type(Categoria)
export class Categorias extends ODataController {

    @odata.GET
    async find( @odata.query query:ODataQuery ): Promise<Categoria[]> {
        const db = await connect();
        const sqlQuery = createQuery(query);
        const {rows} = await db.query(sqlQuery.from('"Categorias"'), sqlQuery.parameters);

        return convertResults(rows);
    }


    @odata.GET
    async findOne( @odata.key key: number, @odata.query query: ODataQuery ): Promise<Categoria> {
        const db = await connect();
        const sqlQuery = createQuery(query);
        const {rows} = await db.query(`SELECT ${sqlQuery.select} FROM "Categorias"
                                       WHERE "Id" = $${sqlQuery.parameters.length + 1} AND (${sqlQuery.where})`,
                                       [...sqlQuery.parameters, key]);

        return convertResults(rows)[0];
    }


    @odata.GET("Indicadores")
    async getIndicadores( @odata.result categoria: Categoria, @odata.query query: ODataQuery): Promise<Indicador[]> {
        const db = await connect();
        const sqlQuery = createQuery(query);
        const {rows} = await db.query(`SELECT ${sqlQuery.select} FROM "Indicadores"
                                       WHERE "CategoriaId" = $${sqlQuery.parameters.length + 1} AND (${sqlQuery.where})`,
                                       [...sqlQuery.parameters, categoria.Id]);

        return convertResults(rows);
    }


    @odata.GET("Indicadores")
    async getIndicador( @odata.key key:number, @odata.result categoria: Categoria, @odata.query query: ODataQuery ): Promise<Indicador> {
        const db = await connect();
        const sqlQuery = createQuery(query);
        const {rows} = await db.query(`SELECT ${sqlQuery.select} FROM "Indicadores"
                                       WHERE "Id" = $${sqlQuery.parameters.length + 1} AND
                                             "CategoriaId" = $${sqlQuery.parameters.length + 2} AND
                                             (${sqlQuery.where})`,
                                       [...sqlQuery.parameters, key, categoria.Id]);

        return convertResults(rows)[0];
    }


    @odata.POST
    async insert( @odata.body data: any): Promise<Categoria> {
        const db = await connect();
        const {rows} = await insert(db, "Categorias", [data]);

        return convertResults(rows)[0];
    }


    @odata.PUT
    async upsert( @odata.key key: number, @odata.body data: any, @odata.context context: any): Promise<Categoria> {
        const db = await connect();
        const {rows} = await replace(db, "Categorias", key, data);

        return convertResults(rows)[0];
    }


    @odata.PATCH
    async update( @odata.key key: number, @odata.body delta: any): Promise<number> {
        const db = await connect();
        const {rows} = await update(db, "Categorias", key, delta);

        return convertResults(rows)[0];
    }


    @odata.DELETE
    async remove( @odata.key key: number): Promise<number> {
        const db = await connect();
        const {rowCount} = await db.query(`DELETE FROM "Categorias" WHERE "Id" = $1`, [key]);

        return rowCount;
    }

}
