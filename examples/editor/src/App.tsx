// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "./App.module.css";
import { useEffect } from "react";
import { PartialBlock } from "@blocknote/core";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

function App() {
  const editor = useBlockNote({
    onEditorContentChange: (editor) => {
      console.log(editor.topLevelBlocks);
    },
    domAttributes: {
      editor: {
        class: styles.editor,
        "data-test": "editor",
      },
    },
  });
  const convertedBlocks: PartialBlock[] = [
    {
      id: "29",
      content: [
        {
          type: "text",
          text: "textUntitled",
          styles: {},
          custom: {
            mention: "abc",
          },
        },
        {
          type: "text",
          text: "pageUntitled",
          styles: {
            textColor: "red",
          },
          custom: {
            linkToPage: "pageAbc",
          },
        },
      ],
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      custom: {
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
        },
      ],
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      custom: {
        properties: {
          category: "aaaaaaaa",
        },
      },
      children: [],
    },
  ];

  useEffect(() => {
    editor.replaceBlocks(editor.topLevelBlocks, convertedBlocks);
  }, []);

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
