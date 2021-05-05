import { DocumentDto } from '@shared/dto';
import { CreateDocumentRequest } from '@shared/request-response';
import { apiWithAuth } from '../../api.helper';

const endpoint = 'documents';

class DocumentApi {
  static async getAllDocuments(): Promise<DocumentDto[]> {
    return await apiWithAuth.get(endpoint);
  }

  static async createDocument(request: CreateDocumentRequest): Promise<DocumentDto> {
    return await apiWithAuth.post(endpoint, request);
  }
}

export { DocumentApi };
