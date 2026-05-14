import type { Metadata } from "next";
import "./globals.sass";

export const metadata: Metadata = {
  title: "Switcher - 二手交易平台",
  description: "二手电子产品交易平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script src="https://webapi.amap.com/loader.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window._AMapSecurityConfig = { securityJsCode: 'd7b2099d7dfda25349c7e94fb8785655' };`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
