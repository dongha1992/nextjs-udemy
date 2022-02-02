import React from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetail = (product) => {
  return <div>{product.title}</div>;
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const { data } = JSON.parse(jsonData);
  return data;
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.find((product) => product.id === Number(productId));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: product,
  };
}

export async function getStaticPaths(context) {
  const data = await getData();

  const ids = data.map((p) => p.id.toString());

  const pathsWithPrams = ids.map((id) => {
    return {
      params: { pid: id },
    };
  });

  return {
    paths: pathsWithPrams,
    fallback: true,
  };
}

export default ProductDetail;
