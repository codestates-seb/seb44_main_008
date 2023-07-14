import { instance } from '../api';
import { DetailData } from '../../pages/Detail/Detailcontent/detailType';

export const getItemDetail = (): Promise<DetailData> =>
  instance.get('/main').then(res => res.data);
