'use client'

const FormatNumber = props => {
  // Props
  const { number } = props

  function formatBaht(number) {
    // ตรวจสอบประเภทข้อมูล
    if (typeof number !== 'number') {
      return 'Invalid input'
    }

    // กำหนดตัวเลือกการ format เงิน
    const options = {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }

    // แปลงตัวเลขเป็นสกุลเงินบาท
    const formattedBaht = new Intl.NumberFormat('th-TH', options).format(number)

    return formattedBaht
  }

  return <span>{formatBaht(number)}</span>
}

export default FormatNumber
