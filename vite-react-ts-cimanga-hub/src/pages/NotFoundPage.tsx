import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-[80vh] w-full flex flex-col gap-4 items-center justify-center text-muted-foreground">
      <h2 className="italic text-red-700">404 - Not Found</h2>
      <p>Trang đang trong quá trình phát triển. Thông cảm nha bro!</p>
      <Link to={`/`} className="underline hover:text-blue-500">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
