export interface InvoiceItem {
 description: string;
 quantity: number;
 rate: number;
 amount: number;
}

export interface InvoiceData {
 invoiceNumber: string;
 clientName: string;
 clientEmail: string;
 clientAddress: string;
 items: InvoiceItem[];
 subtotal: number;
 discount: number;
 tax: number;
 total: number;
}
