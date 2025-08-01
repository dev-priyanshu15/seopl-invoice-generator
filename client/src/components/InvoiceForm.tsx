import React, { useState } from 'react';
import { Paper, TextField, Button, Box, IconButton, Typography, Alert } from '@mui/material';
import { Add, Delete, Download, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { InvoiceData, InvoiceItem } from '../types/Invoice';
import axios from 'axios';

interface Props { invoiceData: InvoiceData; setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>; }

const InvoiceForm: React.FC<Props> = ({ invoiceData, setInvoiceData }) => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const updateField = (field: keyof InvoiceData, value: any) => setInvoiceData(prev => ({ ...prev, [field]: value }));

 const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
   const newItems = [...invoiceData.items];
   newItems[index] = { ...newItems[index], [field]: value };
   if (field === 'quantity' || field === 'rate') newItems[index].amount = newItems[index].quantity * newItems[index].rate;
   updateField('items', newItems);
   calculateTotals(newItems);
 };

 const calculateTotals = (items: InvoiceItem[]) => {
   const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
   const discountAmount = (subtotal * invoiceData.discount) / 100;
   const taxAmount = ((subtotal - discountAmount) * invoiceData.tax) / 100;
   const total = subtotal - discountAmount + taxAmount;
   setInvoiceData(prev => ({ ...prev, subtotal, total }));
 };

 const addItem = () => updateField('items', [...invoiceData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
 const removeItem = (index: number) => { if (invoiceData.items.length > 1) { const newItems = invoiceData.items.filter((_, i) => i !== index); updateField('items', newItems); calculateTotals(newItems); } };

 const downloadPDF = async () => {
   setLoading(true); setError(null);
   try {
     const response = await axios.post(`${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'}/api/invoices/generate-pdf`, { invoiceData }, { responseType: 'blob' });
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement('a'); link.href = url; link.download = `invoice-${invoiceData.invoiceNumber}.pdf`; link.click();
   } catch (error: any) { setError('Failed to generate PDF'); } finally { setLoading(false); }
 };

 return (
   <Paper sx={{ p: 3 }}>
     <Typography variant="h5" gutterBottom>Invoice Details</Typography>
     {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
     <TextField fullWidth label="Invoice Number" value={invoiceData.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)} sx={{ mb: 2 }} />
     <TextField fullWidth label="Client Name" value={invoiceData.clientName} onChange={(e) => updateField('clientName', e.target.value)} sx={{ mb: 2 }} />
     <TextField fullWidth label="Client Email" value={invoiceData.clientEmail} onChange={(e) => updateField('clientEmail', e.target.value)} sx={{ mb: 2 }} />
     <TextField fullWidth multiline rows={3} label="Client Address" value={invoiceData.clientAddress} onChange={(e) => updateField('clientAddress', e.target.value)} sx={{ mb: 3 }} />
     
     <Typography variant="h6" gutterBottom>Line Items</Typography>
     {invoiceData.items.map((item, index) => (
       <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
         <TextField fullWidth label="Description" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} />
         <TextField type="number" label="Qty" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} sx={{ width: 80 }} />
         <TextField type="number" label="Rate" value={item.rate} onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)} sx={{ width: 100 }} />
         <Typography sx={{ width: 80, alignSelf: 'center' }}>${item.amount.toFixed(2)}</Typography>
         <IconButton onClick={() => removeItem(index)} color="error" disabled={invoiceData.items.length === 1}><Delete /></IconButton>
       </Box>
     ))}
     
     <Button startIcon={<Add />} onClick={addItem} sx={{ mb: 3 }}>Add Item</Button>
     <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
       <TextField type="number" label="Discount %" value={invoiceData.discount} onChange={(e) => { updateField('discount', parseFloat(e.target.value) || 0); calculateTotals(invoiceData.items); }} />
       <TextField type="number" label="Tax %" value={invoiceData.tax} onChange={(e) => { updateField('tax', parseFloat(e.target.value) || 0); calculateTotals(invoiceData.items); }} />
     </Box>
     <Button variant="contained" startIcon={<Download />} onClick={downloadPDF} fullWidth disabled={loading}>
       {loading ? 'Generating...' : 'Download PDF'}
     </Button>
   </Paper>
 );
};

export default InvoiceForm;
