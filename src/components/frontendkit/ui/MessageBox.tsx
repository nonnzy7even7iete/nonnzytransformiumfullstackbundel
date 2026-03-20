// components/MessageBox.tsx
export function MessageBox({ text, type }: { text: string; type: "success" | "error" }) {
  return (
    <div
      className={`mt-4 p-3 rounded-xl text-center font-medium ${
        type === "success"
          ? "bg-green-600/30 text-green-100 border border-green-400/30"
          : "bg-red-600/30 text-red-100 border border-red-400/30"
      }`}
    >
      {text}
    </div>
  );
}
