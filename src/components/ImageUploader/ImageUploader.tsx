import { FC, useCallback, useState } from 'react';
import { 
  useDropzone, 
  DropzoneState, 
  FileWithPath, 
  FileRejection,
  ErrorCode,
} from 'react-dropzone';

import './style.scss';

export type PictireTypes = FileWithPath; 

interface ImageUploaderTypes {
  pictures: FileWithPath[];
  setPictures: (pictures: FileWithPath[]) => void;
}

const acceptedFormats = {'image/jpeg': ['.jpg']};
const megabyte =  1024 * 1024;
const maxSizeInBytes = 3 * megabyte;

function formatFileSize(fileSizeInBytes: number): string {
  const fileSizeInMB = fileSizeInBytes / megabyte;
  return fileSizeInMB.toFixed(2) + ' МБ';
}

export const ImageUploader: FC<ImageUploaderTypes> = ({ pictures, setPictures }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
    setErrorMessage(null);

    if (rejectedFiles.length > 0) {
      const errorCode = rejectedFiles[0]?.errors[0]?.code;
      switch (errorCode) {
        case ErrorCode.FileTooLarge:
          setErrorMessage(`Размер изображния превышает допустимый размер ${formatFileSize(maxSizeInBytes)}.`)
          break;
        case ErrorCode.FileInvalidType:
          setErrorMessage(`Неверный формат изображения. Допустимые форматы: ${Object.values(acceptedFormats).flat().join(',')}.`)
          break;
        case ErrorCode.TooManyFiles:
          setErrorMessage('Допустима загрузка до 5 изображений.')
          break;
        default:
          setErrorMessage('Ошибка загрузки.')
          break;
      }
    } else if (acceptedFiles.length > 0) {
       setPictures(acceptedFiles)
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive }: DropzoneState = useDropzone({
    accept: acceptedFormats,
    maxSize: maxSizeInBytes,
    onDrop: onDrop,
    maxFiles: 5,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпустите изображение для загрузки</p>
      ) : (
        <p>Перетащите или кликните для загрузки изображения</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {pictures.length > 0 && (
        <div>
          <h4>Изображения:</h4>
          <ul className='imgs-loaded'>
            {pictures.map(picture => 
              <li key={picture.name}>{picture.name} - {formatFileSize(picture.size)}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
