import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, 
  Input, Image, useEffect, waitForTask } from "./widget"

import { ContractNub } from "./types";
import { logo_image } from "./images";
import { dateToString } from "./helpers";

export const HubUI = (
  connectToFeather: any, 
  contractId: string,
  setContractId: any,
  contractSecret: string,
  setContractSecret: any,
  contract: ContractNub,
  contractSelected: boolean,
  updateContractInfo: any,


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
      width="hug-contents"
      height={"hug-contents"}
    >
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="start"
        verticalAlignItems="center"
        height="hug-contents"
        width={"fill-parent"}
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
          width={"fill-parent"}
          height={10}
        />
        {contractSelected && (
        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="center"
          verticalAlignItems="center"
          height="hug-contents"

          fill={"#1C6D3A"}
          cornerRadius={6}
          padding={10}

          onClick={updateContractInfo}
        >

          <Text
            fontSize={20}
            fill={"#FFFFFF"}
          >
            Reload
          </Text>
        
        </AutoLayout>
        )}
      </AutoLayout>
      {contractSelected ? (
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
            {contract.title}
          </Text>
          <Text
              fontSize={36}
              fill={"#1C6D3A"}
          >
            ${contract.price ? (contract.price/100).toString() : ""}
          </Text>
          </AutoLayout>
          <Text
            fontSize={20}
            fill={"#9ca3af"}
          >
            {contract.summary}
          </Text>
          
          <AutoLayout direction="horizontal" width="fill-parent" height="hug-contents">
            <Rectangle x={24} 
              positioning="absolute" 
              height={150*Math.max(4, Math.max(contract.deadlines.length, contract.items.length))} 
              width={2} 
              fill={"#9ca3af"}/>
            
            <AutoLayout 
              direction="vertical"
              horizontalAlignItems="start"
              verticalAlignItems="start"
              height="hug-contents"
              width={"fill-parent"}
              padding={5}
              spacing={0}
            >
              {contract.deadlines.map(deadline => {
                return (
                  <AutoLayout 
                    key={deadline.id} 
                    direction="horizontal"
                    horizontalAlignItems="start" 
                    verticalAlignItems="start"
                    width={"fill-parent"}
                    height={"hug-contents"}
                    spacing={0}
                  >
                    <AutoLayout padding={5} spacing={5} width={"fill-parent"} direction="vertical" height={"hug-contents"}>
                      <AutoLayout padding={5} spacing={5} width={"fill-parent"} verticalAlignItems="center">
                        <Ellipse width={20} height={20} fill={"#1C6D3A"}/>
                        <Text fontSize={24}>{deadline.name}</Text>
                        <Rectangle width={"fill-parent"} height={5}/>
                        <Text fontSize={18} fill={"#1C6D3A"}>${deadline.payout/100}</Text>
                        <Text fontSize={18} fill={"#9ca3af"}>on {dateToString(deadline)}</Text>
                      </AutoLayout>
                      <AutoLayout direction="vertical" width={"fill-parent"} height={"hug-contents"} padding={{left:25}} spacing={10}>
                        {deadline.items.map(item => {
                          return (
                            <AutoLayout 
                              key={item.id} 
                              padding={{vertical: 10, horizontal: 20}} 
                              stroke="#D8E0E4"
                              fill="#FFFFFF"
                              strokeWidth={1}
                              cornerRadius={10}
                              spacing={8}
                              direction="vertical"
                              width={"fill-parent"}
                            > 
                              <AutoLayout direction="horizontal" verticalAlignItems="center" spacing={5}>
                                <Ellipse width={10} height={10} fill={"#1C6D3A"}/>
                                <Text fontSize={20}>{item.name}</Text>
                              </AutoLayout>
                              <Text width={"fill-parent"} fill={"#9ca3af"}>{item.body}</Text>

                            </AutoLayout>
                          )
                        })}
                      </AutoLayout>
                    </AutoLayout>
                  </AutoLayout>
                )
              })}
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
      ) : (
        <AutoLayout
          direction="vertical"
          horizontalAlignItems="center"
          verticalAlignItems="center"
          height={200}
          width={500}
          padding={5}
          spacing={10}
        >
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            height="hug-contents"

            fill={"#1C6D3A"}
            cornerRadius={10}
            padding={24}

            onClick={connectToFeather}
          >

            <Text
              fontSize={40}
              fill={"#FFFFFF"}
            >
              Connect Your Contract
            </Text>
          
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  )
}