import { Badge, createStyles, Menu, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

const MIN_LEFT_MARGIN = 5;

export type SlashMenuItemProps = {
  name: string;
  icon: JSX.Element;
  hint: string | undefined;
  shortcut?: string;
  isSelected: boolean;
  set: () => void;
  setRemoveHighlightCallback?: (
    removeHighlight: () => void,
    index: number
  ) => void;
  index: number;
  removeHighlights: (exclude: number) => void;
};

export function SlashMenuItem(props: SlashMenuItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const { classes } = createStyles({ root: {} })(undefined, {
    name: "SuggestionListItem",
  });

  function isSelected() {
    const isKeyboardSelected = props.isSelected;
    // props.selectedIndex !== undefined && props.selectedIndex === props.index;
    const isMouseSelected = itemRef.current?.matches(":hover");

    return isKeyboardSelected || isMouseSelected;
  }

  // Updates HTML "data-hovered" attribute which Mantine uses to set mouse hover styles.
  // Allows users to "hover" menu items when navigating using the keyboard.
  function updateSelection() {
    if (isSelected()) {
      itemRef.current?.setAttribute("data-hovered", "true");
    } else {
      itemRef.current?.removeAttribute("data-hovered");
    }
  }

  function removeHighlight() {
    itemRef.current?.removeAttribute("data-hovered");
  }

  useEffect(() => {
    if (props.setRemoveHighlightCallback) {
      props.setRemoveHighlightCallback(removeHighlight, props.index);
    }

    const tempItemRef = itemRef.current;

    const handleMouseEnter = () => {
      if (props.removeHighlights) {
        props.removeHighlights(props.index);
      }
    };

    if (tempItemRef) {
      itemRef.current.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      if (tempItemRef) {
        tempItemRef?.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.index, props.removeHighlights, props.setRemoveHighlightCallback]);

  useEffect(() => {
    // Updates whether the item is selected with the keyboard (triggered on selectedIndex prop change).
    updateSelection();

    if (
      isSelected() &&
      itemRef.current &&
      itemRef.current.getBoundingClientRect().left > MIN_LEFT_MARGIN //TODO: Kinda hacky, fix
      // This check is needed because initially the menu is initialized somewhere above outside the screen (with left = 1)
      // scrollIntoView() is called before the menu is set in the right place, and without the check would scroll to the top of the page every time
    ) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });

  return (
    <Menu.Item
      className={classes.root}
      icon={props.icon}
      onClick={props.set}
      closeMenuOnClick={false}
      // Ensures an item selected with both mouse & keyboard doesn't get deselected on mouse leave.
      onMouseLeave={() => {
        setTimeout(() => {
          updateSelection();
        }, 1);
      }}
      ref={itemRef}
      rightSection={
        props.shortcut && <Badge size={"xs"}>{props.shortcut}</Badge>
      }>
      <Stack>
        {/*Might need separate classes.*/}
        <Text size={14} weight={500}>
          {props.name}
        </Text>
        <Text size={10}>{props.hint}</Text>
      </Stack>
    </Menu.Item>
  );
}
