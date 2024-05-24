import Link from "next/link";
import { homTabs } from "./utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      <div className="relative z-[-1] text-5xl font-bold mt-[40px] flex ">
        乐趣圈
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {homTabs.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {item.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
