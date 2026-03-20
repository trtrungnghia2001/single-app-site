import { memo } from "react";
import { Link } from "react-router-dom";

const suppliers = {
  web: [
    {
      path: `https://www.rophim.li/phimhay`,
      title: `RoPhim`,
    },
    {
      path: `https://www.rophim.li/phimhay`,
      title: `Nettruyen`,
    },
  ],
  api: [
    {
      path: `https://kkphim.com/tai-lieu-api`,
      title: `kkphim`,
    },
    {
      path: `https://docs.otruyenapi.com`,
      title: `otruyenapi`,
    },
  ],
};
const links = [
  { name: "Giới thiệu", path: "/about" },
  { name: "Hỏi-Đáp", path: "/faq" },
  { name: "Chính sách bảo mật", path: "/privacy" },
  { name: "Điều khoản sử dụng", path: "/terms" },
  { name: "Liên hệ", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-12 bg-footer-bg space-y-4">
      <ul className="flex flex-wrap gap-4">
        {links.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="text-muted-foreground space-y-2">
        <p>CimangaHub – Trang tổng hợp film, manga, anime, databook.</p>
        <p>
          Xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng
          tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ
          từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật
          Bản, Âu Mỹ… đa dạng thể loại.
        </p>
        <p>
          Khám phá thế giới của manga và anime qua từng trang truyện. Tìm hiểu
          về tiểu sử nhân vật cũng như hành trình của họ.
        </p>
        <p className="space-x-2">
          <span>Web site lấy cảm hứng từ</span>
          {Object.values(suppliers)
            .flat()
            .map((item) => (
              <Link key={item.title} to={item.path} className="link">
                {item.title}
              </Link>
            ))}
        </p>
        <p>© 2026 Komorebi</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
