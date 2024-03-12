import AuthButton from "@/components/AuthButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <div className="flex flex-row h-[100vh] w-[250px] border-r border-r-foreground/10">
        <div className="w-full flex flex-col">
          <div className="w-100 h-16 flex justify-center items-center">
            <span>Logo</span>
          </div>
          <div className="w-full flex flex-1"></div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
          <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
