import { logo_image  } from "./images"
import {widgetTypes, UserNub, DeadlineNub, ItemNub, ContractNub, ComponentSelection} from "./types"
import parseContract from "./parse_contract"
import { adjustItems } from "./adjust_items"
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

  const sendCredentials = async (sess_id: string) => {
    const username = await figma.clientStorage.getAsync('username')
    const password = await figma.clientStorage.getAsync('password')

    
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
  }
  const onConnect = async () => {
    await new Promise((resolve) => {
      figma.showUI(__uiFiles__.main, {width: 500, height: 500, title: "Connect to Your Contract"})
      figma.ui.postMessage({ type: 'set_display_mode', payload: "CONTRACTS" })
      
      const sess_id = figma.currentUser?.sessionId ? figma.currentUser?.sessionId.toString() : ""
      sendCredentials(sess_id)
      
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
          setContractId(msg.payload.id ? msg.payload.id : "")
          setContractSecret(msg.payload.invitePassword ? msg.payload.invitePassword : "")
          
          figma.getNodeById(widgetId)?.setPluginData('contract_id', msg.payload.id)
          figma.getNodeById(widgetId)?.setPluginData('contract_secret', msg.payload.invitePassword)

          adjustItems(newCon, widgetId)
          figma.closePlugin()
        }
      })
    })
  }

  const updateContractInfo = async () => {
    const contract_id = figma.getNodeById(widgetId)?.getPluginData('contract_id')
    const contract_secret = figma.getNodeById(widgetId)?.getPluginData('contract_secret')
    await new Promise((resolve) => {

      figma.showUI(__uiFiles__.main, {visible: false})
      figma.ui.postMessage({ type: 'set_display_mode', payload: "BACKGROUND_CONTRACT_QUERY" })
      figma.ui.postMessage({ type: 'pass_con_creds', payload: {
        id: contract_id ? contract_id : "", 
        secret: contract_secret ? contract_secret : ""
      }})
      
      figma.ui.on('message', async (msg) => {
        if (msg.type === "updated_contract") {
          let newCon = parseContract(msg.payload) 
          setContract(newCon)
          adjustItems(newCon, widgetId)
          figma.closePlugin()
          resolve(msg)
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

    await new Promise(resolve => {
      // const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
      // let x = Infinity;
      // let y = Infinity;

      let componentOptions: ComponentSelection[] = []
      // for (const node of figma.currentPage.selection) {
      //   nodeIds.push(node.id)
      //   if (node.x < x) {
      //     x = node.x;
      //   }
      //   if (node.y < y) {
      //     y = node.y;
      //   }
      // }
      // if (figma.currentPage.selection.length > 0) {
      //   widgetNode.y = y - widgetNode.height-50 
      //   widgetNode.x = x
      // }

      figma.currentPage.children.forEach(node => {
        if (node.type === "COMPONENT") {
          componentOptions.push({
            id: node.id,
            name: node.name,
          })
        }
      })

      figma.showUI(__uiFiles__.main, {width: 500, height: 350, title: "Set Item Content"})
      figma.ui.postMessage({ type: 'set_display_mode', payload: "ITEM_NODES" })
      
      const sess_id = figma.currentUser?.sessionId ? figma.currentUser?.sessionId.toString() : ""
      sendCredentials(sess_id)

      if (selectedItem?.id) {
        figma.ui.postMessage({ 
          type: 'set_item_options', 
          payload: {
            item_id: selectedItem.id,
            contract_id: contract.id,
            component_options: componentOptions,
          }
        })
      }

      figma.ui.onmessage = async (msg) => {
        if (msg.type === "close") {
          figma.closePlugin()
          resolve(msg)
        }
      }
    })
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
      (contractId !== ""),
      updateContractInfo,
    )
  } else if (widgetType === widgetTypes.ITEM) {
    return ItemUI(selectedItem, setItemToSelected)
  }
}

widget.register(Widget)