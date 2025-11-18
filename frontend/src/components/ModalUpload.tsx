import { useState } from 'react';

type Props = { onFilesSelected: (files: File[]) => void };

export default function ModalUpload({ onFilesSelected }: Props) {
  const [dragging, setDragging] = useState(false);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const fileList = Array.from(event.dataTransfer.files || []);
    onFilesSelected(fileList);
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-6 text-center ${dragging ? 'border-black bg-slate-50' : 'border-slate-300'}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <p className="text-sm text-slate-600">Arraste e solte fotos aqui</p>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="file-input"
        onChange={(e) => onFilesSelected(Array.from(e.target.files || []))}
      />
      <label htmlFor="file-input" className="cursor-pointer text-black underline">
        ou clique para selecionar
      </label>
    </div>
  );
}
