export interface MediaContent {
  mediaId: string;
  contentName: string;
  publicationTimestamp: string;
  contentSrc: string;
  postId?: string;
  existsIn?: string[];
}

export interface Folder {
  idFolder: string;
  FolderName: string;
  MediaArray: string[];
}
