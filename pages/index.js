import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Link href={`/${item.id}`}>
              <a>{item.id}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (data.length === 0) {
    return { notFound: true };
  }

  return {
    props: data,
    revalidate: 10,
  };
}
