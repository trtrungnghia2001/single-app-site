import { PriorityType, StatusType, TaskType } from "@/type/task.type";

export const status_options: StatusType[] = ["pending", "progress", "done"];
export const priority_options: PriorityType[] = ["low", "medium", "high"];
export const sort_options = [`title`, `dueDate`, `createdAt`];

export const MOCK_TASKS: TaskType[] = [
  {
    _id: "65f8a1b2c9e4b80012345671",
    title: "Nghiên cứu Angular Signals",
    description: "Thử nghiệm WritableSignal và Effect cho component đếm số.",
    status: "progress",
    priority: "high",
    dueDate: "2026-03-25T17:00:00Z",
    createdAt: "2026-03-19T08:00:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345672",
    title: "Xây dựng giao diện Kanban",
    description: "Sử dụng CSS Grid để chia 3 cột: Pending, Progress, Done.",
    status: "pending",
    priority: "medium",
    dueDate: "2026-03-28T09:30:00Z",
    createdAt: "2026-03-19T09:15:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345673",
    title: "Tích hợp TanStack Query",
    description: "Cài đặt devtools và fetch danh sách Task từ Mock Service.",
    status: "done",
    priority: "low",
    dueDate: "2026-03-20T12:00:00Z",
    createdAt: "2026-03-18T14:20:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345674",
    title: "Fix lỗi Hydration Next.js",
    description:
      "Kiểm tra lỗi không khớp giữa server-side và client-side render.",
    status: "progress",
    priority: "high",
    dueDate: "2026-03-22T15:45:00Z",
    createdAt: "2026-03-19T10:00:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345675",
    title: "Viết Unit Test cho Service",
    description:
      "Sử dụng Jasmine/Karma để test logic xử lý data trong AnimeService.",
    status: "pending",
    priority: "medium",
    dueDate: "2026-04-01T08:00:00Z",
    createdAt: "2026-03-19T11:30:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345676",
    title: "Tối ưu Search RxJS",
    description: "Thêm debounceTime(500) và distinctUntilChanged cho ô search.",
    status: "done",
    priority: "high",
    dueDate: "2026-03-21T18:00:00Z",
    createdAt: "2026-03-17T09:00:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345677",
    title: "Thiết kế trang Chi tiết nhân vật",
    description: "Hiển thị thông tin Pokemon dựa trên ID lấy từ Router.",
    status: "pending",
    priority: "low",
    dueDate: "2026-03-30T10:00:00Z",
    createdAt: "2026-03-19T13:45:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345678",
    title: "Cập nhật Browserslist",
    description: "Chạy npx update-browserslist-db@latest để tối ưu file build.",
    status: "done",
    priority: "medium",
    dueDate: "2026-03-19T23:59:59Z",
    createdAt: "2026-03-19T14:00:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345679",
    title: "Học cách dùng Pipe tùy chỉnh",
    description:
      'Tạo một Pipe để format khoảng thời gian (ví dụ: "2 giờ trước").',
    status: "progress",
    priority: "low",
    dueDate: "2026-03-24T07:00:00Z",
    createdAt: "2026-03-19T15:20:00Z",
  },
  {
    _id: "65f8a1b2c9e4b80012345680",
    title: "Deploy ứng dụng lên Vercel",
    description: "Cấu hình biến môi trường và tối ưu hóa SEO cho dự án.",
    status: "pending",
    priority: "high",
    dueDate: "2026-04-10T17:00:00Z",
    createdAt: "2026-03-19T16:00:00Z",
  },
];
