export default function SigninLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col min-h-screen items-center">
            {children}
        </main>
    );
}
