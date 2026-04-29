export type Invoice = {
  id: string
  status: string
  method: string
  amount: number
}

export const INVOICES: Invoice[] = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250.00 },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: 150.00 },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350.00 },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: 450.00 },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: 550.00 },
  { id: 'INV006', status: 'Pending', method: 'Bank Transfer', amount: 200.00 },
  { id: 'INV007', status: 'Unpaid', method: 'Credit Card', amount: 300.00 },
]
