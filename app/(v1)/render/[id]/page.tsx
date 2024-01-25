import HomePageSider from '@/app/(v1)/render/components/home-page-sider'
import prisma from '@/prisma/prisma'
import dynamic from 'next/dynamic'
import HomePageConfigSider from '@/app/(v1)/render/components/home-page-config-sider'

const TemplateRenderEngine = dynamic(
  () => import('@/app/(v1)/render/components/template-render-engine'),
  {
    ssr: false,
  }
)
export default async function Home({ params }: { params: { id: string } }) {
  const template = await prisma.template.findFirst({
    where: {
      id: Number(params.id),
    },
  })
  if (!template) return <div>无模板</div>
  return (
    <div className="h-full grid grid-cols-[350px,1fr,350px] ">
      <HomePageSider templateId={template.id} />
      <div className="bg-black/10 overflow-hidden">
        <TemplateRenderEngine />
      </div>
      <HomePageConfigSider />
    </div>
  )
}
