export interface INoteProps {
  note: { id: number; task: string; hashtags: Array<string> };
  removeNote: (id: number) => void;
  onChange: (id: number, correctNote: string, hashtags: Array<string>) => void;
}
