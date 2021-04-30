import { DocumentDto } from '@shared/dto';
import { apiWithAuth } from '../../api.helper';

const endpoint = 'documents';

class DocumentApi {
  static async getAllDocuments(): Promise<DocumentDto[]> {
    return await apiWithAuth.get(endpoint);
  }
}

export { DocumentApi };
