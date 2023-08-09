export interface tagType {
  [x: string]: any;
  tags: {
    tagId: number;
    tagName: string;
  }[];
}

export interface tagItemType {
  tagId: number;
  tagName: string;
}
