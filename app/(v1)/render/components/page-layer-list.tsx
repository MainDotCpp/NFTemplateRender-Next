'use client'
import { templateStore } from '@/stores/template-store'
import { observer } from 'mobx-react'
import { MenuOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const PageLayerList = () => {
  const layers = templateStore.stage?.getLayers()

  const onDragEnd = (e: any) => {
    console.log(e)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ttt">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-2  flex flex-col gap-1"
          >
            {layers?.map((layer, index) => {
              return (
                <Draggable
                  key={layer.id()}
                  draggableId={`${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        key={index}
                        className={`h-8 p-2 bg-white border border-dashed border-black/30 flex justify-between`}
                      >
                        <span>图层{index + 1}</span>
                        <MenuOutlined />
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default observer(PageLayerList)
