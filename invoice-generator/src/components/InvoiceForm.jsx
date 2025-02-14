import { useState } from "react";
import Select from "react-select"; // Import react-select
import { FaTrash } from "react-icons/fa"; // Import Trash Icon

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
    "Barat", "Shadi", "Chauthari", "Reception", "Pre-Wedding",
    "Post-Wedding", "Birthday", "Anniversary" ,"Whole Wedding","Maternity Shoot",
    "Baby Shoot", "Rice Cermony Shoot","Event Shoot"," Reels Shoot"
  ].map(eventName => ({ label: eventName, value: eventName }));

  const eventDetailsOptions = [
    "Basic Plan",
    "Standard Plan",
    "Premium Plan",
    "Per Day Plan",
  ].map(plan => ({ label: plan, value: plan })); // Convert to Select format

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { eventDate: "", eventName: "", plan: "", amount: 0 }],
    });
  };

  const handleItemChange = (index, selected, action) => {
    const newItems = [...invoiceData.items];
    newItems[index][action.name] = selected.value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const deleteItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">INVOICE DETAILS</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <label className="font-semibold text-blue-900"> Invoice Number
          <input type="text" name="invoiceNo" placeholder="Invoice Number" value={invoiceData.invoiceNo} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Invoice Date
          <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Customer Name
          <input type="text" name="customerName" placeholder="Customer Name" value={invoiceData.customerName} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Address
          <input type="text" name="address" placeholder="Address" value={invoiceData.address} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Mobile Number
          <input type="text" name="mobileNo" placeholder="Mobile Number" value={invoiceData.mobileNo} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Booking Date
          <input type="date" name="bookingDate" value={invoiceData.bookingDate} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Program Venue
          <input type="text" name="programVenue" placeholder="Venue" value={invoiceData.programVenue} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <label className="font-semibold text-blue-900"> Advance Payment
          <input type="number" name="advancePayment" placeholder="Advance Payment" value={invoiceData.advancePayment} onChange={handleChange} className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </label>

        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mt-6 mb-4 text-gray-800">EVENT DETAILS</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
              <label className="font-semibold text-blue-900"> Event Date
                <input type="date" name="eventDate" value={item.eventDate} onChange={(e) => handleItemChange(index, { value: e.target.value }, { name: "eventDate" })} className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
         </label>
                <label className="font-semibold text-blue-900"> Event Name
                <Select
                  name="eventName"
                  options={eventOptions}
                  value={eventOptions.find(option => option.value === item.eventName)}
                  onChange={(selected) => handleItemChange(index, selected, { name: "eventName" })}
                  className="w-full"
                />

                </label>

                <label className="font-semibold text-blue-900"> Event Package

                <Select
                  name="plan"
                  options={eventDetailsOptions}
                  value={eventDetailsOptions.find(option => option.value === item.plan)}
                  onChange={(selected) => handleItemChange(index, selected, { name: "plan" })}
                  className="w-full"
                />
                </label>

                <label className="font-semibold text-blue-900"> Amount

                <input type="number" name="amount" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, { value: e.target.value }, { name: "amount" })} className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </label>
              </div>

              {/* Delete Icon Button */}
              <button 
                onClick={() => deleteItem(index)}
                className="ml-3 text-red-600 hover:text-red-800 transition duration-300"
                title="Delete Event"
              >
                <FaTrash size={18} />
              </button>
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
