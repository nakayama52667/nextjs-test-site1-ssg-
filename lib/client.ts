import { createClient, MicroCMSQueries } from 'microcms-js-sdk';  //ES6

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",

  // 以下、microcmsの強制キャッシュクリア
  // customFetch: (input: any, init: any) => {
  //   if (typeof input === 'string') {
  //     const newInput = new URL(input)
  //     const time = new Date()
  //     newInput.searchParams.set('cacheclearparam', `${time.getMinutes()}`)
  //     return fetch(newInput.href, init)
  //   }
  //   return fetch(input, init)
  // },

});


//  CMSで投稿した記事を全て取得する。
export const getBlogList = async () => {
  const blogList = await client.getList({
    endpoint: "blogs", // microcmsで作成したプロジェクトのエンドポイント
  })
  return blogList;
}


//  CMSで投稿した記事詳細を取得する。
export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailList = await client.getListDetail({
    endpoint: "blogs", // microcmsで作成したプロジェクトのエンドポイント
    contentId, // 個別のidを取得する
    queries, // 日付の取得に使用する
  })

  return detailList;
}