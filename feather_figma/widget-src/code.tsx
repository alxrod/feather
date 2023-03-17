import { logo_image  } from "./images"
import {widgetTypes, UserNub, DeadlineNub, ItemNub, ContractNub} from "./types"
import parseContract from "./parse_contract"
import { dateToString } from "./helpers"

import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, useSyncedMap,
  Input, Image, useEffect, waitForTask, useWidgetId } from "./widget"

import { HubUI } from "./hub_ui"
import { ItemUI } from "./item_ui"

type Token = {
  value: string,
  user_id: string,
  timeout: Date,
}
function Widget() {

  const [widgetType, setWidgetType] = useSyncedState("widget_type", widgetTypes.HUB)
  const tokenMap = useSyncedMap<Token>("user_tokens")

  const widgetId = useWidgetId()

  // =========================Hub State:=========================
  const [contractId, setContractId] = useSyncedState("contract_id", "")
  const [contractSecret, setContractSecret] = useSyncedState("contract_secret", "")

  const [contract, setContract] = useSyncedState("contract", ({
    title: "Contract Title",
    summary: "Contract Summary",
    price: 0,
    deadlines: [],
    items: [],
  } as ContractNub))


  const onConnect = async () => {
     
    const username = await figma.clientStorage.getAsync('username')
    const password = await figma.clientStorage.getAsync('password')

    await new Promise((resolve) => {
      figma.showUI(__uiFiles__.main, {width: 500, height: 500, title: "Connect to Your Contract"})
      const sess_id = figma.currentUser?.sessionId ? figma.currentUser?.sessionId.toString() : ""
      let existing_token = tokenMap.get(sess_id);
      if (existing_token === undefined) {
        existing_token = {value: "", user_id: "", timeout: new Date()}
      }
      figma.ui.postMessage({ 
        type: 'pass_credentials', 
        payload: {
          username: username,  
          password: password, 
          token: existing_token.value,
          timeout: existing_token.timeout,
          user_id: existing_token.user_id,
        }
      })
      figma.ui.on('message', async (msg) => {
        if (msg.type === "login_success") {

          await figma.clientStorage.setAsync('username', msg.payload.username)
          await figma.clientStorage.setAsync('password', msg.payload.password)
          await figma.clientStorage.setAsync('user_id', msg.payload.user_id)

          if (sess_id) {
            tokenMap.set(sess_id.toString(), {
              value: msg.payload.token,
              timeout: msg.payload.timemout,
              user_id: msg.payload.user_id
            })
          }
        } else if (msg.type === "new_contract") {
          let newCon = parseContract(msg.payload)
          setContract(newCon)
          setContractId(msg.payload.id)
          setContractSecret(msg.payload.invitePassword)
          
          await figma.clientStorage.setAsync('contract_id', msg.payload.id)
          await figma.clientStorage.setAsync('contract_secret', msg.payload.invitePassword)

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
          figma.closePlugin()
        }
      })
    })
  }
  // =============================================================


  // =========================Item State:=========================
  const [selectedItem, setSelectedItem] = useSyncedState("selected_item", {
    name: "Item",
    body: "Body",
    id: "",
  })

  const setItemToSelected = async () => {
    const id = await figma.clientStorage.getAsync('contract_id')
    const secret = await figma.clientStorage.getAsync('contract_secret')
    const user_id = await figma.clientStorage.getAsync('user_id')

    waitForTask(new Promise(resolve => {
      const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
      let x = Infinity;
      let y = Infinity;

      let nodeIds: string[] = []
      for (const node of figma.currentPage.selection) {
        nodeIds.push(node.id)
        if (node.x < x) {
          x = node.x;
        }
        if (node.y < y) {
          y = node.y;
        }
      }
      if (figma.currentPage.selection.length > 0) {
        widgetNode.y = y - widgetNode.height-50 
        widgetNode.x = x
      }
      


      figma.showUI(__uiFiles__.background, { visible: false })
      if (selectedItem?.id) {
        figma.ui.postMessage({ 
          type: 'set_item_nodes', 
          payload: {
            contract_id: id,  
            contract_secret: secret,
            user_id: user_id,
            item_id: selectedItem.id,
            node_ids: nodeIds,
          }
        })
      }

      figma.ui.onmessage = async (msg) => {
        figma.closePlugin()
        resolve(msg)
      }
    }))
  }
  // =============================================================

  if (widgetType === widgetTypes.HUB) {
    return HubUI(
      onConnect,
      contractId,
      setContractId,
      contractSecret,
      setContractSecret,
      contract,
      (contractId !== "")
    )
  } else if (widgetType === widgetTypes.ITEM) {
    return ItemUI(selectedItem, setItemToSelected)
  }
}

widget.register(Widget)