import { useRouter } from 'next/router'; // useRouterを追加
import Item from './Item';
import { blogList } from "@/typs";


function BlogArea({ blogList }: blogList) {
  const router = useRouter()
  return (
    <ul className="blogAreaInner">
      {blogList.contents.length === 0 && <p>記事が見つかりませんでした。</p>}
      {
        // トップのみ記事を6コまで表示
        router.pathname === '/' ? (
          blogList.contents.slice(0, 6).map((blog: any) => {
            return (
              <Item blog={blog} key={blog.id} />
            )
          })
        ) : router.pathname === '/allposts' ? (
          // 「記事一覧」ページは全記事表示
          blogList.contents.map((blog: any) => {
            return (
              <Item blog={blog} key={blog.id} />
            )
          })
        ) : <p>記事が見つかりませんでした。</p>
      }
    </ul>
  )
}




export default BlogArea