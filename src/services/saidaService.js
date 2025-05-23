// services/saidaService.js

import api from "../api";

export class SaidaService {
    static async getAll() {
        try {
            const response = await api.get("/saidas");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar saídas:", error);
            throw error;
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/saidas", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar saída:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/saidas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar saída com id ${id}:`, error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/saidas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar saída com id ${id}:`, error);
            throw error;
        }
    }
}
