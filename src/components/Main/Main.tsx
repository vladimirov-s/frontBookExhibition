import { useState, useEffect } from 'react';
import { HighlightOffTwoToneIcon } from '../icons/HighlightOffTwoToneIcon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Book from './Book';
import { url } from '../../shared/constants';
import { BooksI } from '../../helper/interfaces';
import './style.scss';

const Main = () => {
  const [books, setBooks] = useState([]);
  const nav = useNavigate();

  const fetcher = async () => {
    const boks = await axios.get(url);
    setBooks(boks.data);
  };

  useEffect(() => {
    fetcher();
  }, []);

  const deleteHandler = async (id: string) => {
    await axios.delete(`${url}/${id}`);
    setBooks(books.filter((obj: BooksI) => obj._id !== id));
  };

  return (
    <div className='main'>
      <button onClick={() => nav('/book')}>Добавить новую книгу</button>
      <div className='main_table'>
        {books.map((element: BooksI, index) => (
          <div className='main_wrap' key={`elem${index}`}>
            <i
              className='delIcon'
              title='удалить'
              onClick={() => deleteHandler(element._id)}
            >
              <HighlightOffTwoToneIcon />
            </i>
            <Book element={element} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
