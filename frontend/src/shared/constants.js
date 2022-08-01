export const url = "http://localhost:5002";
export const front = `(ReactJS+SCSS) Создайте проект. в проекте реализовать 3 роута: 
          1) /main
          2) /details/:id 
          3) /addNew. main: страница со списком книг и кнопкой
        удаления над каждой книгой. По клику на любую книгу загружается роут /details/:id, со страницей показывающей всю информацию по книге и кнопкой назад. О книге должно отображаться: название книги, автор, год, описание, изображение (любое по умолчанию на Ваш выбор). На главной странице main располагается всегда статически кнопка Add. По нажатию на эту кнопку пользователя переводит на /addNew для заполнения полей о книге: название, автор, год, описание. И так же 2 кнопки: назад и сохранить. По сохранить отправляется запрос на сервер и после успешного ответа, переводит на страницу main. Проект объединить с разработанным сервером в другом задании. `;
export const backend = `Создайте проект. Разработать приложение, взаимодействующее с базой данных. Разработать схему для таблицы по книгам с полями: название, автор, год, описание. Реализовать 4 роута: 1) для сохранения новой книги. 2) Для удаления новой книги. 3) Для получения всех книг. 4) Для получения всей информации об одной книге.`;