import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { SearchBar } from "antd-mobile";

import "./community-search.sass";

const CommunitySearch: React.FC = () => {
  const history = createBrowserHistory();
  const [placeSearch, setPlaceSearch] = React.useState<any>(null);

  const initMapPlugin = (AMap: any, map: any) => {
    AMap.plugin(["AMap.PlaceSearch", "AMap.Geolocation"], function () {
      const placeSearch = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        city: "广州",
        map: map,
        panel: "my-panel",
        autoFitView: true,
      });
      placeSearch.on("selectChanged", ({ selected }: any) => {
        const { name } = selected;
        console.log(name);
        history.push("/product-list");
      });
      setPlaceSearch(placeSearch);
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
              zoom: 10,
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
  }, []);

  return (
    <div className="app">
      <header>搜索社区</header>
      <div className="comminity-search body">
        <SearchBar
          className="search-bar"
          placeholder="社区名称"
          onSearch={(value) => placeSearch.search(value)}
          style={{ marginBottom: "10px" }}
        />
        <div
          id="map-container"
          style={{ width: "100%", height: "500px" }}
        ></div>
        <div className="comminuty-list" id="my-panel"></div>
      </div>
    </div>
  );
};

export default CommunitySearch;
