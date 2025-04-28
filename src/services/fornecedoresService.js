import api from "../api/index";

export class FornecedorService {
    static async getAll() {
        try {
            const response = await api.get("/fornecedores");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
            throw error; // Re-lança o erro para que o componente possa lidar com ele, caso necessário
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/fornecedores", data);
            return response.data;
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach(err => {
                    console.log(`Erro no campo ${err.path}: ${err.message}`);
                });
            } else {
                console.error("Erro inesperado", error);
            }
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/fornecedores/${id}`, data);
            return response.data;
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach(err => {
                    console.log(`Erro no campo ${err.path}: ${err.message}`);
                });
            } else {
                console.error("Erro inesperado", error);
            }
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/fornecedores/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar fornecedores com id ${id}:`, error);
            throw error;
        }
    }
}
