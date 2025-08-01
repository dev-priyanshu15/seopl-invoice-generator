const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/generate-pdf', async (req, res) => {
 try {
   const { invoiceData } = req.body;
   const browser = await puppeteer.launch({ headless: 'new', args: process.env.NODE_ENV === 'production' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [] });
   const page = await browser.newPage();
   
   const html = `<!DOCTYPE html><html><head><style>body{font-family:Arial;margin:20px;color:#333}.header{text-align:center;margin-bottom:40px;border-bottom:3px solid #1976d2;padding-bottom:20px}.header h1{color:#1976d2;font-size:48px;margin:0}.client-info{margin-bottom:30px;background:#f8f9fa;padding:20px;border-radius:8px;border-left:4px solid #1976d2}table{width:100%;border-collapse:collapse;margin-bottom:30px}th{background:#1976d2;color:white;padding:15px 8px}td{border:1px solid #e0e0e0;padding:12px 8px}tr:nth-child(even){background:#f8f9fa}.totals-section{float:right;width:300px}.total-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e0e0e0}.total-row.final{font-weight:bold;background:#1976d2;color:white;padding:15px;margin-top:10px}</style></head><body><div class="header"><h1>INVOICE</h1><p>Invoice #: ${invoiceData.invoiceNumber}</p></div><div class="client-info"><h3>Bill To:</h3><p><strong>${invoiceData.clientName}</strong><br>${invoiceData.clientEmail}<br>${invoiceData.clientAddress}</p></div><table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${invoiceData.items.map(item => `<tr><td>${item.description}</td><td>${item.quantity}</td><td>$${item.rate.toFixed(2)}</td><td>$${item.amount.toFixed(2)}</td></tr>`).join('')}</tbody></table><div class="totals-section"><div class="total-row"><span>Subtotal:</span><span>$${invoiceData.subtotal.toFixed(2)}</span></div><div class="total-row"><span>Discount:</span><span>-$${((invoiceData.subtotal * invoiceData.discount) / 100).toFixed(2)}</span></div><div class="total-row"><span>Tax:</span><span>$${(((invoiceData.subtotal - (invoiceData.subtotal * invoiceData.discount) / 100) * invoiceData.tax) / 100).toFixed(2)}</span></div><div class="total-row final"><span>TOTAL:</span><span>$${invoiceData.total.toFixed(2)}</span></div></div></body></html>`;
   
   await page.setContent(html);
   const pdf = await page.pdf({ format: 'A4', printBackground: true });
   await browser.close();
   
   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoiceData.invoiceNumber}.pdf`);
   res.send(pdf);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
});

module.exports = router;
