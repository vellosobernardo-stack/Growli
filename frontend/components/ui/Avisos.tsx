'use client';

interface AvisosProps {
  avisos: string[];
}

export default function Avisos({ avisos }: AvisosProps) {
  if (avisos.length === 0) return null;

  return (
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
      <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        Avisos
      </h4>
      <ul className="list-disc list-inside space-y-1 text-sm text-orange-700">
        {avisos.map((aviso, index) => (
          <li key={index}>{aviso}</li>
        ))}
      </ul>
    </div>
  );
}