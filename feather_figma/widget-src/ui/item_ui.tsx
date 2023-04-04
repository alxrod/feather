import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, 
  Input, Image, useEffect, waitForTask } from "../widget"

import { ItemNub } from "../types";
import { ContractNub } from "../types";
import { logo_image } from "../images";
import { dateToString } from "../helpers";

export const ItemUI = (
  selectedItem: ItemNub, 
  setItemToSelected: any
) => {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="start"
      verticalAlignItems="start"
      padding={24}
      fill="#f9f9f9"
      stroke="#D8E0E4"
      strokeWidth={2}
      cornerRadius={20}
      spacing={12}
      width={"hug-contents"}
      height={"hug-contents"}
    >
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="start"
        verticalAlignItems="center"
        height="hug-contents"
        width="hug-contents"
        padding={5}
        spacing={10}
      >
        <Image
          // Pass a data uri directly as the image
          src={logo_image}
          width={200}
          height={54}
        />

        <Rectangle
          width={20}
          height={10}
        />

        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          height="hug-contents"

          fill={"#1C6D3A"}
          cornerRadius={10}
          padding={12}

          onClick={setItemToSelected}
        >

          <Text
            fontSize={20}
            fill={"#FFFFFF"}
          >
            Set Asset to Selected
          </Text>
        
        </AutoLayout>
      </AutoLayout>

      <AutoLayout
        direction="vertical"
        horizontalAlignItems="start"
        verticalAlignItems="start"
        height="hug-contents"
        padding={5}
        spacing={10}
      >
        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="start"
          verticalAlignItems="start"
          height="hug-contents"
          padding={5}
          spacing={450}
        >
        <Text
            fontSize={36}
        >
          {selectedItem.name}
        </Text>

        </AutoLayout>
        <Text
          fontSize={30}
          fill={"#60646c"}
          width={450}
        >
          {selectedItem.body}
        </Text>
        
      </AutoLayout>
    </AutoLayout>
  )
}