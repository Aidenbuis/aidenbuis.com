export interface FileProps {
  name: string;
  type: "file";
  content: [];
}

export type FilePropsOrFolderProps = FileProps | FolderProps;

export interface FolderProps {
  name: string;
  type: "folder";
  content: FilePropsOrFolderProps[];
  open?: boolean;
}

const innerWorkingsDirectoryData: FolderProps[] = [
  {
    name: ".git",
    open: true,
    type: "folder",
    content: [
      { name: "hooks", type: "folder", content: [] },
      { name: "info", type: "folder", content: [] },
      { name: "objects", type: "folder", content: [] },
      { name: "refs", type: "folder", content: [] },
      { name: "config", type: "file", content: [] },
      { name: "description", type: "file", content: [] },
      { name: "HEAD", type: "file", content: [] },
      { name: "index", type: "file", content: [] },
    ],
  },
];

export default innerWorkingsDirectoryData;
