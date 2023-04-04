import { widget, AutoLayout, Frame, Text, Rectangle, Ellipse, useSyncedState, 
  Input, Image, useEffect, waitForTask, SVG} from "../widget"
import { logo_image } from "../images";


export const OptionsUI = (
  createDocClick: any,
  createConClick: any,
  connectClick: any,
  quillClick: any,
) => {
  const items = [
    {
      title: 'Create a document',
      description: 'Shareable project outlines for your figma files',
      background: '#7993a0',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>`,
      click: createDocClick,
    },
    {
      title: 'Create a contract',
      description: 'Payment methods for your figma work',
      background: '#abbdc5',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>`,
      click: createConClick,
    },
    {
      title: 'Get help from Quill',
      description: `Feather's intergrated GPT assistant`,
      background: '#499866',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>`,
      click: quillClick,
    },
    {
      title: 'Connect to existing',
      description: 'Connect to your files on our website',
      background: '#9ed0b0',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>`,
      click: connectClick,
    }
  ]

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
        direction="vertical"
        horizontalAlignItems="start"
      >
        <Image
          // Pass a data uri directly as the image
          src={logo_image}
          width={200}
          height={54}
        />
        <AutoLayout padding={{top: 5, left: 10, bottom: 5, right: 0}}>
          <Text
            fontSize={20}
            fill={"#9ca3af"}
          >
            Get started with Feather by choosing one of these actions.
          </Text>
        </AutoLayout>
        <AutoLayout padding={{left: 15, right: 15, top: 25, bottom: 25}} width={"fill-parent"}>
          <Rectangle fill={"#9ca3af"} width={"fill-parent"} height={1}/>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout direction="horizontal" spacing={20} padding={{left:20, right:20, bottom: 40,}}>
        {[0,2].map((idx,_) => (
        <AutoLayout direction="vertical" spacing={30}>
          {items.slice(idx,idx+2).map((item, itemIdx) => (
            <AutoLayout key={itemIdx}>
              <AutoLayout>
                <AutoLayout width={64} height={64} cornerRadius={10} padding={16} fill={item.background}>
                  <SVG src={item.svg} width={"fill-parent"} height={"fill-parent"}/>
                </AutoLayout>
                <AutoLayout direction="vertical" spacing={5} padding={{left:10}}>
                  <Text fontSize={20} width={200}>
                    {item.title}
                  </Text>
                  <Text width={200} fill={"#9ca3af"}>{item.description}</Text>
                </AutoLayout>
              </AutoLayout>
            </AutoLayout>
          ))}
        </AutoLayout>
        ))}
      </AutoLayout>
    </AutoLayout>
  )
}
