import { defaultBlockSpecs, defaultProps } from "@jitera/blocknote-core";
import "@jitera/blocknote-core/style.css";
import {
  BlockNoteView,
  createReactBlockSpec,
  useBlockNote,
} from "@blocknote/react";
import "../vanilla-custom-blocks/style.css";
import { memo, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

// The types of alerts that users can choose from
const alertTypes = {
  warning: {
    icon: "⚠️",
    color: "#e69819",
    backgroundColor: "#fff6e6",
  },
  error: {
    icon: "⛔",
    color: "#d80d0d",
    backgroundColor: "#ffe6e6",
  },
  info: {
    icon: "ℹ️",
    color: "#507aff",
    backgroundColor: "#e6ebff",
  },
  success: {
    icon: "✅",
    color: "#0bc10b",
    backgroundColor: "#e6ffe6",
  },
};

export const alertBlock = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "warning" as const,
        values: ["warning", "error", "info", "success"] as const,
      },
    },
    content: "inline",
  },
  {
    render: (props) => (
      <div
        className={"alert"}
        style={{
          backgroundColor: alertTypes[props.block.props.type].backgroundColor,
        }}>
        <select
          contentEditable={false}
          value={props.block.props.type}
          onChange={(event) => {
            props.editor.updateBlock(props.block, {
              type: "alert",
              props: { type: event.target.value as keyof typeof alertTypes },
            });
          }}>
          <option value="warning">{alertTypes["warning"].icon}</option>
          <option value="error">{alertTypes["error"].icon}</option>
          <option value="info">{alertTypes["info"].icon}</option>
          <option value="success">{alertTypes["success"].icon}</option>
        </select>
        <div className={"inline-content"} ref={props.contentRef} />
      </div>
    ),
  }
);

const simpleImageBlock = createReactBlockSpec(
  {
    type: "simpleImage",
    propSchema: {
      src: {
        default:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return (
        <img
          className={"simple-image"}
          src={props.block.props.src}
          alt="placeholder"
        />
      );
    },
  }
);

export const bracketsParagraphBlock = createReactBlockSpec(
  {
    type: "bracketsParagraph",
    content: "inline",
    propSchema: {
      ...defaultProps,
    },
  },
  {
    render: (props) => {
      console.log("====render");
      return (
        <div className={"brackets-paragraph"}>
          <div contentEditable={"false"}>{"["}</div>
          <span contentEditable={"false"}>{"{"}</span>
          <div className={"inline-content"} ref={props.contentRef} />
          <span contentEditable={"false"}>{"}"}</span>
          <div contentEditable={"false"}>{"]"}</div>
        </div>
      );
    },
  }
);

mermaid.initialize({
  startOnLoad: true,
  theme: "base",
  themeVariables: {
    primaryColor: "#191919",
    primaryTextColor: "#fff",
    primaryBorderColor: "#262626",
    lineColor: "#fff",
  },
});

export const JNMermaidBlock = memo(({ content }: { content: string }) => {
  const [error, setError] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [dialogContent, setDialogContent] = useState("");
  useEffect(() => {
    const mermaidCharts = document.querySelectorAll(".mermaid");
    Array.prototype.forEach.call(mermaidCharts, (mermaidChart) => {
      // eslint-disable-next-line unicorn/prefer-dom-node-dataset
      mermaidChart.removeAttribute("data-processed");
    });
    if (diagramRef.current) {
      mermaid.init(undefined, diagramRef.current);
    }

    mermaid.contentLoaded();
    mermaid.parseError = () => {
      setError(true);
    };
  }, []);
  const handleShowDialog = () => {
    // This is a hack to improve performance by not rendering digram in dialog
    setDialogContent(diagramRef.current?.innerHTML || "");
  };

  // if (error) {
  //   return <p>{t('n.common.no_diagram')}</p>
  // }
  return (
    <>
      <div
        ref={diagramRef}
        onClick={handleShowDialog}
        className="mermaid"
        role="button"
        tabIndex={0}
        // Required to prevent the popover from closing when clicking on the content
        onKeyDown={() => {}}>
        {content}
      </div>
    </>
  );
});

const JNCodeBlock = createReactBlockSpec(
  {
    type: "codeBlock",
    propSchema: {
      ...defaultProps,
      codeBlockTitle: {
        default: "Title",
      },
      codeType: {
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: ({ block }) => {
      let codes = "";

      // if (safeGet(block, "content[0].type") === "text") {
      // codes = safeGet(block, "content[0].text");
      // }
      codes = (block.content[0] as any).text;

      return (
        <div className="tw-py-[16px]">
          <JNMermaidBlock content={codes} />
        </div>
      );
    },
  }
);

export function ReactCustomBlocks() {
  const editor = useBlockNote(
    {
      domAttributes: {
        editor: {
          class: "editor",
          "data-test": "editor",
        },
      },
      blockSpecs: {
        ...defaultBlockSpecs,
        alert: alertBlock,
        simpleImage: simpleImageBlock,
        bracketsParagraph: bracketsParagraphBlock,
        codeBlock: JNCodeBlock,
      },
      initialContent: [
        {
          id: "ef3ea6c6-f45c-4dfd-a815-12e8c967a5c0",
          type: "heading",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Input",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "22c9fe96-1e40-499a-b24b-d1c215ad0c26",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: '"params": a hash containing filters and pagination options',
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "f247fd57-2dbe-4c21-9dc2-497831020800",
          type: "heading",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Flow",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "88cadb45-3d8e-4839-948f-eaf02ac7f64a",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Initialize the Bid query.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "86fc4869-9691-457b-af13-b5ae990d95be",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Filter Bids by price if a price filter is provided.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "6b14d986-d198-44a1-8de7-5d7c0d4f0195",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Filter Bids by item ID if an item ID filter is provided.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "f439a111-5f4e-4b95-9d80-091ee7d685da",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Filter Bids by user ID if a user ID filter is provided.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "a0ecaeb8-9894-4589-8d13-9976a3d5a4fc",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Filter Bids by status if a status filter is provided.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "b1592210-3131-42fd-88ce-2414953f89e8",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Order the Bids by creation date in descending order.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "20362d46-cba9-4346-907c-a285b03e1134",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Paginate the Bids based on provided pagination parameters or default values.",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "8bc69445-2f7c-4606-a1e8-d96462146433",
          type: "heading",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Diagram",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "0f88bb9e-0c56-4a93-90e1-b9a0d8c0ad53",
          type: "codeBlock",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            codeBlockTitle: "Title",
            codeType: "mermaid",
          },
          content: [
            {
              type: "text",
              text: "flowchart TD\n    A[Start] --> B{Filter by Price?}\n    B -->|Yes| C[Filter Bids by Price]\n    B -->|No| D{Filter by Item ID?}\n    C --> D\n    D -->|Yes| E[Filter Bids by Item ID]\n    D -->|No| F{Filter by User ID?}\n    E --> F\n    F -->|Yes| G[Filter Bids by User ID]\n    F -->|No| H{Filter by Status?}\n    G --> H\n    H -->|Yes| I[Filter Bids by Status]\n    H -->|No| J{Order Records?}\n    I --> J\n    J -->|Yes| K[Order Bids by Creation Date Desc]\n    J -->|No| L{Paginate Records?}\n    K --> L\n    L -->|Yes| M[Paginate Bids]\n    L -->|No| N[End]\n    M --> N",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "8b9237b7-eeea-44bc-8962-739ac09af385",
          type: "heading",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Response",
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
        {
          id: "9b8f36ab-3306-4d4c-a06f-6b662bfa5b94",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: '"records": a paginated collection of Bid records',
              styles: {},
              customContentProps: {},
            },
          ],
          children: [],
        },
      ],
    },
    []
  );

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView className="root" editor={editor} />;
}
