import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { loginService } from "../../services/authService";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login, auth } = useContext(AuthContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginService(data);

      const token = response.token;

      login(token);
    } catch (error) {
      console.error("Erro ao realizar o login", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      if (auth.isAuthenticated) {
        navigate("/dashboard");
      }
    }, [auth.isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Stock Manager</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              {...register("email")}
              className="w-full"
              placeholder="Digite seu email"
              invalid={errors.email ? true : false}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <Password
                  id="senha"
                  className="!block w-full fix-password-icon"
                  inputClassName="w-full flex"
                  placeholder="Digite sua senha"
                  toggleMask
                  feedback={false}
                  invalid={errors.senha ? true : false}
                  {...field}
                />
              )}
            />
            {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}
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
          <Button
            label={loading ? <ProgressSpinner style={{ width: "25px", height: "25px" }} strokeWidth="5" /> : "Entrar"}
            icon={loading ? "" : "pi pi-sign-in"}
            className="w-full mt-4"
            type="submit"
          />
        </form>
      </Card>
    </div>
  );
}
