import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePDF = ({ invoiceData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Center-Aligned Business Header
    doc.setFontSize(24);
    doc.text("Ashutosh Photography", doc.internal.pageSize.width / 2, 25, { align: "center" });
    doc.setFontSize(12);
    doc.text("Wedding Shoot | Pre-Wedding | Birthday | Maternity | Baby Shoot", doc.internal.pageSize.width / 2, 32, { align: "center" });
    doc.text("Manpur Pehani Patwatoli, Gaya, Bihar - 823003", doc.internal.pageSize.width / 2, 39, { align: "center" });
    doc.text("Contact: +91 6205952218  |  Email: nirajmanpurpatwa@gmail.com", doc.internal.pageSize.width / 2, 46, { align: "center" });

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoiceData.invoiceNo}`, 14, 60);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 140, 60);

    doc.text(`Customer Name: ${invoiceData.customerName}`, 14, 70);
    doc.text(`Address: ${invoiceData.address}`, 140, 70);

    doc.text(`Mobile No: ${invoiceData.mobileNo}`, 14, 80);
    doc.text(`Booking Date: ${invoiceData.bookingDate}`, 140, 80);

    doc.text(`Program Venue: ${invoiceData.programVenue}`, 14, 90);
    doc.text(`Advance Payment: ${Number(invoiceData.advancePayment).toFixed(2)}`, 140, 90);

    // Table Header
    const tableColumn = ["Date", "Event Name", "Event Details", "Amount"];
    const tableRows = [];

    // Populate Table Rows
    invoiceData.items.forEach((item) => {
      const details = item.details.length ? item.details.join(", ") : "N/A";
      tableRows.push([item.eventDate, item.event, details, `${Number(item.amount).toFixed(2)}`]);
    });

    // Add Table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 80 },
        3: { cellWidth: 30, halign: "right" }, // Align amount column to right
      },
    });

    // Totals Calculation
    const totalAmount = invoiceData.items.reduce((sum, item) => sum + Number(item.amount), 0);
    const dueAmount = totalAmount - Number(invoiceData.advancePayment);
    const finalY = doc.autoTable.previous.finalY + 10;

    // Add a box for Amount Summary
    doc.setDrawColor(0); // Black border
    doc.setLineWidth(0.5);
    doc.rect(120, finalY - 5, 70, 24); // Draw rectangle around amounts

    // Right-Aligned Totals with Proper Spacing
    doc.setFontSize(12);
    doc.text("Total Amount:", 125, finalY);
    doc.text(`${totalAmount.toFixed(2)}`, 180, finalY, { align: "right" });

    doc.text("Advance Paid:", 125, finalY + 8);
    doc.text(`${Number(invoiceData.advancePayment).toFixed(2)}`, 180, finalY + 8, { align: "right" });

    doc.text("Due Amount:", 125, finalY + 16);
    doc.text(`${dueAmount.toFixed(2)}`, 180, finalY + 16, { align: "right" });

    // Footer with Terms
    doc.setFontSize(10);
    doc.text("* When you book our services, a 25% advance payment is required.", 14, finalY + 30);
    doc.text("* During the wedding, 50% of the payment must be paid.", 14, finalY + 36);
    doc.text("* The remaining 25% is due upon delivery of photos/videos.", 14, finalY + 42);
    doc.text("* We are not responsible for any data loss due to technical faults.", 14, finalY + 48);

    // Signature Line
    doc.setFontSize(12);
    doc.text("Ashutosh Kumar", 160, finalY + 65);
    doc.line(150, finalY + 67, 190, finalY + 67);

    // Save the PDF
    doc.save(`Invoice_${invoiceData.customerName}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md">
      Download Invoice PDF
    </button>
  );
};

export default InvoicePDF;
