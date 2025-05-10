// services/entradaService.js

import api from "../api";

export class EntradaService {
    static async getAll() {
        try {
            const response = await api.get("/entradas");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar entradas:", error);
            throw error;
        }
    }

    static async create(data) {
        try {
            const response = await api.post("/entradas", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar entrada:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const response = await api.put(`/entradas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar entrada com id ${id}:`, error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await api.delete(`/entradas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao deletar entrada com id ${id}:`, error);
            throw error;
        }
    }
}
