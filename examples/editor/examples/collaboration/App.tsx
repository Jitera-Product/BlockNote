// import { uploadToTmpFilesDotOrg_DEV_ONLY } from "@jitera/blocknote-core";
import "@jitera/blocknote-core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { uploadToTmpFilesDotOrg_DEV_ONLY } from "@jitera/blocknote-core";

import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";
import { useEffect, useState } from "react";

const doc = new Y.Doc();

const provider = new YPartyKitProvider(
  // "blocknote-dev.yousefed.partykit.dev",
  "http://127.0.0.1:1999",
  // use a unique name as a "room" for your application:
  "your-project-name",
  doc
);

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

export function Collaboration() {
  const editor = useBlockNote({
    domAttributes: {
      editor: {
        class: "editor",
        "data-test": "editor",
      },
    },
    collaboration: {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-storesss"),
      // Information (name and color) for this user:
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView className="root" editor={editor} />;
}

export default Collaboration;
