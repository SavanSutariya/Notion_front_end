import Navbar from "./Navbar";
function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
export default UserLayout;
