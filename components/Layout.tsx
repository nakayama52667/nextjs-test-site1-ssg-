import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from "styled-components";
interface TemplateContentType {
  // contentsの型に関する定義
}
interface TemplateListType {
  contents: TemplateContentType[];
  // 他の必要なプロパティに関する定義
}

export const HeaderStyle = styled.header`
padding: 20px 0;

.inner {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    font-size: 22px;

    span {
      display: block;
      margin-left: 20px;
    }
  }

  nav {
    .mainMenu{
      display: flex;
      gap: 30px;
      justify-content: space-between;

      li {
        .current {
          color: red;
        }
      }
    }
  }

  .subMenu {
    position: relative;
  }
  
  .list {
    display: none;
    width: 150%;
    position: absolute;
    background-color: black;
    z-index: 2;
  }
  
  .subMenu:hover>.list {
    display: block;
  }
  
  .list a {
    display: block;
    color: white;
    padding: 10px;
  }
  
  .list a:hover {
    opacity: 0.7;
  }
}
`;

export const FooterStyle = styled.footer`

`;

function Layout({ children }: any) {

  return (
    <>
      <HeaderStyle id="header">
        <div className="inner">
          <Link href="/" className="logo">
            <Image width={35} height={35} src="/img/logo.jpg" alt="" />
            <span>MyBlog</span>
          </Link>
          <nav>
            <ul className="mainMenu">
              <li><Link href="/">トップ</Link></li>
              <li><Link href="/">記事一覧へ</Link></li>
              <li className="subMenu">
                <Link href="/">固定ページ一覧</Link>
              </li>
              <li><Link href="/">お問い合わせ</Link></li>
              <li><Link href="https://myblogtest.microcms.io/apis/blogs" target='_blank'>microCMS</Link></li>
            </ul>
          </nav>
        </div>
      </HeaderStyle>

      {children}

      <FooterStyle>
        <a href="#header" className='ScrollBtn'>
          <div className="icon"></div>
        </a>
        <div className='text-center'>©AllRightReserved</div>
      </FooterStyle>
    </>
  )
}

export default Layout