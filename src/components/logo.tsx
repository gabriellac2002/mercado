import { Text } from "@mantine/core";

type LogoProps = {
  isRow?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ isRow = false }) => {
  return (
    <div
      className={
        isRow ? "flex items-center gap-2 " : "flex flex-col items-center"
      }
    >
      <div className="bg-white rounded-full p-3 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>
      <Text
        size="lg"
        fw={700}
        c="white"
        ta="center"
        lh={1.2}
        mt={isRow ? undefined : "sm"}
      >
        {isRow ? (
          "Mercadinho do Laerte"
        ) : (
          <>
            Mercadinho
            <br />
            do Laerte
          </>
        )}
      </Text>
    </div>
  );
};
