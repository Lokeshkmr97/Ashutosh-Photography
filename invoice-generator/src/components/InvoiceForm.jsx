import { useState } from "react";
import Select from "react-select"; // Import react-select

const InvoiceForm = ({ onGenerate }) => {
  const initialInvoiceData = {
    invoiceNo: "",
    invoiceDate: "",
    customerName: "",
    address: "",
    mobileNo: "",
    bookingDate: "",
    programVenue: "",
    advancePayment: "",
    items: [],
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  const eventOptions = [
    "Mehndi", "Lagan Dharai", "Devpuji", "Karmath", "Haldi",
    "Barat", "Shadi", "Chauthari", "Reception", "Pre-wedding",
    "Post-wedding", "Birthday", "Anniversary"
  ].map(event => ({ label: event, value: event }));

  const eventDetailsOptions = [
    "Traditional Photo", "Traditional Video", "Candid Photo",
    "Cinematic Video", "LED Wall", "Drone"
  ].map(detail => ({ label: detail, value: detail }));

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { eventDate: "", event: "", details: [], amount: 0 }],
    });
  };

  const handleItemChange = (index, selected, action) => {
    const newItems = [...invoiceData.items];
    if (action.name === "details") {
      newItems[index]["details"] = selected.map(item => item.value);
    } else {
      newItems[index][action.name] = selected.value;
    }
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(invoiceData);
  };

  const handleClear = () => {
    setInvoiceData(initialInvoiceData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Invoice Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <label className="font-semibold"> Invoice Number
          <input type="text" name="invoiceNo" placeholder="Invoice Number" value={invoiceData.invoiceNo} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Invoice Date
          <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Customer Name
          <input type="text" name="customerName" placeholder="Customer Name" value={invoiceData.customerName} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Address
          <input type="text" name="address" placeholder="Address" value={invoiceData.address} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Mobile Number
          <input type="text" name="mobileNo" placeholder="Mobile Number" value={invoiceData.mobileNo} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Booking Date
          <input type="date" name="bookingDate" value={invoiceData.bookingDate} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Program Venue
          <input type="text" name="programVenue" placeholder="Venue" value={invoiceData.programVenue} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold"> Advance Payment
          <input type="number" name="advancePayment" placeholder="Advance Payment" value={invoiceData.advancePayment} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mt-6 mb-4 text-gray-800">Event Details</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <input type="date" name="eventDate" placeholder="Event Date" value={item.eventDate} onChange={(e) => handleItemChange(index, e.target, { name: "eventDate" })} className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />

                <Select
                  name="event"
                  options={eventOptions}
                  value={eventOptions.find(option => option.value === item.event)}
                  onChange={(selected) => handleItemChange(index, selected, { name: "event" })}
                  className="w-full"
                />

                <Select
                  name="details"
                  options={eventDetailsOptions}
                  isMulti
                  value={eventDetailsOptions.filter(option => item.details.includes(option.value))}
                  onChange={(selected) => handleItemChange(index, selected, { name: "details" })}
                  className="w-full"
                />

                <input type="number" name="amount" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, e.target, { name: "amount" })} className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">
          + Add Event
        </button>

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
          Generate Invoice
        </button>

        <button type="button" onClick={handleClear} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
          Clear Form
        </button>

      </form>
    </div>
  );
};

export default InvoiceForm;
