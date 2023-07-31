import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelpTwoToneIcon } from '../icons/HelpTwoToneIcon';
import { CancelTwoToneIcon } from '../icons/CancelTwoToneIcon';
import Main from '../Main/Main';
import Addition from '../Addition/Addition';
import DetailedInfo from '../DetailedInfo/DetailedInfo';
import { backend, front } from '../../shared/constants';
import './App.scss';
import { Link } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const [isShowtask, setShowTask] = useState(false);
  return (
    <div className='App'>
      {location.pathname !== '/' && (
        <Link className='toMain' to='/'>
          На главную
        </Link>
      )}
      {isShowtask ? (
        <div className='podlozhka'>
          <i title='Закрыть инфо' onClick={() => setShowTask(false)}>
            <CancelTwoToneIcon />
          </i>
          <h2>Задача</h2>
          <p>{front}</p>
          <p>{backend}</p>
        </div>
      ) : (
        <i title='Задача' onClick={() => setShowTask(true)}>
          <HelpTwoToneIcon />
        </i>
      )}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='details/:id' element={<DetailedInfo />} />
        <Route path='/book' element={<Addition />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
