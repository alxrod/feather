// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// Runs this code if the plugin is run in Figma
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

const populateDocument = (node: any, nodes: any) => {
  let nodeInDoc;
  if (node.type === 'FRAME') {
    nodeInDoc = figma.createFrame();
    nodeInDoc.fills = node.fills;
    nodeInDoc.strokes = node.strokes;
    nodeInDoc.strokeWeight = node.strokeWidth;
    nodeInDoc.strokeAlign = node.strokeAlign;
    nodeInDoc.cornerRadius = node.cornerRadius;
    nodeInDoc.exportSettings = node.exportSettings;
    nodeInDoc.blendMode = node.blendMode;
    nodeInDoc.constraints = node.constraints;
    nodeInDoc.layoutAlign = node.layoutAlign;
    nodeInDoc.opacity = node.opacity;
    nodeInDoc.x = node.absoluteBoundingBox.x;
    nodeInDoc.y = node.absoluteBoundingBox.y;
    nodeInDoc.resize(node.absoluteBoundingBox.width, node.absoluteBoundingBox.height);
    nodeInDoc.clipsContent = node.clipsContent;
    nodeInDoc.layoutMode = node.layoutMode;
    nodeInDoc.primaryAxisAlignItems = node.primaryAxisAlignItems;
    nodeInDoc.counterAxisAlignItems = node.counterAxisAlignItems;
    nodeInDoc.primaryAxisSizingMode = node.primaryAxisSizingMode;
    nodeInDoc.counterAxisSizingMode = node.counterAxisSizingMode;
    nodeInDoc.paddingLeft = node.paddingLeft;
    nodeInDoc.paddingRight = node.paddingRight;
    nodeInDoc.paddingTop = node.paddingTop;
    nodeInDoc.paddingBottom = node.paddingBottom;
    nodeInDoc.itemSpacing = node.itemSpacing;
    nodeInDoc.horizontalPadding = node.horizontalPadding;
    nodeInDoc.verticalPadding = node.verticalPadding;
    nodeInDoc.layoutPositioning = node.layoutPositioning;
    nodeInDoc.itemReverseZIndex = node.itemReverseZIndex;
    nodeInDoc.strokesIncludedInLayout = node.strokesIncludedInLayout;
    nodeInDoc.layoutGrids = node.layoutGrids;
    nodeInDoc.overflowDirection = node.overflowDirection;
    nodeInDoc.effects = node.effects;
    nodeInDoc.isMask = node.isMask;
  } else if (node.type === "RECTANGLE") {
    nodeInDoc = figma.createRectangle()
    nodeInDoc.exportSettings = node.exportSettings;
    nodeInDoc.blendMode = node.blendMode;
    nodeInDoc.layoutAlign = node.layoutAlign;
    nodeInDoc.layoutGrow = node.layoutGrow;
    nodeInDoc.constraints = node.constraints;
    nodeInDoc.opacity = node.opacity;
    nodeInDoc.x = node.absoluteBoundingBox.x;
    nodeInDoc.y = node.absoluteBoundingBox.y;
    nodeInDoc.resize(node.absoluteBoundingBox.width, node.absoluteBoundingBox.height);
    nodeInDoc.effects = node.effects;
    nodeInDoc.isMask = node.isMask;
    nodeInDoc.fills = node.fills;
    nodeInDoc.fillGeometry = node.fillGeometry;
    nodeInDoc.strokes = node.strokes;
    nodeInDoc.strokeWeight = node.strokeWeight;
    nodeInDoc.strokeTopWeight = node.individualStrokeWeights.top;
    nodeInDoc.strokeRightWeight = node.individualStrokeWeights.right;
    nodeInDoc.strokeBottomWeight = node.individualStrokeWeights.bottom;
    nodeInDoc.strokeLeftWeight = node.individualStrokeWeights.left;
    nodeInDoc.strokeCap = node.strokeCap;
    nodeInDoc.strokeJoin = node.strokeJoin;
    nodeInDoc.strokeGeometry = node.strokeGeometry;
    nodeInDoc.strokeAlign = node.strokeAlign;
  }
  nodes.push(nodeInDoc)
  if (node.children) {
    node.children.forEach((child: any) => {
      populateDocument(child, nodes);
    })
  }
}
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-file') {
    console.log(msg.payload)
    let curTopNode = msg.payload.document
    const nodes: SceneNode[] = [];
    populateDocument(curTopNode, nodes)
    // const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
