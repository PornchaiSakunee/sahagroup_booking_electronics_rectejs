import { FileText, RefreshCcw  } from "react-feather"

export default [
  {
    id: "order-history",
    title: "ประวัติการจอง",
    icon: <RefreshCcw size={20} />,
    navLink: "/order-history"
  },
  {
    id: "secondPage",
    title: "ใบจองอุปกรณ์",
    icon: <FileText size={20} />,
    navLink: "/booking"
  }
]
