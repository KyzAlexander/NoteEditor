export interface INoteProps {
  note: { id: number; task: string; hashtags: Array<string>; date: string };
  removeNote: (id: number) => void;
  onChange: (
    id: number,
    correctNote: string,
    hashtags: Array<string>,
    date: string
  ) => void;
}
