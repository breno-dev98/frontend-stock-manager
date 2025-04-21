import { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { loginService } from "../../services/authService";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosLogin = { email, senha };

    try {
      
      const response = await loginService(dadosLogin);

      
      const token  = response.token; 

      
      login(token);

      
      navigate("/");
    } catch (error) {
      console.error("Erro ao realizar o login", error);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Stock Manager</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <Password
              id="senha"
              value={senha}
              className="!block w-full fix-password-icon"
              inputClassName="w-full flex"
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              toggleMask
              feedback={false}
              required
            />
          </div>
          <div className="text-right mt-1">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline focus:outline-none"
              onClick={() => alert("Funcionalidade de recuperação em breve!")}
            >
              Esqueci minha senha
            </button>
          </div>
          <Button label="Entrar" icon="pi pi-sign-in" className="w-full mt-4" type="submit" />
        </form>
      </Card>
    </div>
  );
}
