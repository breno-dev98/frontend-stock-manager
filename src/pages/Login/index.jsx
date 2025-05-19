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
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useToastMessage } from "../../hooks/useToastMessage";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { toastRef, showSuccess, showError } = useToastMessage();
  const { login, auth } = useContext(AuthContext);
  const {
    register,
    control,
    setError,
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
      showSuccess("Login realizado com sucesso")
    } catch (error) {
      showError("Erro ao fazer login")
      console.error("Erro ao realizar o login", error);
      if (error.response && error.response.data?.error) {
        setError("root", {
          type: "manual",
          message: error.response.data.error,
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Erro ao conectar com o servidor.",
        });
      }
      
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
            {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
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
            label={
              loading ? (
                <div className="flex items-center justify-center gap-2 w-full">
                  <div className="flex items-center">
                    <span className="ml-2">Carregando...</span>
                    <ProgressSpinner style={{ width: "20px", height: "20px", display: "inline-block" }} strokeWidth="5" />
                  </div>
                </div>
              ) : (
                "Entrar"
              )
            }
            icon={loading ? "" : "pi pi-sign-in"}
            className="w-full mt-4"
            type="submit"
          />
        </form>
      </Card>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </div>
  );
}
