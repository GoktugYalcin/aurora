import React from 'react';

export const MessageBox: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  return (
    <div className="fixed bg-black/40 left-0 top-0 h-full w-full z-50 flex justify-center items-center">
      <div className="bg-slate-50 px-8 py-6 flex flex-col justify-center items-start text-xl rounded-xl">
        <div className="font-bold w-full border-b-2 pb-2">{title}</div>
        <div className="pt-2">{message}</div>
      </div>
    </div>
  );
};
