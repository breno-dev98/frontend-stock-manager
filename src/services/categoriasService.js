import api from "../api/index";

export class CategoriaService {
    static async getAll() {
        try {
            const response = await api.get("/categorias");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            throw error; // Re-lança o erro para que o componente possa lidar com ele, caso necessário
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/categorias", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/categorias/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar categoria com id ${id}:`, error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar categoria com id ${id}:`, error);
            throw error;
        }
    }
}
