import {
  PartialBlock,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@jitera/blocknote-core";
// import "@jitera/blocknote-core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEffect } from "react";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

export function App() {
  const editor = useBlockNote({
    domAttributes: {
      editor: {
        class: "editor",
        "data-test": "editor",
      },
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });
  const convertedBlocks: PartialBlock<any, any, any>[] = [
    {
      id: "29",
      content: [
        {
          type: "text",
          text: "textUntitled",
          styles: {
            textColor: "yellow",
          },
          customContentProps: {
            mention: "abc",
          },
        },
        {
          type: "text",
          text: "pageUntitled",
          styles: {
            textColor: "red",
          },
          customContentProps: {
            linkToPage: "pageAbc",
          },
        },
      ],
      props: {
        textColor: "default",
        backgroundColor: "red",
        textAlignment: "left",
      },
      customProps: {
        properties: {
          category: "specification",
        },
      },
      children: [],
    },
    {
      id: "28",
      content: [
        {
          type: "text",
          text: "Untitled",
          styles: {},
          customContentProps: {
            anything: "abc",
          },
        },
      ],
      props: {
        textColor: "default",
        backgroundColor: "red",
        textAlignment: "left",
      },
      customProps: {
        properties: {
          parent_id: "29",
        },
      },
      children: [],
    },
  ];

  useEffect(() => {
    editor.replaceBlocks(editor.topLevelBlocks, convertedBlocks);
    console.log(editor.topLevelBlocks);
  }, []);

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
