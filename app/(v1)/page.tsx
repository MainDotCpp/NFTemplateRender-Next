import prisma from '@/prisma/prisma'
import Link from 'next/link'

const Page = async () => {
  const templates = await prisma.template.findMany()
  return (
    <div className="p-2">
      <div className="text-2xl text-black/80">模板</div>
      <div className="templates grid gap-2 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {templates.map((tmp) => {
          return (
            <Link key={tmp.id} href={`/render/${tmp.id}`}>
              <div className="template">
                <div
                  className={`template-cover w-full h-[200px] bg-center bg-cover`}
                  style={{
                    backgroundImage: `url(${tmp.cover})`,
                  }}
                ></div>
                <div className="template-name text-black/30">{tmp.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Page
