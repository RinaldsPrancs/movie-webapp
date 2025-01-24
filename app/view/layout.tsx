import TopNav from '@/app/ui/view/topnav';


export default function LayoutView({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-row h-screen max-h-screen">
      <div className="h-[8%]">
        <TopNav />
      </div>
      <div className="flex-grow h-[92%]">{children}</div>
    </div>
  );
}