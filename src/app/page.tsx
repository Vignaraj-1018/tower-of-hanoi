import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col bg-primary">
      
      <div className="flex border-secondary">
        <Link href={'/play'}>
          Play
        </Link>
      </div>
      
    </div>
  );
}
