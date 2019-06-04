import { Edm, odata } from "odata-v4-server";
import { Indicador } from "./Indicador";


export class Categoria {

		@Edm.Key
		@Edm.Computed
		@Edm.Int32
		Id: number

		Descricao: string

		Nome: string

		@Edm.Collection(Edm.EntityType("Indicador"))
		@Edm.Partner("Categoria")
		Indicadores: Indicador[]

}
