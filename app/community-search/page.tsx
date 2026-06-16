"use client";

import React, { useEffect } from "react";
import { SearchBar } from "antd-mobile";
import { useRouter } from "next/navigation";
import { selectCommunity } from "@/lib/api";
import "./community-search.sass";

export default function CommunitySearchPage() {
  const router = useRouter();
  const [placeSearch, setPlaceSearch] = React.useState<any>(null);

  const initMapPlugin = (AMap: any, map: any) => {
    AMap.plugin(["AMap.PlaceSearch", "AMap.Geolocation"], function () {
      const ps = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        map: map,
        panel: "my-panel",
        autoFitView: true,
      });
      ps.on("selectChanged", async ({ selected }: any) => {
        const {
          data: { name },
        } = selected;
        await selectCommunity(name, "");
        router.push("/product-list");
      });
      setPlaceSearch(ps);

      // Auto-search communities in the current map viewport on load
      map.on("complete", () => {
        ps.searchInBounds("住宅小区", map.getBounds());
      });
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const loadAMap = () => {
        (window as any).AMapLoader.load({
          key: "a6d643b8b186bb92af158974b6503d47",
          version: "2.0",
        })
          .then((AMap: any) => {
            const map = new AMap.Map("map-container", {
              zoom: 15,
              center: [position.coords.longitude, position.coords.latitude],
            });
            initMapPlugin(AMap, map);
          })
          .catch((e: any) => {
            console.error(e);
          });
      };
      loadAMap();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (value: string) => {
    if (placeSearch) {
      placeSearch.search(value);
    }
  };

  return (
    <div className="comminity-search">
      <div className="search-bar">
        <SearchBar
          onSearch={onSearch}
          placeholder="请输入小区/学校/写字楼"
        />
      </div>
      <div id="map-container" style={{ width: "100%", height: "300px" }} />
      <div className="comminuty-list">
        <div id="my-panel" />
      </div>
    </div>
  );
}
