import TopNav from '@/app/ui/view/topnav';


export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-rows h-screen">
      <div className="">
        <TopNav />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}