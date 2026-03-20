import Profile from "./_client/Profile";

export function generateStaticParams() {
  // 生成静态页面的 ID 列表
  const ids = Array.from({ length: 10 }, (_, i) => String(i + 1));
  return ids.map((id) => ({ id }));
}

export default function ProfilePage() {
  return <Profile />;
}
