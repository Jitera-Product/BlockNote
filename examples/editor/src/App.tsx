// import logo from './logo.svg'
import "@jitera/blocknote-core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "./App.module.css";
import { useEffect } from "react";
import { PartialBlock } from "@jitera/blocknote-core";

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
    maxBlocksLimit: 500,
    errorCallback: () => {
      alert("Max blocks reached");
    },
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
      children: [],
    },
  ];

  useEffect(() => {
    editor.replaceBlocks(editor.topLevelBlocks, convertedBlocks as any);
    console.log(editor.topLevelBlocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
