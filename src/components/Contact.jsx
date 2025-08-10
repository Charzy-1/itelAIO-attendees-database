import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { styles } from '../styles';
import axios from "axios";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: '',
    epcName: '',
    number: '',
    officeAddress: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.epcName) newErrors.epcName = 'Business name is required';
    if (!form.number) newErrors.number = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Replace this with your own POST endpoint URL
      const response = await axios.post('http://localhost:5000/api/forms', form);
      console.log('Response:', response.data);

      alert('Thank you. Your submission was successful.');

      // Reset form
      setForm({
        name: '',
        epcName: '',
        number: '',
        officeAddress: '',
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div 
        variants={slideIn('left', 'tween', 0.2, 1)} 
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Take your seat</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Full Name</span>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Enter your name" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.name && <span className="text-red-500 text-sm mt-2">{errors.name}</span>}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">EPC Name</span>
            <input 
              type="text" 
              name="epcName" 
              value={form.epcName} 
              onChange={handleChange} 
              placeholder="Enter your business name" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.epcName && <span className="text-red-500 text-sm mt-2">{errors.epcName}</span>}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Phone number</span>
            <input 
              type="text" 
              name="number" 
              value={form.number} 
              onChange={handleChange} 
              placeholder="Enter your phone number" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.number && <span className="text-red-500 text-sm mt-2">{errors.number}</span>}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Office Address</span>
            <input
              type="text"
              name="officeAddress"
              value={form.officeAddress}
              onChange={handleChange}
              placeholder="Enter your office address (optional)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit" 
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[650px] h-[450px] flex justify-center items-center"
      >
        <img
          src="/images/aio.png"
          alt="AIO"
          className="max-w-[500px] max-h-[500px] object-contain rounded-xl"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
