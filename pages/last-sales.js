import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const BASE_URL =
  "https://nextjs-test-api-default-rtdb.firebaseio.com/sales.json";

const LastSales = (props) => {
  const [sales, setSales] = useState(props.sales);

  const fetcher = async (url) => {
    const data = await fetch(url).then((res) => res.json());

    const formatData = [];
    for (const key in data) {
      formatData.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSales(formatData);
  };

  const { data, error } = useSWR(BASE_URL, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data && !sales) return <div>loading...</div>;

  return (
    <div>
      <div>
        {sales.map((item, index) => (
          <div key={index}>{item.username}</div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  const formatData = [];
  for (const key in data) {
    formatData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: formatData },
  };
}

export default LastSales;
