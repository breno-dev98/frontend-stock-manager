import api from "../api/index";

export class ProdutoService {
    static async getAll() {
        try {
            const response = await api.get("/produtos");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const response = await api.get(`/produtos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar produto com id ${id}:`, error);
            throw error;
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/produtos", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/produtos/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar produto com id ${id}:`, error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/produtos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar produto com id ${id}:`, error);
            throw error;
        }
    }
}
