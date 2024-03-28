import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import Heading02 from "@/styles/components/Heading";
import BlogArea from "@/components/blogParts/BlogArea";
import { getBlogList } from "@/lib/client";
import { blogList } from "@/typs";
const inter = Inter({ subsets: ["latin"] });



// MicroCMSでブログ記事を取得するリクエスト関数を呼び出す。コンポーネントを呼び出す親のファイルで以下を記述
export async function getStaticProps() { // GetServerSideProps の定義
  const blogList: any = await getBlogList();

  return {

    props: {
      blogList,
    }
  }
}

export default function Home({ blogList }: blogList) {
  console.log(blogList.contents);
  return (
    <>
      <Head>
        <title>トップページタイトル</title>
        <meta name="description" content="トップページの説明ページの説明文" />
      </Head>
      <Layout>
        <Heading02>記事一覧</Heading02>
        <BlogArea blogList={blogList} />

      </Layout>
    </>
  );
}
