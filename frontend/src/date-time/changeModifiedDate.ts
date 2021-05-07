import { DocumentDto } from '@shared/dto';
import dateAndTime from './dateAndTime';
import { documentEditVuexModule } from '@src/vuex/store-accessor';

const changeModifiedDate = (document: DocumentDto): void => {
  const date = dateAndTime();
  documentEditVuexModule.changeModifiedDate([document, date]);
};

export default changeModifiedDate;
