import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
  mergeCSSClasses,
} from "@jitera/blocknote-core";
import { MantineProvider, createStyles } from "@mantine/core";
import { EditorContent } from "@tiptap/react";
import { HTMLAttributes, ReactNode, useMemo } from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { Theme, blockNoteToMantineTheme } from "./BlockNoteTheme";
import {
  FormattingToolbarPositioner,
  FormattingToolbarProps,
} from "../components/FormattingToolbar/FormattingToolbarPositioner";
import { HyperlinkToolbarPositioner } from "../components/HyperlinkToolbar/HyperlinkToolbarPositioner";
import { ImageToolbarPositioner } from "../components/ImageToolbar/ImageToolbarPositioner";
import { SideMenuPositioner } from "../components/SideMenu/SideMenuPositioner";
import { SlashMenuPositioner } from "../components/SlashMenu/SlashMenuPositioner";
import { TableHandlesPositioner } from "../components/TableHandles/TableHandlePositioner";
import { darkDefaultTheme, lightDefaultTheme } from "./defaultThemes";
import { Toolbar } from "../components-shared/Toolbar/Toolbar";
import { ToggledStyleButton } from "../components/FormattingToolbar/DefaultButtons/ToggledStyleButton";
import { ColorStyleButton } from "../components/FormattingToolbar/DefaultButtons/ColorStyleButton";
import { CreateLinkButton } from "../components/FormattingToolbar/DefaultButtons/CreateLinkButton";
import {
  BlockTypeDropdown,
  BlockTypeDropdownItem,
} from "../components/FormattingToolbar/DefaultDropdowns/BlockTypeDropdown";

const CustomFormattingToolbar = <BSchema extends BlockSchema>(
  props: FormattingToolbarProps<BSchema> & {
    blockTypeDropdownItems?: BlockTypeDropdownItem[];
  }
) => {
  return (
    <Toolbar>
      <BlockTypeDropdown {...props} items={props.blockTypeDropdownItems} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      <ColorStyleButton editor={props.editor} />
      <CreateLinkButton editor={props.editor} />
    </Toolbar>
  );
};

// Renders the editor as well as all menus & toolbars using default styles.
function BaseBlockNoteView<
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema
>(
  props: {
    editor: BlockNoteEditor<BSchema, ISchema, SSchema>;
    children?: ReactNode;
  } & HTMLAttributes<HTMLDivElement>
) {
  const { classes } = createStyles({ root: {} })(undefined, {
    name: "Editor",
  });

  const { editor, children, className, ...rest } = props;

  return (
    <EditorContent
      editor={props.editor?._tiptapEditor}
      className={mergeCSSClasses(classes.root, props.className || "")}
      {...rest}>
      {props.children || (
        <>
          <FormattingToolbarPositioner
            editor={props.editor}
            formattingToolbar={CustomFormattingToolbar}
          />
          <HyperlinkToolbarPositioner editor={props.editor} />
          <SlashMenuPositioner editor={props.editor} />
          <SideMenuPositioner editor={props.editor} />
          <ImageToolbarPositioner editor={props.editor} />
          {props.editor.blockSchema.table && (
            <TableHandlesPositioner editor={props.editor as any} />
          )}
        </>
      )}
    </EditorContent>
  );
}

export function BlockNoteView<
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema
>(
  props: {
    editor: BlockNoteEditor<BSchema, ISchema, SSchema>;
    theme?:
      | "light"
      | "dark"
      | Theme
      | {
          light: Theme;
          dark: Theme;
        };
    children?: ReactNode;
  } & HTMLAttributes<HTMLDivElement>
) {
  const {
    theme = { light: lightDefaultTheme, dark: darkDefaultTheme },
    ...rest
  } = props;

  const preferredTheme = usePrefersColorScheme();

  const mantineTheme = useMemo(() => {
    if (theme === "light") {
      return blockNoteToMantineTheme(lightDefaultTheme);
    }

    if (theme === "dark") {
      return blockNoteToMantineTheme(darkDefaultTheme);
    }

    if ("light" in theme && "dark" in theme) {
      return blockNoteToMantineTheme(
        theme[preferredTheme === "dark" ? "dark" : "light"]
      );
    }

    return blockNoteToMantineTheme(theme);
  }, [preferredTheme, theme]);

  return (
    <MantineProvider theme={mantineTheme}>
      <BaseBlockNoteView {...rest} />
    </MantineProvider>
  );
}
