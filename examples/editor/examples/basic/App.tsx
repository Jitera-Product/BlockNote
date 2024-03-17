import {
  PartialBlock,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@jitera/blocknote-core";
// import "@jitera/blocknote-core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEffect } from "react";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

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
      },
      {
        type: "text",
        text: "pageUntitled",
        styles: {
          textColor: "red",
        },
      },
    ],
    props: {
      textColor: "default",
      backgroundColor: "red",
      textAlignment: "left",
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
      },
    ],
    props: {
      textColor: "default",
      backgroundColor: "red",
      textAlignment: "left",
    },
    children: [],
  },
];

export function App() {
  const editor = useBlockNote({
    domAttributes: {
      editor: {
        class: "editor",
        "data-test": "editor",
      },
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
    onEditorContentChange: (editor) => {},
    // initialContent: convertedBlocks as any,
  });

  useEffect(() => {
    if (!editor) return;
    setTimeout(() => {
      editor.replaceBlocks(editor.topLevelBlocks, convertedBlocks as any, true);
    }, 1000);
  }, [editor]);

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
