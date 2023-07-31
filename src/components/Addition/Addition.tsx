import { FormEvent, MouseEvent, useState } from 'react';
import axios from 'axios';
import { FileWithPath } from 'react-dropzone';
import './style.scss';
import { url } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { CreateBookI } from '../../helper/interfaces';

const Addition = () => {
  const nav = useNavigate();
  const [pictures, setPictures] = useState<FileWithPath[]>([]);
  const [bookField, setbookFields] = useState<CreateBookI>({
    title: '',
    picture: '',
    author: '',
    description: '',
    year: 0
  });

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (pictures.length === 0) {
      // Отобразить ошибку
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(bookField)) {
      formData.append(key, value);
    }

    for (let picture of pictures) {
      formData.append('pictures', picture);
    }

    try {
      const options = { headers: { 'content-type': 'multipart/form-data' } };
      await axios.post(`${url}/`, formData, options);
      nav('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='addBook' onSubmit={handleSubmit}>
      <label className='addBook_Label'>
        <span> Название</span>
        <input
          placeholder='Название'
          name='title'
          type='text'
          value={bookField.title}
          onChange={(e) => {
            setbookFields({ ...bookField, title: e.target.value });
          }}
        />
      </label>
      <label className='addBook_Label'>
        <span> Автор</span>
        <input
          name='author'
          type='text'
          placeholder='Автор'
          value={bookField.author}
          onChange={(e) => {
            setbookFields({ ...bookField, author: e.target.value });
          }}
        />
      </label>
      <label className='addBook_Label'>
        <span> Описание</span>
        <textarea
          name='description'
          maxLength={250}
          placeholder='Описание'
          value={bookField.description}
          onChange={(e) => {
            setbookFields({ ...bookField, description: e.target.value });
          }}
        />
      </label>
      <label className='addBook_Label'>
        <span> Год издания</span>
        <input
          name='year'
          type='number'
          placeholder='Год'
          value={bookField.year}
          onChange={(e) => setbookFields({ ...bookField, year: Number(e.target.value) })}
        />
      </label>
      <div className='addBook_Labelpic'>
        <span> Картинки </span>
        <ImageUploader pictures={pictures} setPictures={setPictures} />
      </div>
      <button className='addBook_button' type='submit'>
        Добавить
      </button>
    </form>
  );
};

export default Addition;
