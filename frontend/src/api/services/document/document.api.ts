/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentDto } from '@shared/dto';
import { CreateDocumentRequest } from '@shared/request-response';
import { apiWithAuth } from '../../api.helper';

const endpoint = 'documents';

class DocumentApi {
  static async getAllDocuments(): Promise<DocumentDto[]> {
    return await apiWithAuth.get(endpoint);
  }

  // Should be a way to do it better
  static async getDocument({ id }: { id: string }): Promise<DocumentDto> {
    const document = await apiWithAuth.get<any>(`${endpoint}/${id}`);
    return await DocumentDto.new(DocumentDto, document);
  }

  static async createDocument(request: CreateDocumentRequest): Promise<DocumentDto> {
    return await apiWithAuth.post(endpoint, request);
  }
}

export { DocumentApi };
