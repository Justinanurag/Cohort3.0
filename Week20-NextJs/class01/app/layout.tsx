export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>Hello Guys!</div>
        {children}
        <div>Bye!!</div>
      </body>
    </html>
  );
}
