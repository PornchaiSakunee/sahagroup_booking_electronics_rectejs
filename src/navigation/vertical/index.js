import { FileText, RefreshCcw, Circle } from "react-feather"

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
  // {
  //   id: "addToTrans",
  //   title: "ผู้ดูแลระบบ",
  //   icon: <FileText size={20} />,
  //   navLink: "/addToTrans"
  // }
  
]
