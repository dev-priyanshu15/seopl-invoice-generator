import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Switch, FormControlLabel, Box, Typography } from '@mui/material';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types/Invoice';

const App: React.FC = () => {
 const [darkMode, setDarkMode] = useState(false);
 const [invoiceData, setInvoiceData] = useState<InvoiceData>({
   invoiceNumber: 'INV-001', clientName: '', clientEmail: '', clientAddress: '',
   items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
   subtotal: 0, discount: 0, tax: 0, total: 0
 });

 const theme = createTheme({
   palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#1976d2' } },
   components: { MuiButton: { styleOverrides: { root: { transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' } } } } }
 });

 return (
   <ThemeProvider theme={theme}>
     <CssBaseline />
     <Container maxWidth="xl" sx={{ py: 3 }}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
         <Typography variant="h1" sx={{ background: 'linear-gradient(45deg, #1976d2, #42a5f5)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem', fontWeight: 700 }}>
           Invoice Generator
         </Typography>
         <FormControlLabel control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />} label={darkMode ? 'Dark' : 'Light'} />
       </Box>
       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
         <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
         <InvoicePreview invoiceData={invoiceData} />
       </Box>
     </Container>
   </ThemeProvider>
 );
};

export default App;
