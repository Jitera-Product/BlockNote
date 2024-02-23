import {
  PartialBlock,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@jitera/blocknote-core";
// import "@jitera/blocknote-core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEffect, useRef } from "react";
import { faker } from "@faker-js/faker";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

const convertedBlocks = [
  {
    id: "initialBlockId",
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "aaaa",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "34d8ec62-f410-4e62-9531-c4306889f72a",
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "11",
        styles: {},
      },
      {
        type: "text",
        text: "22",
        styles: {
          bold: true,
        },
      },
      {
        type: "text",
        text: "33",
        styles: {
          underline: true,
        },
      },
      {
        type: "link",
        content: [
          {
            type: "text",
            text: "link",
            styles: {},
          },
        ],
        href: "https://link",
      },
    ],
    children: [
      {
        id: "4083e6d9-c4dd-4b25-bf01-d0112a9a42f6",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "child1",
            styles: {},
          },
        ],
        children: [],
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
      },
      {
        id: "f68db95e-06bf-4745-8da7-dfcd89118e7a",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "child2",
            styles: {},
          },
        ],
        children: [],
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
      },
    ],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "505faa80-117e-427d-a379-1662657f6fc6",
    type: "numberedListItem",
    content: [
      {
        type: "text",
        text: "11",
        styles: {},
      },
      {
        type: "text",
        text: "22",
        styles: {
          bold: true,
        },
      },
      {
        type: "text",
        text: "33",
        styles: {
          underline: true,
        },
      },
      {
        type: "link",
        content: [
          {
            type: "text",
            text: "link",
            styles: {},
          },
        ],
        href: "https://link",
      },
    ],
    children: [
      {
        id: "f80cb661-3fcd-462f-970d-167957cd2d02",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "child1",
            styles: {},
          },
        ],
        children: [],
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
      },
      {
        id: "d4865252-0552-40b8-a12f-eb5e41c2167a",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "child2",
            styles: {},
          },
        ],
        children: [],
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
      },
    ],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "f9c6fc63-e075-4bd6-830d-34e4fc542597",
    type: "numberedListItem",
    content: [
      {
        type: "text",
        text: "number2222",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "1b6c99b5-6e66-4535-81fb-6ac3f9aa2d0c",
    type: "bulletListItem",
    content: [
      {
        type: "text",
        text: "bullet1",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "8b931076-311f-46ac-8f52-9d499d2dba1f",
    type: "bulletListItem",
    content: [
      {
        type: "text",
        text: "bullet2",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "bbc81ce3-a7ba-4bd9-917f-e862fd2d0e78",
    type: "heading",
    content: [
      {
        type: "text",
        text: "h111",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "64902151-fa8c-48fb-96bc-1f92064c94bb",
    type: "heading",
    content: [
      {
        type: "text",
        text: "h2222",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "9788e7b2-1625-473a-9995-dc7c3ea929c5",
    type: "heading",
    content: [
      {
        type: "text",
        text: "h33333",
        styles: {},
      },
    ],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
  {
    id: "b3f4b75c-133d-40a0-9e4b-cb73f3d4997c",
    type: "paragraph",
    content: [],
    children: [],
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
    },
  },
];

export function App() {
  const contentRef = useRef<string>("");

  const editor = useBlockNote(
    {
      domAttributes: {
        editor: {
          class: "editor",
          "data-test": "editor",
        },
      },
      uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
      // initialContent: convertedBlocks,
      onEditorContentChange: (editor) => {
        console.log("=====editor.topLevelBlocks: ", editor.topLevelBlocks);
      },
    },
    [contentRef.current]
  );

  useEffect(() => {
    const updateTextIncrementally = () => {
      // random 1 - 3 words
      contentRef.current +=
        " " + faker.lorem.words(Math.floor(Math.random() * 3) + 1);
      console.log("========updateTextIncrementally, ", contentRef.current);
      editor.updateBlock(editor.topLevelBlocks[0].id, {
        id: "initialBlockId",
        type: "paragraph",
        content: [
          {
            type: "text",
            text: contentRef.current,
            styles: {},
          },
        ],
        children: [],
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
      });
      // setTimeout(updateTextIncrementally, 1000);
    };

    const timeoutId = setInterval(() => {
      updateTextIncrementally();
    }, 300);

    return () => clearInterval(timeoutId);
  }, []);

  // const convertedBlocks: PartialBlock<any, any, any>[] = [
  //   {
  //     id: "29",
  //     content: [
  //       {
  //         type: "text",
  //         text: "textUntitled",
  //         styles: {
  //           textColor: "yellow",
  //         },
  //         customContentProps: {
  //           mention: "abc",
  //         },
  //       },
  //       {
  //         type: "text",
  //         text: "pageUntitled",
  //         styles: {
  //           textColor: "red",
  //         },
  //         customContentProps: {
  //           linkToPage: "pageAbc",
  //         },
  //       },
  //     ],
  //     props: {
  //       textColor: "default",
  //       backgroundColor: "red",
  //       textAlignment: "left",
  //     },
  //     children: [],
  //   },
  //   {
  //     id: "28",
  //     content: [
  //       {
  //         type: "text",
  //         text: "Untitled",
  //         styles: {},
  //         customContentProps: {
  //           anything: "abc",
  //         },
  //       },
  //     ],
  //     props: {
  //       textColor: "default",
  //       backgroundColor: "red",
  //       textAlignment: "left",
  //     },
  //     children: [],
  //   },
  // ];

  useEffect(() => {
    editor.replaceBlocks(editor.topLevelBlocks, convertedBlocks as any);
    console.log(editor.topLevelBlocks);
  }, []);

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
