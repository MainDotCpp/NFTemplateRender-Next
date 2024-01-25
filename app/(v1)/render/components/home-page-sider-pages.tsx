// @ts-nocheck
import { Page } from '@prisma/client'
import { templateStore } from '@/stores/template-store'
import { observer } from 'mobx-react'
import Konva from 'konva'
import { message, Upload } from 'antd'
import { upload } from '@/api/oss'
import { useRef } from 'react'
import * as bodySegmentation from '@tensorflow-models/body-segmentation'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/selfie_segmentation'

// 人像分割
const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation
console.log(`[人像分割]`, model)
const segmenterConfig = {
  runtime: 'mediapipe', // or 'tfjs'
  modelType: 'landscape', // or 'landscape'
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
}
let segmenter
bodySegmentation.createSegmenter(model, segmenterConfig).then((seg) => {
  segmenter = seg
})
const HomePageSiderPages = ({ pages }: { pages: Page[] }) => {
  const fillIds = useRef([])
  return (
    <div className="flex flex-col gap-2 p-2 ">
      {pages?.map((page) => {
        return (
          <div
            key={page.id}
            className={`flex border border-solid group  hover:border-black/20 cursor-pointer ${
              templateStore.currentPage?.id == page.id
                ? 'border-blue-500/50 border-2'
                : 'border-black/10'
            }}`}
            onClick={() => {
              templateStore.setCurrentPage(page)
            }}
          >
            <div className="w-28 h-20 overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.cover}
                className="w-full h-full object-cover group-hover:scale-110 transition-all"
                alt="qqtt"
              />
            </div>
            <div className="p-2">
              <div>{page.name}</div>
              <div>
                <Upload
                  onChange={(info) => {
                    if (info.file.status === 'uploading') {
                      let file = info.file.originFileObj
                      upload(file, 'TEMPLATE').then((url) => {
                        templateStore.setBgImage(url)
                      })
                    }
                  }}
                >
                  上传背景图
                </Upload>
              </div>
            </div>
          </div>
        )
      })}
      <input
        type="file"
        multiple={true}
        onChange={async (e) => {
          for (let file of e.target.files || []) {
            const config = templateStore.currentPage!!.config
            for (let key of Object.keys(config)) {
              if (fillIds.current.includes(key)) continue
              const { width: templateWidth, height: templateHeight } =
                config[key]

              let el = templateStore.stage?.findOne(`#${key}`) as Konva.Image
              if (el) {
                let img = new Image()
                img.src = URL.createObjectURL(file)

                img.onload = async () => {
                  console.log(`[人像分割]`, segmenter)
                  segmenter.segmentPeople(img).then((segmentation) => {
                    console.log(`[人像分割]`, segmentation)
                    segmentation[0].mask.toCanvasImageSource().then((mask) => {
                      console.log(`[人像分割]`, mask)
                      const _img = document.createElement(
                        'canvas'
                      ) as HTMLCanvasElement
                      const ctx = _img.getContext('2d')

                      _img.width = templateWidth
                      _img.height = templateHeight
                      ctx?.scale(
                        templateWidth / img.width,
                        templateHeight / img.height
                      )
                      ctx?.drawImage(img, 0, 0)
                      ctx!!.globalCompositeOperation = 'destination-in'
                      ctx?.drawImage(mask, 0, 0)
                      el.image(_img)
                      message.success('人像分割成功')
                    })
                  })
                }

                fillIds.current.push(key)
                break
              }
            }
          }
        }}
      ></input>
      <a
        onClick={() => {
          templateStore.updatePageContent(templateStore.stage!!.toJSON())
        }}
      >
        导出
      </a>
      <a
        onClick={() => {
          const layer = new Konva.Layer()
          const tempImage = new Image()
          tempImage.src = 'https://fakeimg.pl/2000x3000?text=竖版照片'
          let elId = `image-${Date.now()}`

          let el = new Konva.Image({
            id: elId,
            x: 300,
            y: 300,
            scale: { x: 0.5, y: 0.5 },
            image: tempImage,
            draggable: true,
          })

          templateStore.addConfig({
            id: elId,
            type: 'image',
            width: 2000,
            height: 3000,
          })

          layer.add(el)
          let tr1 = new Konva.Transformer({
            node: el,

            enabledAnchors: [
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ],
          })
          layer.add(tr1)
          templateStore.stage?.add(layer)
        }}
      >
        添加图层
      </a>
    </div>
  )
}

export default observer(HomePageSiderPages)
