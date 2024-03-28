import { createClient, MicroCMSQueries } from 'microcms-js-sdk';  //ES6

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
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