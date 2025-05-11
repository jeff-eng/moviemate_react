import Header from '../header/Header';
import TabBar from '../tabbar/TabBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <TabBar />
    </>
  );
}
