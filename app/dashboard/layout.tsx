import PageHeader from "@/components/page-header";

function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    <PageHeader className="mt-8"/>
    <main>{children}</main>
    <footer>Footer</footer>
    </>
  )
}

export default Layout