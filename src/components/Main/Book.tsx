import { useNavigate } from 'react-router-dom';
import { url } from '../../shared/constants';
import { BooksI } from '../../helper/interfaces';

const Book = ({ element }: { element: BooksI }) => {
  const { pictures, title, author, year, description, _id } = element;
  const nav = useNavigate();

  return (
    <div className='book' onClick={() => nav(`/details/${_id}`)}>
      <img src={`${url}/pictures/${pictures[0]}`} alt='' />
      <span className='book_field'>
        <b> Название:</b> {title}
      </span>
      <span className='book_field'>
        <b>Автор:</b> {author}
      </span>
      <span className='book_field'>
        <b>Год:</b> {year}
      </span>
      <span className='book_field'>
        <b>Описание:</b> {description}
      </span>
    </div>
  );
};

export default Book;
