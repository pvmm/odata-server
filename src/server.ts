import { ODataServer, ODataController, Edm, odata } from "odata-v4-server";
import { Categorias } from "./controllers/Categorias";
import connect from "./utils/connect";


@odata.namespace("bsbemnumeros")
@odata.controller(Categorias, true)
export class BsbEmNumerosServer extends ODataServer {
    @Edm.ActionImport
    async initDb() {
        const db = await connect();
        await db.query(`DROP TABLE IF EXISTS "Categorias", "Indicadores"`);
        await db.query(`CREATE TABLE "Categorias" (
                        "Id" SERIAL PRIMARY KEY,
                        "Nome" VARCHAR(32),
                        "Descricao" VARCHAR(100)
                       );`);

        await db.query(`CREATE TABLE "Indicadores" (
                        "Id" SERIAL PRIMARY KEY,
                        "Nome" VARCHAR(32),
                        "Descricao" VARCHAR(100),
                        "CategoriaId" INT,
                        "Discontinued" BOOLEAN,
                       );`);

    }
}
