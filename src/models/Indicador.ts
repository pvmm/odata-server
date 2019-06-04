import { Edm, odata } from "odata-v4-server";
import { Categoria } from "./Categoria";


export class Indicador {

		@Edm.Key
		@Edm.Computed
		@Edm.Int32
		Id: number

		Nome: string

		Descricao: string

		@Edm.Int32
	  @Edm.Required
	  CategoriaId: number

		@Edm.EntityType("Categoria")
		@Edm.Partner("Indicadores")
		Categoria: Categoria

		@Edm.Boolean
		Discontinued: boolean

		// @Edm.json
		// Data: json

}
