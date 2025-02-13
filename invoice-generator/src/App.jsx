import { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePDF from "./components/InvoicePDF";
import jsPDF from "jspdf";
import "jspdf-autotable";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceReports, setInvoiceReports] = useState([]);

  // Load saved reports from localStorage when the app starts
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("invoiceReports")) || [];
    setInvoiceReports(savedReports);
  }, []);

  // Function to store invoice data in localStorage
  const handleGenerateInvoice = (data) => {
    const updatedReports = [...invoiceReports, data];
    setInvoiceReports(updatedReports);
    localStorage.setItem("invoiceReports", JSON.stringify(updatedReports)); // Save to localStorage
    setInvoiceData(data);
  };

  // Function to Export Reports to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice Report", 14, 20);

    const tableColumn = ["Invoice No.", "Customer Name", "Booking Date","Total Amount","Due Amount"];
    const tableRows = invoiceReports.map((invoice) => {
      const totalAmount = invoice.items.reduce((sum, item) => sum + Number(item.amount), 0);
      const dueAmount = totalAmount - Number(invoice.advancePayment);
      return [invoice.invoiceNo, invoice.customerName, invoice.bookingDate, `${totalAmount.toFixed(2)}`,`${dueAmount.toFixed(2)}`];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });

    doc.save("Invoice_Report.pdf");
  };

  // Function to Clear All Saved Reports
  const clearReports = () => {
    localStorage.removeItem("invoiceReports");
    setInvoiceReports([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-amber-100 px-4 py-8">
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center bg-yellow-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Ashutosh Photography</h1>
        <p className="text-gray-700 text-sm md:text-base mt-2">
          Wedding Shoot | Pre-Wedding | Birthday | Maternity | Baby Shoot
        </p>
        <p className="text-gray-700 text-sm md:text-base">Manpur Pehani Patwatoli, Gaya, Bihar - 823003</p>
        <p className="text-gray-700 text-sm md:text-base">
          Contact: <span className="font-semibold">+91 6205952218</span> | Email: <span className="font-semibold">nirajmanpurpatwa@gmail.com</span>
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-5xl mt-6">
        <InvoiceForm onGenerate={handleGenerateInvoice} />
      </div>

      {/* PDF Generation Section */}
      {invoiceData && (
        <div className="w-full max-w-lg mt-6 flex justify-center">
          <InvoicePDF invoiceData={invoiceData} />
        </div>
      )}

      {/* Report Section */}
      <div className="w-full max-w-5xl mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Invoice Reports</h2>
        {invoiceReports.length === 0 ? (
          <p className="text-center text-gray-500">No reports available.</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border p-2">Invoice No.</th>
                  <th className="border p-2">Customer Name</th>
                  <th className="border p-2">Booking Date</th>
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">Due Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceReports.map((invoice, index) => {
                  const totalAmount = invoice.items.reduce((sum, item) => sum + Number(item.amount), 0);
                  const dueAmount = totalAmount - Number(invoice.advancePayment);

                  return (
                    <tr key={index} className="text-center border-t">
                      <td className="border p-2">{invoice.invoiceNo}</td>
                      <td className="border p-2">{invoice.customerName}</td>
                      <td className="border p-2">{invoice.bookingDate}</td>
                      <td className="border p-2 text-blue-600 font-bold">{totalAmount.toFixed(2)}</td>
                      <td className="border p-2 text-red-600 font-bold">{dueAmount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Export PDF & Clear Reports Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={exportToPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Export to PDF
              </button>

              <button
                onClick={clearReports}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Clear Reports
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="w-full mt-10 py-4 bg-gray-900 text-white text-center text-sm md:text-base rounded-t-lg shadow-md">
        <p>Designed & Developed by <span className="font-semibold">Lokesh Kumar</span></p>
      </footer>
    </div>
  );
}

export default App;
