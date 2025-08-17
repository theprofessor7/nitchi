
import QuickPostEditor from "@/components/posts/editor/QuickPostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <QuickPostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
}
