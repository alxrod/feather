import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, useSyncedMap,
  Input, Image, useEffect, waitForTask, useWidgetId } from "./widget"
import {widgetTypes, UserNub, DeadlineNub, ItemNub, ContractNub, ComponentSelection} from "./types"

export const adjustItems = (newCon: any, widgetId: any) => {
  figma.currentPage.children.forEach(node => {
    if (node.type === "WIDGET" && node.widgetId === figma.widgetId) {
      let in_new_items = false
      for (let i = 0; i < newCon.items.length; i++) {
        if (node.widgetSyncedState["widget_type"] === widgetTypes.ITEM &&
            node.widgetSyncedState["selected_item"].id === newCon.items[i].id) {
          in_new_items = true
          break
        }
      }
      if (!in_new_items && node.widgetSyncedState["widget_type"] === widgetTypes.ITEM) {
        node.remove()
      }
    }
  })
  for (let i = 0; i < newCon.items.length; i++) {
    let already_exists = false
    figma.currentPage.children.forEach(node => {
      if (node.type === "WIDGET" && node.widgetId === figma.widgetId) {
        if (node.widgetSyncedState["widget_type"] === widgetTypes.ITEM &&
            node.widgetSyncedState["selected_item"].id === newCon.items[i].id) {
              
          node.setWidgetSyncedState({
            selected_item: newCon.items[i],
            widget_type: widgetTypes.ITEM,
            contractId: newCon.id,
            contract: newCon,
          })
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