import { Button } from "@mantine/core";
import { IconCheck, IconShield, IconSparkles } from "@tabler/icons-react";
import { ArrowRight } from "tabler-icons-react";

export const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2"></div>

        <div className="p-8">
          {/* Ícone de Sucesso com animação */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <IconCheck className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <IconSparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🎉 Sucesso!
            </h2>
            <p className="text-gray-600 text-lg">Senha definida com sucesso!</p>
          </div>

          {/* Informação de segurança */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <IconShield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 text-sm mb-1">
                  Sua conta está protegida
                </h3>
                <p className="text-green-700 text-xs">
                  Sua nova senha foi configurada e sua conta está segura. Você
                  pode fazer login agora! Em 3 segundos, você será redirecionado
                  automaticamente.
                </p>
              </div>
            </div>
          </div>

          {/* Botão de ação manual */}
          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <ArrowRight className="w-5 h-5 mr-2" />
            Ir para o Login Agora
          </Button>

          {/* Mensagem adicional */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Caso não seja redirecionado automaticamente, clique no botão acima
          </p>
        </div>
      </div>
    </div>
  );
};
