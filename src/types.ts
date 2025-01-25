export type Topic = {
  id: string;
  name: string;
  subcategories?: Topic[];
};

export type RecordingState = 'idle' | 'recording' | 'preview' | 'uploading' | 'complete';