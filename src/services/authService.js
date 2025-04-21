import api from "../api";

export const loginService = async (dadosLogin) => {
    try {
        const response = await api.post('/login', dadosLogin)
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
            return response.data
        }
        
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}
