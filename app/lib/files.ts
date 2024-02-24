'use server';
import fs from 'fs';
import path from 'path';

export const publicImageFiles = (dirRelativeToPublicFolder: string) => {
  const dir = path.resolve('./public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join('/', dirRelativeToPublicFolder, name),
  );

  return (images as string[]) || [];
};
