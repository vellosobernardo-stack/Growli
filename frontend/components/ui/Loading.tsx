'use client';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">
        Processando sua análise...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Estamos calculando todos os indicadores financeiros
      </p>
    </div>
  );
}