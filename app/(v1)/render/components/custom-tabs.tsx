import { useState } from 'react'

type CustomTabsProps = {
  items: { key: string; label: string }[]
  activeKey?: string
  onChange?: (key: string) => void
}
const CustomTabs = (props: CustomTabsProps) => {
  const [activeKey, setActiveKey] = useState(
    props.activeKey || props.items[0].key
  )
  return (
    <div className="h-full w-20 flex flex-col gap-2  bg-gray-500">
      {props.items.map((item) => {
        return (
          <div
            key={item.key}
            className={`flex flex-col h-20 gap-0.5  py-2  items-center justify-center cursor-pointer group  ${
              activeKey === item.key ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onClick={() => {
              setActiveKey(item.key)
              props.onChange?.(item.key)
            }}
          >
            <div
              className={`w-20 h-20 bg-[url('https://fakeimg.pl/64x64')] bg-contain bg-no-repeat bg-center overflow-hidden`}
            ></div>
            <span className={` text-md font-bold text-white/80`}>
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default CustomTabs
