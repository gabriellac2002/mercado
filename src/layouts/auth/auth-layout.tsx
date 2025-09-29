import type React from "react";
import Image from "next/image";
import { IconShoppingCartFilled } from "@tabler/icons-react";

const AuthLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      {/* Fundo da loja */}
      <Image
        src="/loja.jpg"
        alt="Loja background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-green-600/50 to-teal-700/40 backdrop-blur-[2px] z-10"></div>

      {/* Container do conteúdo */}
      <div className="relative z-20 flex justify-center items-center w-full px-4">
        <div className="bg-white/95 backdrop-blur-md relative w-full max-w-md flex justify-center items-center rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
              <IconShoppingCartFilled
                size={80}
                className="relative z-10 text-emerald-700"
                stroke={1.5}
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Mercadinho do Laerte
              </h1>
              <p className="text-green-600/70 text-sm mt-1 font-medium">
                Sua loja de confiança
              </p>
            </div>

            <div className="w-full space-y-4">{props.children}</div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl z-10"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-green-400/15 rounded-full blur-lg z-10"></div>
    </div>
  );
};

export default AuthLayout;
