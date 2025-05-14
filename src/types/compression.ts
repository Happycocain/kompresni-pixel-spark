
export interface BatchFile {
  id: string;
  name: string;
  content: string;
  size: number;
  compressed?: string;
  compressedSize?: number;
  ratio?: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}
