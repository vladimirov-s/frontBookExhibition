import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedInfoI } from '../../helper/interfaces';
import { url } from '../../shared/constants';
import './style.scss';

const DetailedInfo = () => {
  const id = useParams<string>().id;
  const [book, setBook] = useState<DetailedInfoI>({
    title: '',
    author: '',
    pictures: [''],
    description: '',
    year: 0
  });

  const fetcher = async () => {
    const respons = await axios.get(`${url}/details/${id}`);
    setBook(respons.data);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className='detail'>
      <h2 className='detail_headText'>Детальная инвормация о книге</h2>
      <div className='detail_wrapper'>
        <div className='detail_field pic'>
          {book.pictures?.map((pic) => (
            <img src={`${url}/pictures/${pic}`} alt='' />
          ))}
        </div>
        <div className='detail_field'>
          <b>Название:</b>
          {book.title}
        </div>
        <div className='detail_field'>
          <b>Автор:</b> {book.author}
        </div>
        <div className='detail_field'>
          <b>Описание:</b> {book.description}
        </div>
        <div className='detail_field'>
          <b>Год выпуска:</b> {book.year}
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;
