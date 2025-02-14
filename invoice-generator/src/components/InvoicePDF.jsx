import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePDF = ({ invoiceData }) => {
  const generatePDF = () => {
    if (!invoiceData || !invoiceData.items || invoiceData.items.length === 0) {
      alert("No invoice data available!");
      return;
    }

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
    doc.text(`Invoice No: ${invoiceData.invoiceNo || "N/A"}`, 14, 60);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate || "N/A"}`, 140, 60);

    doc.text(`Customer Name: ${invoiceData.customerName || "N/A"}`, 14, 70);
    doc.text(`Address: ${invoiceData.address || "N/A"}`, 140, 70);

    doc.text(`Mobile No: ${invoiceData.mobileNo || "N/A"}`, 14, 80);
    doc.text(`Booking Date: ${invoiceData.bookingDate || "N/A"}`, 140, 80);

    doc.text(`Program Venue: ${invoiceData.programVenue || "N/A"}`, 14, 90);
    doc.text(`Advance Payment: ${Number(invoiceData.advancePayment || 0).toFixed(2)}`, 140, 90);

    // Table Header
    const tableColumn = ["Date", "Event Name", "Event Package", "Amount"];
    const tableRows = [];

    // Populate Table Rows
    invoiceData.items.forEach((item) => {
      const details = item.plan ? item.plan : "N/A"; // Fix: Use item.plan correctly
      tableRows.push([item.eventDate || "N/A", item.eventName || "N/A", details, `${Number(item.amount || 0).toFixed(2)}`]);
    });

    // Add Table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      columnStyles: { 3: { halign: "right" } }, // Align amount column to right
    });

    // Totals Calculation
    const totalAmount = invoiceData.items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const dueAmount = totalAmount - Number(invoiceData.advancePayment || 0);
    const finalY = doc.autoTable.previous.finalY + 10;

    // Add Amount Summary Box
    doc.setDrawColor(0); // Black border
    doc.setLineWidth(0.5);
    doc.rect(120, finalY - 5, 70, 24); // Draw rectangle around amounts

    // Right-Aligned Totals
    doc.setFontSize(12);
    doc.text("Total Amount:", 125, finalY);
    doc.text(`${totalAmount.toFixed(2)}`, 180, finalY, { align: "right" });

    doc.text("Advance Paid:", 125, finalY + 8);
    doc.text(`${Number(invoiceData.advancePayment || 0).toFixed(2)}`, 180, finalY + 8, { align: "right" });

    doc.text("Due Amount:", 125, finalY + 16);
    doc.text(`${dueAmount.toFixed(2)}`, 180, finalY + 16, { align: "right" });

    // Footer Section with Terms
    doc.setFontSize(10);
    doc.text("* 25% advance payment is required to book services.", 14, finalY + 30);
    doc.text("* 50% payment must be made during the wedding.", 14, finalY + 36);
    doc.text("* Remaining 25% is due on photo/video delivery.", 14, finalY + 42);
    doc.text("* We are not responsible for any data loss due to technical issues.", 14, finalY + 48);

    // **Package Details Based on Event Name**
    const selectedEvent = invoiceData.items.length > 0 ? invoiceData.items[0].eventName : "Default";
    const packageDetails = {
     
      "Default": [
        "Basic: Photo & Traditional Video",
        "Standard: 1 day Candid Photo, Cinematic Video, 1 Reel, Photo Album",
        "Premium: 3 days Candid Photo, Drone, Teaser, Highlight, 3 Reels, Raw Video",
      ],
    };

    // Add Package Details to Invoice
    const eventPackages = packageDetails[selectedEvent] || packageDetails["Default"];
    doc.setFontSize(12);
    doc.text("Package Details:", 14, finalY + 65);
    eventPackages.forEach((pkg, index) => {
      doc.text(`- ${pkg}`, 14, finalY + 75 + (index * 7));
    });

    // Signature Line
    doc.setFontSize(12);
    doc.text("Ashutosh Kumar", 160, finalY + 120);
    doc.line(150, finalY + 122, 190, finalY + 122);

    // **Fix: Ensure the File is Downloaded and Open Print Dialog**
    const pdfBlob = doc.output("blob");
    const blobURL = URL.createObjectURL(pdfBlob);
    
    // **Auto-Open Print Dialog**
    window.open(blobURL, "_blank"); // Opens the PDF in a new tab for printing
    
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = `Invoice_${invoiceData.customerName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={generatePDF} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md">
      Download & Print Invoice
    </button>
  );
};

export default InvoicePDF;
