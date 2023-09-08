import { Extension } from "@tiptap/core";

export const BlockContainerCustomPropsExtension = Extension.create({
  name: "blockContainerCustomProps",

  addGlobalAttributes() {
    return [
      {
        types: ["blockContainer"],
        attributes: {
          customProps: {
            default: {
              test: "",
            },
          },
        },
      },
    ];
  },
});
