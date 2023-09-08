import { Mark } from "@tiptap/core";

export const CustomContentPropsMark = Mark.create({
  name: "customContentProps",

  addAttributes() {
    return {
      customContentProps: {
        default: undefined,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0]; // have to keep this, we might have to find another way to add custom props to content instead of setting it in Mark
  },
});
