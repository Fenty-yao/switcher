import React, { useCallback, useRef } from "react";
import { Footer } from "../framework";
import { Button, Card, NavBar, SearchBar } from "antd-mobile";
import { UpOutline } from "antd-mobile-icons";
import waterfall from "../utils/waterfall";

import "./product-list.sass";

export const productList = [
  {
    title: "iPhone 12",
    description: "九成新，64GB，黑色，带原装充电器。",
    createdAt: "2023-10-01 14:23",
    author: "王建国",
    price: "¥4500",
    image: "http://localhost:8080/imgs/iPhone12.jpeg",
  },
  {
    title: "MacBook Pro 2020",
    description: "M1芯片，13寸，256GB存储，轻微划痕。",
    createdAt: "2023-09-28 09:45",
    author: "李明",
    price: "¥8500",
    image: "http://localhost:8080/imgs/MacBookPro2020.jpeg",
  },
  {
    title: "Kindle Paperwhite",
    description: "无广告版，8GB存储，屏幕完好。",
    createdAt: "2023-09-25 18:12",
    author: "张晓华",
    price: "¥600",
    image: "http://localhost:8080/imgs/KindlePaperwhite.jpeg",
  },
  {
    title: "小米空气净化器",
    description: "适合卧室使用，滤芯刚换。",
    createdAt: "2023-09-20 11:30",
    author: "赵丽",
    price: "¥800",
    image: "http://localhost:8080/imgs/小米空气净化器.jpeg",
  },
  {
    title: "戴森吸尘器",
    description: "V8型号，电池续航良好。",
    createdAt: "2023-09-18 16:50",
    author: "孙强",
    price: "¥2500",
    image: "http://localhost:8080/imgs/戴森吸尘器.jpeg",
  },
  {
    title: "华为MatePad",
    description: "10.4寸屏幕，支持手写笔，适合学习。",
    createdAt: "2023-09-15 08:20",
    author: "周芳",
    price: "¥1800",
    image: "http://localhost:8080/imgs/华为MatePad.jpeg",
  },
  {
    title: "罗技机械键盘",
    description: "青轴，背光可调，按键无损坏。",
    createdAt: "2023-09-12 14:05",
    author: "吴涛",
    price: "¥400",
    image: "http://localhost:8080/imgs/罗技机械键盘.jpeg",
  },
  {
    title: "索尼耳机 WH-1000XM4",
    description: "降噪效果极佳，耳罩稍有磨损。",
    createdAt: "2023-09-10 10:15",
    author: "郑伟",
    price: "¥1500",
    image: "http://localhost:8080/imgs/索尼耳机 WH-1000XM4.jpeg",
  },
  {
    title: "佳能单反相机",
    description: "EOS 80D，配18-135mm镜头。",
    createdAt: "2023-09-08 19:40",
    author: "钱坤",
    price: "¥5000",
    image: "http://localhost:8080/imgs/佳能单反相机.jpeg",
  },
  {
    title: "任天堂Switch",
    description: "带两个手柄，含多款游戏。",
    createdAt: "2023-09-05 13:25",
    author: "孙丽",
    price: "¥2200",
    image: "http://localhost:8080/imgs/任天堂Switch.jpeg",
  },
  {
    title: "飞利浦电动牙刷",
    description: "HX6800系列，带两个刷头。",
    createdAt: "2023-09-03 07:55",
    author: "李娜",
    price: "¥300",
    image: "http://localhost:8080/imgs/飞利浦电动牙刷.jpeg",
  },
  {
    title: "小米扫地机器人",
    description: "功能正常，外观有轻微划痕。",
    createdAt: "2023-09-01 15:10",
    author: "张强",
    price: "¥1200",
    image: "http://localhost:8080/imgs/小米扫地机器人.jpeg",
  },
  {
    title: "三星显示器",
    description: "27寸，2K分辨率，适合办公。",
    createdAt: "2023-08-30 09:35",
    author: "王芳",
    price: "¥1500",
    image: "http://localhost:8080/imgs/三星显示器.jpeg",
  },
  {
    title: "GoPro运动相机",
    description: "Hero 9，配件齐全，防水性能良好。",
    createdAt: "2023-08-28 17:45",
    author: "赵坤",
    price: "¥2800",
    image: "http://localhost:8080/imgs/GoPro运动相机.jpeg",
  },
  {
    title: "Apple Watch Series 6",
    description: "44mm，GPS版，电池健康85%。",
    createdAt: "2023-08-25 12:00",
    author: "周伟",
    price: "¥2000",
    image: "http://localhost:8080/imgs/Apple Watch Series 6.jpeg",
  },
  {
    title: "索尼PS5",
    description: "带两个手柄，含热门游戏光盘。",
    createdAt: "2023-08-22 20:15",
    author: "吴丽",
    price: "¥4000",
    image: "http://localhost:8080/imgs/索尼PS5.jpeg",
  },
  {
    title: "小米电饭煲",
    description: "智能版，适合三口之家。",
    createdAt: "2023-08-20 08:45",
    author: "郑涛",
    price: "¥400",
    image: "http://localhost:8080/imgs/小米电饭煲.jpeg",
  },
  {
    title: "戴尔笔记本电脑",
    description: "XPS 13，i7处理器，16GB内存。",
    createdAt: "2023-08-18 14:30",
    author: "钱芳",
    price: "¥9000",
    image: "http://localhost:8080/imgs/戴尔笔记本电脑.jpeg",
  },
  {
    title: "佳能打印机",
    description: "喷墨式，支持无线打印。",
    createdAt: "2023-08-15 10:50",
    author: "孙伟",
    price: "¥800",
    image: "http://localhost:8080/imgs/佳能打印机.jpeg",
  },
];

const ProductList = () => {
  const listRef = useRef(null);

  const renderLayout = useCallback(() => {
    waterfall(listRef.current);
  }, [listRef]);

  const [sortedList, setSortedList] = React.useState(productList);
  const [sortKey, setSortKey] = React.useState<"createdAt" | "price" | null>(
    null
  );

  const handleSort = (key: "createdAt" | "price") => {
    setSortKey(key);
    const sorted = [...productList].sort((a, b) => {
      if (key === "createdAt") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (key === "price") {
        return (
          parseFloat(b.price.replace("¥", "")) -
          parseFloat(a.price.replace("¥", ""))
        );
      }
      return 0;
    });
    setSortedList(sorted);
  };

  return (
    <div className="app">
      <NavBar back="切换社区" right="添加社区">
        芳群园
      </NavBar>
      <div className="body">
        <div className="search-bar">
          <SearchBar className="flex" placeholder="商品名称" />
          <div className="filter-opts">
            <div onClick={() => handleSort("createdAt")}>
              时间
              {sortKey === "createdAt" && <UpOutline />}
            </div>
            <div onClick={() => handleSort("price")}>
              价格
              {sortKey === "price" && <UpOutline />}
            </div>
            <div>筛选</div>
          </div>
        </div>

        <div className="product-list" ref={listRef}>
          {sortedList.map((product) => (
            <Card className="product" title={product.title}>
              <img
                onLoad={renderLayout}
                className="image"
                src={product.image}
                alt={product.title}
              />
              {product.description}
              <div>{product.createdAt}</div>
              <div>{product.author}</div>
              <div className="price">{product.price}</div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
