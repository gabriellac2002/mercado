import Image from "next/image";
import { PropsWithChildren } from "react";

export const SetUpLayout: React.FC<PropsWithChildren> = (props) => {
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

      <div className="relative z-10">{props.children}</div>

      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl z-10"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-green-400/15 rounded-full blur-lg z-10"></div>
    </div>
  );
};
