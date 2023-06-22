export function change(type: string, file: string) {
  if(type === 'image') return file;
  return file.replace('.webm', '.jpg');
};

export * from './cloudinary';