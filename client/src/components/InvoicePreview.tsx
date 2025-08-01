import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, Divider } from '@mui/material';
import { InvoiceData } from '../types/Invoice';

const InvoicePreview: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
 const discountAmount = (invoiceData.subtotal * invoiceData.discount) / 100;
 const taxAmount = ((invoiceData.subtotal - discountAmount) * invoiceData.tax) / 100;

 return (
   <Paper sx={{ p: 4, minHeight: '100vh' }}>
     <Box sx={{ textAlign: 'center', mb: 4 }}>
       <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>INVOICE</Typography>
       <Typography variant="h5" color="text.secondary">#{invoiceData.invoiceNumber}</Typography>
     </Box>
     
     <Box sx={{ mb: 4, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
       <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>Bill To:</Typography>
       <Typography variant="h6">{invoiceData.clientName || 'Client Name'}</Typography>
       <Typography>{invoiceData.clientEmail || 'client@email.com'}</Typography>
       <Typography sx={{ whiteSpace: 'pre-line' }}>{invoiceData.clientAddress || 'Client Address'}</Typography>
     </Box>

     <Table sx={{ mb: 3 }}>
       <TableHead>
         <TableRow sx={{ backgroundColor: 'primary.main' }}>
           <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
           <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Qty</TableCell>
           <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Rate</TableCell>
           <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {invoiceData.items.map((item, index) => (
           <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'grey.50' } }}>
             <TableCell>{item.description || 'Item description'}</TableCell>
             <TableCell align="center">{item.quantity}</TableCell>
             <TableCell align="right">${item.rate.toFixed(2)}</TableCell>
             <TableCell align="right">${item.amount.toFixed(2)}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>

     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
       <Box sx={{ width: 300 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
           <Typography>Subtotal:</Typography><Typography>${invoiceData.subtotal.toFixed(2)}</Typography>
         </Box>
         {invoiceData.discount > 0 && (
           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
             <Typography color="error.main">Discount ({invoiceData.discount}%):</Typography>
             <Typography color="error.main">-${discountAmount.toFixed(2)}</Typography>
           </Box>
         )}
         {invoiceData.tax > 0 && (
           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
             <Typography>Tax ({invoiceData.tax}%):</Typography><Typography>${taxAmount.toFixed(2)}</Typography>
           </Box>
         )}
         <Divider sx={{ my: 2 }} />
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total:</Typography>
           <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>${invoiceData.total.toFixed(2)}</Typography>
         </Box>
       </Box>
     </Box>
   </Paper>
 );
};

export default InvoicePreview;
