export type Styles = {
  bold?: true;
  italic?: true;
  underline?: true;
  strike?: true;
  code?: true;
  textColor?: string;
  backgroundColor?: string;
};

export type ToggledStyle = {
  [K in keyof Styles]-?: Required<Styles>[K] extends true ? K : never;
}[keyof Styles];

export type ColorStyle = {
  [K in keyof Styles]-?: Required<Styles>[K] extends string ? K : never;
}[keyof Styles];

export type CustomContentProps = {
  customContentProps?: {
    [key: string]: any;
  };
};

export type StyledText = {
  type: "text";
  text: string;
  styles: Styles;
} & CustomContentProps;

export type Link = {
  type: "link";
  href: string;
  content: StyledText[];
} & CustomContentProps;

export type PartialLink = Omit<Link, "content"> & {
  content: string | Link["content"];
};

export type InlineContent = StyledText | Link;
export type PartialInlineContent = StyledText | PartialLink;
