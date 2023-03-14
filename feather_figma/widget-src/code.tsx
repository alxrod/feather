import { logo_image  } from "./images"
import {widgetTypes, UserNub, DeadlineNub, ItemNub, ContractNub} from "./types"
import parseContract from "./parse_contract"
import { dateToString } from "./helpers"

import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, 
  Input, Image, useEffect, waitForTask, useWidgetId } from "./widget"

import { HubUI } from "./hub_ui"
import { ItemUI } from "./item_ui"

function Widget() {
  const widgetId = useWidgetId()

  const [widgetType, setWidgetType] = useSyncedState("widget_type", widgetTypes.HUB)
  
  const [contractId, setContractId] = useSyncedState("contract_id", "")
  const [contractSecret, setContractSecret] = useSyncedState("contract_secret", "")

  const [selectedItem, setSelectedItem] = useSyncedState("selected_item", {
    name: "Item",
    body: "Body",
    id: "",
  })

  const [contract, setContract] = useSyncedState("contract", ({
    title: "Contract Title",
    summary: "Contract Summary",
    price: 0,
    deadlines: [],
    items: [],
  } as ContractNub))

  const setItemToSelected = () => {
    const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
    let x = Infinity;
    let y = Infinity;

    for (const node of figma.currentPage.selection) {
      if (node.x < x) {
        x = node.x;
      }
      if (node.y < y) {
        y = node.y;
      }
    }
    widgetNode.y = y - widgetNode.height-50 
    widgetNode.x = x
  }

  const connectToFeather = () => {
    waitForTask(new Promise(resolve => {
      figma.showUI(__html__, { visible: false })
      figma.ui.postMessage({ 
        type: 'query_contract', 
        payload: {
          id: contractId,  
          secret: contractSecret, 
        }
      })

      figma.ui.onmessage = async (msg) => {
        let parsed_msg = JSON.parse(msg)
        if (parsed_msg.type === "new_contract") {
          let newCon = parseContract(parsed_msg.payload)
          console.log("Con: ", newCon)
          setContract(newCon)

          for (let i = 0; i < newCon.items.length; i++) {
            let already_exists = false
            figma.currentPage.children.forEach(node => {
              if (node.type === "WIDGET" && node.widgetId === figma.widgetId) {
                if (node.widgetSyncedState["widget_type"] === widgetTypes.ITEM &&
                    node.widgetSyncedState["selected_item"].id === newCon.items[i].id) {
                  
                  already_exists = true;
                  return
                }
              }
            })
            if (already_exists) {
              continue;
            }
            const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
            const clonedWidget = widgetNode.cloneWidget({ 
              widget_type: widgetTypes.ITEM,
              selected_item: newCon.items[i],
            })
            
            // Position the cloned widget beside this widget
            widgetNode.parent!.appendChild(clonedWidget);
            clonedWidget.x = widgetNode.x + widgetNode.width +  50;
            clonedWidget.y = widgetNode.y + i*(300);
          }
          
 
        }
        resolve(msg)
      }
    }))
  }

  if (widgetType === widgetTypes.HUB) {
    return HubUI(
      connectToFeather,
      contractId,
      setContractId,
      contractSecret,
      setContractSecret,
      contract,
    )
  } else if (widgetType === widgetTypes.ITEM) {
    return ItemUI(selectedItem, setItemToSelected)
  }
}

widget.register(Widget)