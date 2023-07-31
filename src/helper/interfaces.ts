export interface BooksI extends YearI, PicturesI, IDI, SimpleBookI {}
export interface DetailedInfoI extends SimpleBookI, YearI, PicturesI {}
export interface CreateBookI extends YearI, SimpleBookI, PictureI {}

interface SimpleBookI {
  title: string;
  author: string;
  description: string;
}

export interface IDI {
  _id: string;
}

interface YearI {
  year?: number;
}

interface PicturesI {
  pictures: [string];
}

interface PictureI {
  picture: string;
}
