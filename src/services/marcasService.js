import api from "../api/index";

export class MarcaService {
    static async getAll() {
        try {
            const response = await api.get("/marcas");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar marcas:", error);
            throw error; // Re-lança o erro para que o componente possa lidar com ele, caso necessário
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/marcas", data);
            return response.data.marcas;
        } catch (error) {
            console.error("Erro ao criar marca:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/marcas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar marca com id ${id}:`, error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/marcas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar marca com id ${id}:`, error);
            throw error;
        }
    }
}
