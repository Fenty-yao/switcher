"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, SearchBar, DotLoading } from "antd-mobile";
import { UpOutline } from "antd-mobile-icons";
import Shell from "@/components/Shell";
import { getProducts, type ProductItem } from "@/lib/api";
import "./product-list.sass";

const PAGE_SIZE = 6;

export default function ProductListPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load initial page
  useEffect(() => {
    getProducts(1, PAGE_SIZE).then(({ data, hasMore }) => {
      setProductList(data);
      setHasMore(hasMore);
      setPage(1);
    });
  }, []);

  // Load more when sentinel becomes visible
  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true);
          const nextPage = page + 1;
          getProducts(nextPage, PAGE_SIZE).then(({ data, hasMore: more }) => {
            setProductList((prev) => [...prev, ...data]);
            setHasMore(more);
            setPage(nextPage);
            setLoading(false);
          });
        }
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Shell title="市场">
      <div className="search-bar">
        <SearchBar placeholder="请输入内容" />
        <div className="filter-opts">
          <li>最新发布</li>
          <li>距离优先</li>
        </div>
      </div>
      <div ref={containerRef} className="product-list">
        {productList.map((item, index) => (
          <Link key={index} href="/product-detail" className="product-link">
            <Card>
              <img className="image" src={item.image} alt={item.title} />
              <div className="name">{item.title}</div>
              <div className="price">{item.price}</div>
              <div className="author">{item.author}</div>
            </Card>
          </Link>
        ))}
        {/* Sentinel element for IntersectionObserver */}
        <div ref={sentinelRef} className="sentinel">
          {loading && <DotLoading />}
        </div>
      </div>
      <UpOutline
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "16px",
          fontSize: "32px",
          color: "var(--adm-color-primary)",
          cursor: "pointer",
        }}
      />
    </Shell>
  );
}
